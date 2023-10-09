import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});
// Define the uploadFile function
export const uploadFile = async ({ file, newImgFileName, dirAddress }) => {
  // Use cloudinary.uploader.upload_stream to upload the file
  const result = await cloudinary.uploader.upload_stream(
    {
      resource_type: "auto",
      public_id: newImgFileName,
      folder: `${dirAddress}`,
    },
    async (error, result) => {
      if (error) {
        console.error("Error uploading to Cloudinary:", error);
      } else {
        console.log("File uploaded to Cloudinary:", result);
        // return result.public_id;
      }
    }
  );

  // Log the file object
  // console.log("File object:", file);

  // Pipe the file's stream to the Cloudinary upload stream
  streamifier.createReadStream(file.buffer).pipe(result);
  // console.log("done")
};

// export const uploadOneImg = async ({ dirAddress, imgPath, newImgFileName }) => {
//   try {
//     // imgPaths.forEach((path, index) => {
//     if (isFileValid(filePath, 1, ["jpg", "jpeg", "png", "gif", "bmp"])) {
//       uploadToCloudNary(imgPath, dirAddress, newImgFileName).then((x) => {
//         console.log(x.public_id)
//         return x.public_id;
//       });
//     } else {
//       return { msg: "file size is more than 1 mb or not a img file" };
//     }
//     // });
//   } catch (error) {
//     return "server error";
//   }
// };

// const uploadToCloudNary = (path, dirAddress, newImgFileName) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       path,
//       { public_id: newImgFileName, folder: `${dirAddress}` },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );
//   });
// };

// const filePath = "C://Users//Dhruv//Documents//img.jpg";

// uploadOneImg({
//   imgPath: filePath,
//   dirAddress: "Users/" + "username",
//   newImgFileName: "profileImg",
// }).then((x) => console.log(x.public_id));
