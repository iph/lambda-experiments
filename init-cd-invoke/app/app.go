package main // import "github.com/iph/lambda-experiments/init-cd-invoke/app"

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

var cold = false

func init(){

}

func HandleRequest(ctx context.Context) (Response, error) {
	fmt.Println("Hello")

	/// Cold start analyzers, or maybe caching dns, caching first connections, etc.
	if !cold {
		time.Sleep(11*time.Second)
		cold = true
	}

	return Response{ Output: strconv.FormatInt(10, 10)}, nil
}

func main(){
	lambda.Start(HandleRequest)
}
