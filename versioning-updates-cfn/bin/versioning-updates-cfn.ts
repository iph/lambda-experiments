#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VersioningUpdatesCfnStack } from '../lib/versioning-updates-cfn-stack';

const app = new cdk.App();
new VersioningUpdatesCfnStack(app, 'VersioningUpdatesCfnStack', {
    env: {
        account: '~~~~~~~~~',
        region: 'us-west-1'
    }
});
