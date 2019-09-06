# Experiment

I want to validate if Lambda uses VPC settings on the function or on the function
version. This is important to determine if VPC settings are immutable or not.

### Setup

1. Create 2 VPCs with 2 subnets
2. One VPC has access to the internet, one does not.
3. Create a Lambda version with the correct subnets.
4. Publish.
5. Create a Lambda version with incorrect subnets.
6. Call the version with correct subnets.

### Setup Manual Steps

In order to run this repro, you need to do the following steps:

1. Source whatever credentials you want to use to run this experiment.
2. go to the head of this directory (where you are reading this README)
3. run `bash bash.sh` 
4. run `terraform init`
5. run `terraform apply`
6. Go into the main.tf and uncomment lines on lines 73-75
7. run `terraform apply`
8. Run an invoke on `lambda_function_name:1`
9. Run an invoke on `lambda_function_name:$LATEST`


### Expected outcome

The expected outcome is that we use the VPC settings of the individual
function version, and not the function itself. Those properties **should** be immutable

### Results

Function versions are immutable. What this means is that :1 invoke has good VPC settings. :$LATEST has bad ones. The
functions do not share vpc state at the function level.