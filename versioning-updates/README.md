# Experiment

I want to validate the following assertion:

"If I update anything other than the function code (e.g. timeout) Lambda will not bump
the published version, which is a broken experience today."

### Setup

* Install terraform.
* Source your credentials for terraform.

### Setup Manual Steps

In order to run this repro, you need to do the following steps:

1. Source whatever credentials you want to use to run this experiment.
2. go to the head of this directory (where you are reading this README)
3. run `terraform init`
4. run `terraform apply`
5. run `aws --region us-west-1 lambda publish-version --function-name lambda-example-versioning-function`
7. update example.tf line to 10
8. run `terraform apply`
9. run `aws --region us-west-1 lambda publish-version --function-name lambda-example-versioning-function`


### Expected outcome

New versions should not be published for other configurations outside of code sha hash.

### Results

I was wrong. After testing not just the above experiment, but also "updates to description", "updates to environment variables",
"updates to handler", "updates to memory size" -- all created a new version of the function. 

Here is the raw output:

```
aws --region us-west-1 lambda publish-version --function-name lambda-example-versioning-function 
{
    "LastUpdateStatus": "Successful",
    "FunctionName": "lambda-example-versioning-function",
    "LastModified": "2020-03-20T07:15:47.150+0000",
    "RevisionId": "89b7ce7c-4c3f-4e27-b80f-9885a82ff5f5",
    "MemorySize": 3000,
    "Environment": {
        "Variables": {
            "foo": "bar"
        }
    },
    "State": "Active",
    "Version": "1",
    "Role": "arn:aws:iam::~~~~~~~~~~:role/iam_for_lambda-version-experiment",
    "Timeout": 30,
    "Runtime": "go1.x",
    "TracingConfig": {
        "Mode": "PassThrough"
    },
    "CodeSha256": "occ40CTVyvQeXOlm9tFk+F4Sl4xselv9WzogA4YS8mM=",
    "Description": "",
    "CodeSize": 4895919,
    "FunctionArn": "arn:aws:lambda:us-west-1:~~~~~~~~~~:function:lambda-example-versioning-function:1",
    "Handler": "app"
}
 versioning-updates terraform apply 
aws_iam_role.iam_for_lambda: Refreshing state... [id=iam_for_lambda-version-experiment]
aws_lambda_function.test_lambda: Refreshing state... [id=lambda-example-versioning-function]

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  ~ update in-place

Terraform will perform the following actions:

  # aws_lambda_function.test_lambda will be updated in-place
  ~ resource "aws_lambda_function" "test_lambda" {
        arn                            = "arn:aws:lambda:us-west-1:~~~~~~~~~~:function:lambda-example-versioning-function"
        filename                       = "app.zip"
        function_name                  = "lambda-example-versioning-function"
        handler                        = "app"
        id                             = "lambda-example-versioning-function"
        last_modified                  = "2020-03-20T07:15:47.150+0000"
        layers                         = []
        memory_size                    = 3000
        publish                        = false
        qualified_arn                  = "arn:aws:lambda:us-west-1:~~~~~~~~~~:function:lambda-example-versioning-function:1"
        reserved_concurrent_executions = -1
        role                           = "arn:aws:iam::~~~~~~~~~~:role/iam_for_lambda-version-experiment"
        runtime                        = "go1.x"
        source_code_hash               = "occ40CTVyvQeXOlm9tFk+F4Sl4xselv9WzogA4YS8mM="
        source_code_size               = 4895919
        tags                           = {}
      ~ timeout                        = 30 -> 10
        version                        = "1"

        environment {
            variables = {
                "foo" = "bar"
            }
        }

        tracing_config {
            mode = "PassThrough"
        }
    }

Plan: 0 to add, 1 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_lambda_function.test_lambda: Modifying... [id=lambda-example-versioning-function]
aws_lambda_function.test_lambda: Modifications complete after 0s [id=lambda-example-versioning-function]

Apply complete! Resources: 0 added, 1 changed, 0 destroyed.
 versioning-updates aws --region us-west-1 lambda publish-version --function-name lambda-example-versioning-function
{
    "LastUpdateStatus": "Successful",
    "FunctionName": "lambda-example-versioning-function",
    "LastModified": "2020-03-20T07:16:47.073+0000",
    "RevisionId": "7c00da3d-b054-43fd-b5d9-cdddf10438d2",
    "MemorySize": 3000,
    "Environment": {
        "Variables": {
            "foo": "bar"
        }
    },
    "State": "Active",
    "Version": "2",
    "Role": "arn:aws:iam::~~~~~~~~~~:role/iam_for_lambda-version-experiment",
    "Timeout": 10,
    "Runtime": "go1.x",
    "TracingConfig": {
        "Mode": "PassThrough"
    },
    "CodeSha256": "occ40CTVyvQeXOlm9tFk+F4Sl4xselv9WzogA4YS8mM=",
    "Description": "",
    "CodeSize": 4895919,
    "FunctionArn": "arn:aws:lambda:us-west-1:~~~~~~~~~~:function:lambda-example-versioning-function:2",
    "Handler": "app"
}
```

Note how in the last check for publish it has "Version:2"