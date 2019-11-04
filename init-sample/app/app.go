package main // import "github.com/iph/lambda-experiments/init-sample/app"

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	"os"
	"strconv"
	"time"
)

type Response struct {
	Output string
}

func init(){
	time.Sleep(10*time.Second)
}

func HandleRequest(ctx context.Context) (Response, error) {
	testVal := os.Getenv("TEST")
	fmt.Println("Val: ", testVal)

	return Response{ Output: strconv.FormatInt(10, 10)}, nil
}

func main(){
	lambda.Start(HandleRequest)
}
