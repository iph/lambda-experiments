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
5. run `aws --region us-west-1 lambda publish-version`
7. update example.tf line to 10
8. run `terraform apply`
9. run `aws --region us-west-1 lambda publish-version`


### Expected outcome

The expected outcome is that we use the VPC settings of the individual
function version, and not the function itself. Those properties **should** be immutable

### Results

Function versions are immutable. What this means is that :1 invoke has good VPC settings. :$LATEST has bad ones. The
functions do not share v