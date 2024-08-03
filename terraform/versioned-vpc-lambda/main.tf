provider "aws" {
  skip_region_validation = true
  region                 = "af-south-1"
}

module "vpc-integ" {
  source = "./vpc"
  tag    = "vpc-working"
}

module "vpc-integ-bad" {
  source = "./vpc"
  tag    = "vpc-not-working"
  public = false
}

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

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

resource "aws_iam_role_policy" "vpc" {
  role   = aws_iam_role.iam_for_lambda.name
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:*",
        "cloudwatch:*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}



resource "aws_lambda_function" "test_lambda" {
  filename      = "app.zip"
  function_name = "lambda_function_name"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "app"
  publish       = true
  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256("app.zip")
  timeout          = 30
  runtime          = "go1.x"

    vpc_config {
      security_group_ids = [module.vpc-integ-bad.security-group]
      subnet_ids = module.vpc-integ-bad.subnets
    }

  //vpc_config {
  //  security_group_ids = [module.vpc-integ.security-group]
  //  subnet_ids         = [module.vpc-integ.subnets]
  //}

  environment {
    variables = {
      foo = "bar"
    }
  }
}
