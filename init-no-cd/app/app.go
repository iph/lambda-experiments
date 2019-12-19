package main // import "github.com/iph/lambda-experiments/init-no-cd/app"

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	"strconv"
	"time"
)

type Response struct {
	Output string
}

func init(){
	time.Sleep(9*time.Second)
}

func HandleRequest(ctx context.Context) (Response, error) {
	fmt.Println("Hello")
	return Response{ Output: strconv.FormatInt(10, 10)}, nil
}

func main(){
	lambda.Start(HandleRequest)
}
