import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import {Code} from "@aws-cdk/aws-lambda";

export class VersioningUpdatesCfnStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const funct = new lambda.Function(this, "lambda", {
      code: Code.fromAsset("assets/app.zip"),
      handler: "app",
      runtime: lambda.Runtime.GO_1_X,
      memorySize: 128,
      environment: {
        "hi": "there",
        "hi2": "there",
      }
    });

    new lambda.CfnVersion(this, "version1", {
      functionName: funct.functionName
    });
  }
}
