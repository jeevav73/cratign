import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION;
const bucket = process.env.S3_BUCKET;
const client = region && bucket ? new S3Client({ region }) : null;

export function isS3Configured() {
  return Boolean(client && bucket);
}

export async function uploadAttachment({ body, contentType, key, originalName }) {
  if (!client || !bucket) {
    const error = new Error('S3 upload is not configured. Set AWS_REGION and S3_BUCKET.');
    error.status = 503;
    throw error;
  }

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      ContentDisposition: `attachment; filename="${originalName.replace(/"/g, '')}"`,
    }),
  );

  return `s3://${bucket}/${key}`;
}