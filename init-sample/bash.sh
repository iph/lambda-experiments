export S3_BUCKET=sean-myers-gru
export REGION=sa-east-1
export STACK_NAME=provisioned-demo-repro
cd app
go mod vendor
GOOS=linux go build
zip app.zip app
rm -rf vendor
cd ..
cp app/app.zip app.zip
aws --region $REGION cloudformation package --template sample.yaml --s3-bucket $S3_BUCKET --output-template exported.yaml
aws --region $REGION cloudformation deploy --template-file exported.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_IAM
rm app/app
