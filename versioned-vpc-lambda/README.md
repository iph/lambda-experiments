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

### Expected outcome

The expected outcome is that we use the VPC settings of the individual
function version, and not the function itself. Those properties **should** be immutable