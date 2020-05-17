import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda'
import * as asg from '@aws-cdk/aws-applicationautoscaling'
import {PredefinedMetric} from "@aws-cdk/aws-applicationautoscaling";

export class PcAsgStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const funct = new lambda.Function(this, "lambda", {
      code: lambda.Code.fromAsset("assets/app.zip"),
      handler: "app",
      runtime: lambda.Runtime.GO_1_X,
      memorySize: 128,
    });

    let version = funct.currentVersion

    let alias = new lambda.Alias(this, 'LiveAlias', {
      aliasName: "live",
      version: version,
      provisionedConcurrentExecutions: 1
    });

    // The code that defines your stack goes here
    const target = new asg.ScalableTarget(this, 'ScalableTarget', {
      serviceNamespace: asg.ServiceNamespace.LAMBDA,
      maxCapacity: 5,
      minCapacity: 1,
      resourceId: `function:${alias.lambda.functionName}:${alias.aliasName}`,
      scalableDimension: 'lambda:function:ProvisionedConcurrency'
    });

    target.node.addDependency(alias);

    target.scaleToTrackMetric('PcuTracking', {
      targetValue: 0.8,
      predefinedMetric: PredefinedMetric.LAMBDA_PROVISIONED_CONCURRENCY_UTILIZATION
    });

  }


}
