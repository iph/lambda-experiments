# Experiment

I want to validate the following assertion:

"If I update anything other than the function code (e.g. timeout) Lambda will not bump
the published version, which is a broken experience today."

### Setup

* Install cdk.
* Source your credentials for cdk.
* Update your account id in the bin/versioning-updates-cfn.ts

### Setup 1: Manual Steps

In order to run this repro, you need to do the following steps:

1. Source whatever credentials you want to use to run this experiment.
2. go to the head of this directory (where you are reading this README)
3. run `npm install`
4. run `cdk deploy`
5. open `lib/versioning-updates-cfn-stack.ts`, and update `"version1"` to `"version2"`
8. run `npm install; cdk deploy`

### Expected outcome

Publish version succeeds, but cloudformation fails to deploy. This is because cloudformation
always expects an increment in the version number, but lambda is idempotent when it sees a `publish-version`
with no actual updates. This causes the two systems to not play nicely.

### Outcome 1:

The above expected outcome is true:

```
 0/3 | 12:44:25 AM | CREATE_IN_PROGRESS   | AWS::Lambda::Version  | version2
 1/3 | 12:44:26 AM | CREATE_FAILED        | AWS::Lambda::Version  | version2 A version for this Lambda function exists ( 1 ). Modify the function to create a new version.
 1/3 | 12:44:26 AM | UPDATE_ROLLBACK_IN_P | AWS::CloudFormation::Stack | VersioningUpdatesCfnStack The following resource(s) failed to create: [version2].
The stack named VersioningUpdatesCfnStack is in a failed state: UPDATE_ROLLBACK_COMPLETE
```

### Setup 2: Manual Steps

In order to run this repro, you need to do the following steps:

1. Source whatever credentials you want to use to run this experiment.
2. go to the head of this directory (where you are reading this README)
3. run `npm install`
4. run `cdk deploy`
5. open `lib/versioning-updates-cfn-stack.ts`, and update `"version1"` to `"version2"`
6. open `lib/versioning-updates-cfn-stack.ts`, and update `memorySize: 128` to `memorySize: 3008`
7. run `npm install; cdk deploy`

### Expected outcome 2

Publish version succeeds and produces a new version. Because of this cloudformation succeeds it's
deployment.

### Outcome 2:

The above expected outcome is true:

```
 VersioningUpdatesCfnStack: creating CloudFormation changeset...
  0/4 | 12:46:14 AM | UPDATE_IN_PROGRESS   | AWS::Lambda::Function | lambda (lambda8B5974B5)
  1/4 | 12:46:15 AM | UPDATE_COMPLETE      | AWS::Lambda::Function | lambda (lambda8B5974B5)
  1/4 | 12:46:17 AM | CREATE_IN_PROGRESS   | AWS::Lambda::Version  | version2
  1/4 | 12:46:17 AM | CREATE_IN_PROGRESS   | AWS::Lambda::Version  | version2 Resource creation Initiated
  2/4 | 12:46:18 AM | CREATE_COMPLETE      | AWS::Lambda::Version  | version2
  2/4 | 12:46:19 AM | UPDATE_COMPLETE_CLEA | AWS::CloudFormation::Stack | VersioningUpdatesCfnStack
  2/4 | 12:46:21 AM | DELETE_IN_PROGRESS   | AWS::Lambda::Version  | version1
  3/4 | 12:46:21 AM | DELETE_COMPLETE      | AWS::Lambda::Version  | version1
  4/4 | 12:46:21 AM | UPDATE_COMPLETE      | AWS::CloudFormation::Stack | VersioningUpdatesCfnStack
```
