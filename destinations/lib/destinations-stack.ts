import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as lambdadest from '@aws-cdk/aws-lambda-destinations'
import * as sqs from '@aws-cdk/aws-sqs'

export class DestinationsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const destLambda = new lambda.Function(this, "accepting-lambda", {
      functionName: "success-lambda",
      code: lambda.Code.fromAsset("assets/app.zip"),
      handler: "app",
      runtime: lambda.Runtime.GO_1_X,
      memorySize: 128,
    });

    const dlq = new sqs.Queue(this, "dlq");
    new lambda.Function(this, "lambda", {
      functionName: "core-lambda",
      code: lambda.Code.fromAsset("assets/app.zip"),
      handler: "app",
      runtime: lambda.Runtime.GO_1_X,
      memorySize: 128,
      deadLetterQueue: dlq,
      onSuccess: new lambdadest.LambdaDestination(destLambda),
    });



  }
}
