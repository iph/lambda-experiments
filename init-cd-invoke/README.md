### Problem

Testing how customers perceive slow invokes with provisioned concurrency.

### Assumptions made

* That you have go installed (go1.13 or higher). If you do not, I will add the app.zip so you can run from the get-go.
* Installing go: https://golang.org/dl/
* That you have the aws cli installed
* Default profile is where you want the experiment to be run (or you have env vars for your AKID + SKID)

### Modifications user needs to run to run the experiment

* Add your S3_BUCKET to the top of the bash.sh script.
* Add your STACK_NAME to the bash.sh script.

Run `sh bash.sh`

## Conclusion

It's slow.