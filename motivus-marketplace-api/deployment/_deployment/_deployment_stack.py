import os
from aws_cdk import (
    core as cdk,
    aws_ec2,
    aws_ecs,
    aws_ecs_patterns,
    aws_ecr,
    aws_iam,
    aws_rds,
    aws_s3,
    aws_secretsmanager,
    aws_route53,
    aws_certificatemanager
)
from aws_cdk.core import Duration
from collections import ChainMap


class MotivusMarketplaceApiStack(cdk.Stack):
    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        title = 'motivus-marketplace-api'

        repository = aws_ecr.Repository(self, f'{title}-repository', removal_policy=cdk.RemovalPolicy.DESTROY,
                                        repository_name=title)

        vpc = aws_ec2.Vpc(self, f'{title}-vpc', max_azs=3)

        user = aws_iam.User(self, f'{title}-user')
        access_key = aws_iam.AccessKey(self, f'{title}-access-key',
                                       user=user)

        db_password = aws_secretsmanager.Secret(
            self, f'{title}-db-password', generate_secret_string=aws_secretsmanager.SecretStringGenerator(password_length=20, exclude_characters='/@" '))

        secret_key = aws_secretsmanager.Secret(
            self, f'{title}-phx-app-secret-key', generate_secret_string=aws_secretsmanager.SecretStringGenerator(password_length=65))

        access_key_secret = aws_secretsmanager.Secret(
            self, f'{title}-access_key_secret', secret_string_beta1=aws_secretsmanager.SecretStringValueBeta1.from_token(access_key.secret_access_key.to_string()))

        creds = aws_rds.Credentials.from_password(
            "motivus_admin", db_password.secret_value)

        zone_name = 'motivus.cl'

        zone_id = 'Z1ZCWA0FF51E6H'

        hosted_zone = aws_route53.HostedZone.from_hosted_zone_attributes(
            self, f'{title}-hosted-zone', zone_name=zone_name, hosted_zone_id=zone_id
        )

        domain_name = 'marketplace.api.motivus.cl'

        certificate = aws_certificatemanager.DnsValidatedCertificate(
            self, f'{title}-domain-certificate', domain_name=domain_name, hosted_zone=hosted_zone
        )

        bucket = aws_s3.Bucket(self, f'{title}-bucket',
                               bucket_name='motivus-marketplace',
                               public_read_access=True,
                               object_ownership=aws_s3.ObjectOwnership.BUCKET_OWNER_ENFORCED)
        bucket.grant_read_write(user)

        # security_group = aws_ec2.SecurityGroup(
        #     self, f'{title}-security-group', vpc=vpc)

        # security_group.add_ingress_rule(
        #     aws_ec2.Peer.ipv4('0.0.0.0/0'), aws_ec2.Port.tcp(5432))

        database_name = "motivus_marketplace_api"
        engine = aws_rds.DatabaseInstanceEngine.postgres(
            version=aws_rds.PostgresEngineVersion.VER_12_3)
        db = aws_rds.DatabaseInstance(self, f'{title}-db-prod',
                                      engine=engine,
                                      preferred_backup_window="05:00-06:00",
                                      backup_retention=Duration.days(7),
                                      removal_policy=cdk.RemovalPolicy.RETAIN,
                                      deletion_protection=True,
                                      database_name=database_name,
                                      credentials=creds,
                                      instance_type=aws_ec2.InstanceType.of(aws_ec2.InstanceClass.BURSTABLE3,
                                                                            aws_ec2.InstanceSize.MEDIUM),
                                      storage_type=aws_rds.StorageType.GP2,
                                      instance_identifier=f'{title}-db-prod',
                                      vpc_subnets=aws_ec2.SubnetSelection(
                                          subnet_type=aws_ec2.SubnetType.PUBLIC),
                                      vpc=vpc)
        db.connections.allow_default_port_from_any_ipv4()
        
        cluster = aws_ecs.Cluster(
            self, f'{title}-cluster', vpc=vpc, cluster_name=f'{title}-cluster')

        image = aws_ecs.EcrImage(repository, 'latest')

        secrets = {
            "DB_PASSWORD": aws_ecs.Secret.from_secrets_manager(db_password),
            "SECRET_KEY_BASE": aws_ecs.Secret.from_secrets_manager(secret_key),
            "AWS_SECRET_ACCESS_KEY": aws_ecs.Secret.from_secrets_manager(access_key_secret)
        }
        environment = {
            "MIX_ENV": 'prod',
            "DB_USER": 'motivus_admin',
            "DB_NAME": database_name,
            "DB_HOST": db.db_instance_endpoint_address,
            "AWS_REGION": 'us-east-1',
            "AWS_ACCESS_KEY_ID": access_key.access_key_id,
            "AWS_S3_BUCKET_NAME": 'motivus-marketplace',
            "AWS_S3_HOST": bucket.bucket_domain_name,
            "GITHUB_CLIENT_ID": os.environ['GITHUB_CLIENT_ID'],
            "GITHUB_CLIENT_SECRET": os.environ['GITHUB_CLIENT_SECRET'],
            "GOOGLE_CLIENT_ID": os.environ['GOOGLE_CLIENT_ID'],
            "GOOGLE_CLIENT_SECRET": os.environ['GOOGLE_CLIENT_SECRET'],
            "PORT": "80"
        }
        task_image_options = aws_ecs_patterns.ApplicationLoadBalancedTaskImageOptions(
            image=image, secrets=secrets, environment=environment)

        aws_ecs_patterns.ApplicationLoadBalancedFargateService(
            self,
            f'{title}-fargate-service',
            cluster=cluster,  # Required
            desired_count=1,  # Default is 1
            service_name=f'{title}-service',
            task_image_options=task_image_options,
            memory_limit_mib=4096,
            cpu=2048,
            health_check_grace_period=cdk.Duration.minutes(5),
            public_load_balancer=True,  # Default is False
            certificate=certificate,
            domain_name=domain_name,
            domain_zone=hosted_zone
        )
