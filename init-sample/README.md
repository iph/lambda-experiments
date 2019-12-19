### Problem

Measure init "restart probability" on Lambda. Lambda has a 10 second init timeout, where you have 10 seconds after your
code is downloaded to do a reasonable amount of work. I want to see if I can trigger this right at the 10 second border.

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

When I do an invoke, it takes roughly 20 seconds, which confirms the restart behavior that I noted in the problem. Will
need to poke around a bit more to think about fixes.