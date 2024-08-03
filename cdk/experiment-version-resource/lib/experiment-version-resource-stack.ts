import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
 import * as lambda from 'aws-cdk-lib/aws-lambda';

export class ExperimentVersionResourceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const funct = new lambda.Function(this, "lambda", {
      code: lambda.Code.fromAsset("assets/app.zip"),
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
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ExperimentVersionResourceQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
