import multer from "multer";

/* FILE STORAGE */
// Configure multer to store uploaded files in a specific destination and with original filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory where files will be stored
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    // Define the filename for the stored file (using the original filename)
    cb(null, file.originalname);
  },
});

// Create a multer instance with the defined storage configuration
const upload = multer({ storage });

// Export the configured multer instance for use in other parts of the application
export default upload;
