#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { DeploymentStack } from '../lib/deployment-stack'

const app = new cdk.App()
new DeploymentStack(app, 'motivus-wb-widget', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
})
