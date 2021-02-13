#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebhookyStack } from '../lib/webhooky-stack';

const app = new cdk.App();
new WebhookyStack(app, 'WebhookyStack');
