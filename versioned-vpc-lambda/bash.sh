export S3_BUCKET=sean-myers-pdx
cd app
go mod vendor
GOOS=linux go build
zip app.zip app
rm -rf vendor
cd ..
mv app/app.zip .