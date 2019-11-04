### Problem

Measure init "restart probability" on Lambda

### Assumptions made

* That you have go installed (go1.11 or higher)
* That you have the aws cli installed
* Default profile is where you want the experiment to be run (or you have env vars for your AKID + SKID)

### Modifications user needs to run to run the experiment

* Add your S3_BUCKET to the top of the bash.sh script.
* If you want to wait for a cold start, add a sleep after layer deletion.

## Conclusion

If you delete a lambda layer, a function can still refer to the layers that were deleted on invoke. It is only on update or create where a user would experience errors. 
