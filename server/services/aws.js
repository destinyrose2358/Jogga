const graphQL = require('graphql');
const AWS = require('aws-sdk');

if (process.env.NODE_ENV !== "production") {
  AWS.config.loadFromPath("./credentials.json");
}

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
});

const singleUpload = async (file) => {
  const { filename, mimetype, createReadStream } = await file;
  const fileStream = createReadStream();
  const path = require("path");
  // name of the file in your S3 bucket will be the date in ms plus the extension name
  const Key = new Date().getTime().toString() + path.extname(filename);
  const uploadParams = {
    // name of your bucket here
    Bucket: "jogga",
    Key,
    Body: fileStream
  };
  console.log(Key);
  const result = await s3.upload(uploadParams).promise();
  console.log(result);
  // save the name of the file in your bucket as the key in your database to retrieve for later
  return result.Key;
}

module.exports = { singleUpload, s3 };