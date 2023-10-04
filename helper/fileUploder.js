import multer from "multer";

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file);
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
export default upload;
