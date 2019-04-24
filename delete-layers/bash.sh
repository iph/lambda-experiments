export S3_BUCKET=ENTER-BUCKET-HERE
cd app
go mod vendor
GOOS=linux go build
zip app.zip app
rm -rf vendor
cd ..
cd layer
zip layer.zip example.txt
cd ..
aws --region us-west-2 cloudformation package --template sample.yaml --s3-bucket $S3_BUCKET --output-template exported.yaml
aws --region us-west-2 cloudformation deploy --template-file exported.yaml --stack-name global-layers --capabilities CAPABILITY_IAM
# Prints 13 (size of file)
aws --region us-west-2 lambda invoke --function-name golayerdelete /dev/stdout
# Delete the lambda layer version, so can it be invoked?!
aws --region us-west-2 lambda delete-layer-version --layer-name example --version-number 1
# Yep, should also output the same
echo "deleted lambda layer now running invoke again, should show output: 13"
aws --region us-west-2 lambda invoke --function-name golayerdelete /dev/stdout
echo "cool, now cleaning up..."

# Cool now clean up.
aws --region us-west-2 cloudformation delete-stack --stack-name global-layers
rm app/app
rm app/app.zip
rm layer/layer.zip
