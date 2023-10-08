import { v2 as cloudinary } from "cloudinary";
import { isFileValid } from "./fileDetails.js";
cloudinary.config({
  cloud_name: "dbnmraxnj",
  api_key: "297941653861185",
  api_secret: "MA7jhoSvHc2kZc-D1xoFaw9UeEw",
});
export const uploadOneImg = async ({ dirAddress, imgPath, newImgFileName }) => {
  try {
    // imgPaths.forEach((path, index) => {
    if (isFileValid(filePath, 1, ["jpg", "jpeg", "png", "gif", "bmp"])) {
      uploadToCloudNary(imgPath, dirAddress, newImgFileName).then((x) => {
        console.log(x.public_id)
        return x.public_id;
      });
    } else {
      return { msg: "file size is more than 1 mb or not a img file" };
    }
    // });
  } catch (error) {
    return "server error";
  }
};

const uploadToCloudNary = (path, dirAddress, newImgFileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: newImgFileName, folder: `${dirAddress}` },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const filePath = "C://Users//Dhruv//Documents//img.jpg";

// uploadOneImg({
//   imgPath: filePath,
//   dirAddress: "Users/" + "username",
//   newImgFileName: "profileImg",
// }).then((x) => console.log(x.public_id));
