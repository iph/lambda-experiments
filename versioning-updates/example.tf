provider "aws" {
  region  = "us-west-1"
}


resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda-version-experiment"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "test_lambda" {
  filename      = "app.zip"
  function_name = "lambda-example-versioning-function"
  role          = "${aws_iam_role.iam_for_lambda.arn}"
  handler       = "app"
  publish       = true
  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("app.zip")
  timeout          = 30
  memory_size      = 3000
  runtime          = "go1.x"

  environment {
    variables = {
      foo = "bar"
    }
  }
}