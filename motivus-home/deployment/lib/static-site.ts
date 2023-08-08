#!/usr/bin/env node
// import { Construct } from '@aws-cdk/core'
// import { HttpsRedirect } from '@aws-cdk/aws-route53-patterns'
// import cloudfront = require('@aws-cdk/aws-cloudfront')
// import route53 = require('@aws-cdk/aws-route53')
// import s3 = require('@aws-cdk/aws-s3')
// import s3deploy = require('@aws-cdk/aws-s3-deployment')
// import acm = require('@aws-cdk/aws-certificatemanager')
// import cdk = require('@aws-cdk/core')
// import targets = require('@aws-cdk/aws-route53-targets/lib')
import {Construct} from 'constructs';
import {
  aws_certificatemanager as acm,
  aws_cloudfront as cloudfront,
  aws_route53 as route53,
  aws_route53_targets as targets,
  aws_s3 as s3,
  aws_s3_deployment as s3deploy,
  aws_iam as iam,
  aws_cloudfront_origins as cloudfront_origins
} from 'aws-cdk-lib';
import { CfnOutput, Duration, RemovalPolicy} from 'aws-cdk-lib';

export interface StaticSiteProps {
  domainName: string
  siteSubDomain: string
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 *
 * https://github.com/aws-samples/aws-cdk-examples/blob/cf0c6e46683b8dc9638f12a28fcb444865aede75/typescript/static-site/static-site.ts
 */
export class StaticSite extends Construct {
  constructor(parent: Construct, name: string, props: StaticSiteProps) {
    super(parent, name)

    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: props.domainName,
    })
    const siteDomain = props.siteSubDomain + '.' + props.domainName
    new CfnOutput(this, 'Site', {value: 'https://' + siteDomain})

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, 'cloudfront-OAI', {
      comment: `OAI for ${name}`
    });

    // Content bucket
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: props.domainName,
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
    })

    // Grant access to cloudfront
    siteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [siteBucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }));

    new CfnOutput(this, 'Bucket', {value: siteBucket.bucketName})

    // TLS certificate
    const certificate = new acm.DnsValidatedCertificate(
      this,
      'SiteCertificate',
      {
        domainName: props.domainName,
        hostedZone: zone,
        region: 'us-east-1',
        subjectAlternativeNames: [siteDomain],
      },
    )
    new CfnOutput(this, 'Certificate', {value: certificate.certificateArn})


    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      certificate: certificate,
      defaultRootObject: "index.html",
      domainNames: [props.domainName, siteDomain],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses:[
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(30),
        },{
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(30),
        }
      ],
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(siteBucket, {originAccessIdentity: cloudfrontOAI}),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      }
    })
    new CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
    })

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: props.domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
      zone,
    })

    new route53.CnameRecord(this, 'SiteCNameRecord', {
      domainName: props.domainName,
      recordName: siteDomain,
      zone,
    })

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('../public')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    })
  }
}
