#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PcAsgStack } from '../lib/pc-asg-stack';

const app = new cdk.App();
new PcAsgStack(app, 'PcAsgStack', { env: {region: "us-west-1", account: "~~~~~~~~"}});
