import S3 from "react-aws-s3";

const bucket_config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_DIR_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  s3Url: process.env.REACT_APP_S3_URL
};

async function uploadImage(image, fileName) {
  let imageUrl = "";

  // upload image to s3 if file exists (i.e. uploaded by user)
  if (image) {
    const ReactS3Client = new S3(bucket_config);

    await ReactS3Client
      .uploadFile(image, fileName)
      .then((data) => {
        // console.log(data);
        imageUrl = data.location;
      })
      .catch((err) => {
        console.error(err);
        imageUrl = "";
      })
  }
  return imageUrl;  
}

export {
  uploadImage
}