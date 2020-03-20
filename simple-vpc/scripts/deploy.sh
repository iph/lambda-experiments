export S3_BUCKET=sean-myers-us-west-2
export REGION=us-west-2
export STACK_NAME=simple-vpc
mkdir output
aws --region $REGION cloudformation package --template infra/1_initial_setup.yaml --s3-bucket $S3_BUCKET --output-template output/exported_1.yaml
aws --region $REGION cloudformation deploy --template-file output/exported_1.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_IAM
