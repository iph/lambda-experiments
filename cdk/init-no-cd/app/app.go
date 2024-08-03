package main // import "github.com/iph/lambda-experiments/init-no-cd/app"

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"runtime"
	"strconv"
	"time"
)

type Response struct {
	Output string
}


func HandleRequest(ctx context.Context) (Response, error) {
	RunCPULoad(2, 15*60, 100)
	return Response{ Output: strconv.FormatInt(10, 10)}, nil
}


// RunCPULoad run CPU load in specify cores count and percentage
func RunCPULoad(coresCount int, timeSeconds int, percentage int) {
	runtime.GOMAXPROCS(coresCount)

	// second     ,s  * 1
	// millisecond,ms * 1000
	// microsecond,μs * 1000 * 1000
	// nanosecond ,ns * 1000 * 1000 * 1000

	// every loop : run + sleep = 1 unit

	// 1 unit = 100 ms may be the best
	unitHundresOfMicrosecond := 1000
	runMicrosecond := unitHundresOfMicrosecond * percentage
	sleepMicrosecond := unitHundresOfMicrosecond*100 - runMicrosecond
	for i := 0; i < coresCount; i++ {
		go func() {
			runtime.LockOSThread()
			// endless loop
			for {
				begin := time.Now()
				for {
					// run 100%
					if time.Now().Sub(begin) > time.Duration(runMicrosecond)*time.Microsecond {
						break
					}
				}
				// sleep
				time.Sleep(time.Duration(sleepMicrosecond) * time.Microsecond)
			}
		}()
	}
	// how long
	time.Sleep(time.Duration(timeSeconds) * time.Second)
}


func main(){
	lambda.Start(HandleRequest)
}
