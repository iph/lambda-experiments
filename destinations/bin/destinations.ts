#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DestinationsStack } from '../lib/destinations-stack';

const app = new cdk.App();
new DestinationsStack(app, 'DestinationsStack', {
    env: {
        account: "326750834372",
        region: "us-west-1"
    }
});
