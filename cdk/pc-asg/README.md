# Experiment

I want to understand how to setup provisioned concurrency with autoscaling appropriately

### Setup

* Install cdk.
* Source your credentials for cdk.
* Update your account id in the bin/pc-asg.ts

### Setup 1: Manual Steps

1. run `npm run build`
2. add your account id to bin/pc-asg.ts
3. run `cdk deploy`

### Analysis

Turns out that there is no good "cfn connecting glue" to force the cdk to force an inherent dependency. You have to manually
add the dep. The future is grim for asg L2 and Lambda, but will be brightened if we follow more what DDB does: 

https://docs.aws.amazon.com/cdk/api/latest/docs/aws-dynamodb-readme.html#configure-autoscaling-for-your-table 