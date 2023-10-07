import fs from "fs";

// Function to rename and move a file to a user-specific directory
export const renameAndMove = (userDir, oldPath) => {
  // Check if the user's directory doesn't exist, create it
  if (!fs.existsSync("public/" + userDir)) {
    fs.mkdirSync("public/" + userDir);
  }

  // Generate a new path for the file based on user directory and a unique name
  const newPath =
    userDir +
    "/" +
    fs.readdirSync("public/" + userDir).length + // Append a unique number
    "_" +
    "_" +
    String(oldPath).replace(" ", "_"); // Replace spaces in the original filename

  // Rename and move the file from the "public/assets" directory to the new path
  fs.renameSync("public/assets/" + oldPath, "public/" + newPath);

  // Return the new path where the file was moved
  return newPath;
};

// Function to delete a file
export const deleteFile = (filePath) => {
  // Remove the file at the specified filePath
  fs.rmSync(filePath);
};
