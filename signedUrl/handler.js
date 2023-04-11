const AWS = require("aws-sdk")

let params = {
  signatureVersion: 'v4',
}
if (process.env.IS_OFFLINE) {
  params = {
    accessKeyId: "S3RVER", 
    secretAccessKey: "S3RVER", 
  }
}

const s3 = new AWS.S3(params)

const signedS3URL = async(event, context) => {
  const filename = event.queryStringParameters.filename                           
  const signedURL = await s3.getSignedUrlPromise("putObject", {
    Key: `upload/${filename}`,
    Bucket: process.env.BUCKET,
    Expires: parseInt(process.env.EXPIRES_TIME),
  });

  return {
    "statusCode": 200,
    "body": JSON.stringify({ signedURL })
  }
}

module.exports = {
  signedS3URL
}