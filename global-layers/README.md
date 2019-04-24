### Problem

User stated essentially the following:

```
* Once Layers are deleted or permissions are deleted, all lambda functions referring to that layer can no longer be "INVOKED"

```

## Experimental setup
 In this example application, I have a lambda layer that has:

```
+
|- example.txt
```

in example.txt is "Hello Layer". My Lambda Function will be invoked, and os.stat the file. If the their statement is true, then if I invoke after the layer is deleted, either:

* The function will fail because it's missing the layer
* The function will fail to stat the file because it no longer exists.

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

Lambda layers are merged into a single artifact on create and update function. This means that on invoke, the invoke is referring to the merged artifact and not doing on the fly downloading of
multiple files. So if something happens out of band like layer permissions removal or layer deletion, the function can continue to work, but on next update, the function will fail to update
since the reference is no longer there (that's cool though because your original function always still works).
