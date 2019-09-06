package main // import "github.com/iph/lambda-experiments/versioned-vpc-lambda/app"

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"io/ioutil"
	"net/http"
	"time"
)

type Response struct {
	Output string
}

func HandleRequest(ctx context.Context) (Response, error) {

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get("https://example.com")
	if err != nil {

		return Response{Output: err.Error()}, nil
	}
	defer resp.Body.Close()

	b, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return Response{Output: err.Error()}, nil
	}

	return Response{Output: string(b)}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
