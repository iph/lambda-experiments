import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as lsubs from '@aws-cdk/aws-lambda-event-sources';
import * as sqs from '@aws-cdk/aws-sqs';

// Imagine an sns -> sqs -> lambda integration.
// now stop imagining. :o
export class WebhookyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const snsTopic = new sns.Topic(this, "SnsTopic", {});
    const sqsQueue = new sqs.Queue(this, "SqsQueue", {});

    new sns.Subscription(this, 'Subscription', {
      endpoint: 'endpoint',
      protocol: sns.SubscriptionProtocol.SQS,
      topic: snsTopic,

    });

    snsTopic.addSubscription(new subs.SqsSubscription(sqsQueue, {
      rawMessageDelivery: true
    }))

    const funct = new lambda.Function(this, "lambda", {
      code: lambda.Code.fromAsset("assets/app.zip"),
      handler: "app",
      runtime: lambda.Runtime.GO_1_X,
      memorySize: 128,
    });

    funct.addEventSource(new lsubs.SqsEventSource(sqsQueue));
  }
}
