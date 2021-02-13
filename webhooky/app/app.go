package main // import "github.com/iph/lambda-experiments/webhooky/app"

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"strconv"
)

type Response struct {
	Output string
}

func HandleRequest(ctx context.Context, message events.SQSMessage) (Response, error) {
	fmt.Println(message)
	return Response{ Output: strconv.FormatInt(10, 10)}, nil
}

func main(){
	lambda.Start(HandleRequest)
}
