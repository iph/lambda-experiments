cd app
GOPROXY=off go mod vendor
GOOS=linux go build
zip app.zip app
rm -rf vendor
cd ..
cp app/app.zip infra/app.zip