#!/bin/bash

set -euo pipefail



export AWS_ACCESS_KEY_ID=000000000000
export AWS_SECRET_ACCESS_KEY=000000000000
export AWS_DEFAULT_REGION=eu-west-2

EMAIL_BUCKET=police-emails
EMAIL_TOPIC_NAME=email-topic
EMAIL_TOPIC_ARN=arn:aws:sns:eu-west-2:000000000000:$EMAIL_TOPIC_NAME
EMAIL_QUEUE_NAME=email
EMAIL_QUEUE_ARN=arn:aws:sqs:eu-west-2:000000000000:$EMAIL_QUEUE_NAME
EMAIL_DLQ_NAME=email_dlq
MATCHING_TOPIC_NAME=matching-notifications
MATCHING_TOPIC_ARN=arn:aws:sns:eu-west-2:000000000000:$MATCHING_TOPIC_NAME
MATCHING_QUEUE_NAME=matching-queue
MATCHING_QUEUE_ARN=arn:aws:sqs:eu-west-2:000000000000:$MATCHING_QUEUE_NAME
MATCHING_DQL_NAME=matching-dlq

# Setup email topic / queue / subscription
awslocal sns create-topic --name $EMAIL_TOPIC_NAME
awslocal sqs create-queue --queue-name $EMAIL_DLQ_NAME
awslocal sqs create-queue --queue-name $EMAIL_QUEUE_NAME --attributes file:///etc/localstack/init/ready.d/email-queue-attributes.json
awslocal sns subscribe --topic-arn $EMAIL_TOPIC_ARN --protocol sqs --notification-endpoint $EMAIL_QUEUE_ARN

# Setup matching topic / queue / subscription
awslocal sns create-topic --name $MATCHING_TOPIC_NAME
awslocal sqs create-queue --queue-name $MATCHING_DQL_NAME
awslocal sqs create-queue --queue-name $MATCHING_QUEUE_NAME --attributes file:///etc/localstack/init/ready.d/matching-queue-attributes.json
awslocal sns subscribe --topic-arn $MATCHING_TOPIC_ARN --protocol sqs --notification-endpoint $MATCHING_QUEUE_ARN

# Publish a valid message
# awslocal sns publish --topic-arn $MATCHING_TOPIC_ARN --message "{\"type\": \"CRIME_MATCHING_REQUEST\",\"crime_batch_id\": \"f613cb4c-1a25-4e8c-b85f-f481616270d8\"}"

# Create S3 buckets / objects using files mounted to /seed/s3
SEED_ROOT="/seed/s3"

if [ ! -d "$SEED_ROOT" ]; then
  echo "No seed directory at $SEED_ROOT; skipping."
  exit 0
fi

# Each top-level directory becomes a bucket name
for bucket_dir in "$SEED_ROOT"/*; do
  [ -d "$bucket_dir" ] || continue
  bucket="$(basename "$bucket_dir")"

  echo "Seeding bucket: $bucket"
  awslocal s3 mb "s3://${bucket}" 2>/dev/null || true

  # Sync contents to the bucket root
  awslocal s3 sync "$bucket_dir" "s3://${bucket}" --delete
done

echo "S3 seeding complete."

# Creating email notifications
for email_file in "$SEED_ROOT/$EMAIL_BUCKET"/*; do
  [ -d "$SEED_ROOT/$EMAIL_BUCKET" ] || continue
  filename="${email_file##*/}"
  S3_KEY="$filename"
  echo $S3_KEY

  awslocal sns publish --topic-arn $EMAIL_TOPIC_ARN --message "{\"notificationType\":\"Received\",\"receipt\":{\"action\":{\"type\":\"S3\",\"bucketName\":\"$EMAIL_BUCKET\",\"objectKeyPrefix\":\"\",\"objectKey\":\"$S3_KEY\"}}}"
done

