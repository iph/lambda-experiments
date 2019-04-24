package main // import "github.com/iph/lambda-experiments/global-layers/app"

import (
	"context"
	"os"
	"strconv"
	"github.com/aws/aws-lambda-go/lambda"

)

type Response struct {
	Output string
}

func HandleRequest(ctx context.Context) (Response, error) {
	res, err := os.Stat("/opt/example.txt")
	if err != nil {
		return Response {
			Output: err.Error(),
		}, nil
	}

	return Response{ Output: strconv.FormatInt(res.Size(), 10)}, nil
}

func main(){
	lambda.Start(HandleRequest)
}