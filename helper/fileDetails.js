// imgPaths.forEach((path) => {
//   if (isFileValid(filePath, 1, ["jpg", "jpeg", "png", "gif", "bmp"])) {

//   }
// });
import fs from "fs"; // Import the 'fs' module to access file system
export const isFileValid = (filePath, maxFileSizeInMb, FileExtensions) => {
  // Check if the file type is an image
  const fileType = getFileType(filePath);
  if (!FileExtensions.includes(fileType)) {
    return false; // Not an image file
  }

  // Check if the file size is less than 1KB
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  const fileSizeInKB = fileSizeInBytes / (1024 * 1024);
  return fileSizeInKB < maxFileSizeInMb;
};

const getFileType = (filePath) => {
  const parts = filePath.split(".");
  if (parts.length === 1) {
    return "";
  }
  return parts[parts.length - 1].toLowerCase();
};
