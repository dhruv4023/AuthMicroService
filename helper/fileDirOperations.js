import fs from "fs";
export const renameAndMove = (userDir, oldPath) => {
  if (!fs.existsSync("public/"+userDir)) fs.mkdirSync("public/"+userDir);
  // console.log((userDir))
  const newPath =
    userDir +
    "/" +
    fs.readdirSync("public/"+userDir).length +
    "_" +
    "_" +
    String(oldPath).replace(" ", "_");
  fs.renameSync("public/assets/" + oldPath, "public/"+newPath);
  // console.log(newPath)
  return newPath;
};
export const deleteFile = (filePath) => {
  fs.rmSync(filePath);
};

