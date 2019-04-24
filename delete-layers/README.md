### Problem

User stated essentially the following:

* Once Layers are deleted or permissions are deleted, all lambda functions referring to that layer can no longer be "INVOKED" or on cold start, they will fail to run (so new containers). 


## Experimental setup
 In this example application, I have a lambda layer that has:

```
+
|- example.txt
```

in example.txt is "Hello Layer". My Lambda Function will be invoked, and os.stat the file (based on the documentation, all files are unloaded into /opt, so I can refer to it via `/opt/example.txt`). If a layer is dynamically built on runtime, then:

* The function will fail because it's missing the layer and you see some weird error on invoke
* The function will fail to stat the file because it no longer exists since the layer no longer exists.

Otherwise, all invokes will continue to work since Lambda is referencing immutable/post-processed objects instead of the original artifacts on boot.

### Assumptions made

* That you have go installed (go1.11 or higher)
* That you have the aws cli installed
* Default profile is where you want the experiment to be run (or you have env vars for your AKID + SKID)

### Modifications user needs to run to run the experiment

Add your S3_BUCKET to the top of the bash.sh script.

## Output

```
bash bash.sh                                                                                                                                                            G:master[57S] 86ea086 1↑ ⭑ ?
  adding: app (deflated 51%)
  adding: example.txt (stored 0%)
Uploading to b10a6e433cc92714082239b445ea57c6  185 / 185.0  (100.00%)100.00%)
Successfully packaged artifacts and wrote output template to file exported.yaml.
Execute the following command to deploy the packaged template
aws cloudformation deploy --template-file /Users/seamyers/experiments/lambda-experiments/global-layers/exported.yaml --stack-name <YOUR STACK NAME>

Waiting for changeset to be created..
Waiting for stack create/update to complete
Successfully created/updated stack - global-layers
{"Output":"13"}{
    "ExecutedVersion": "$LATEST",
    "StatusCode": 200
}

deleted lambda layer now running invoke again, should show output: 13

{"Output":"13"}{
    "ExecutedVersion": "$LATEST",
    "StatusCode": 200
}
cool, now cleaning up...
```

## Conclusion

If you delete a lambda layer, a function can still refer to the layers that were deleted on invoke. It is only on update or create where a user would experience errors. 
