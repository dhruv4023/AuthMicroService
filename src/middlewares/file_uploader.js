import multer from 'multer';

// Create a custom multer storage engine
const storage = multer.memoryStorage();

// Create a custom multer file filter for validating file types, if needed
const fileFilter = (req, file, cb) => {
  // Implement your file type validation logic here if necessary
  // Example: Check if the file is an image (e.g., image/jpeg or image/png)
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

// Create a multer instance with the custom storage and file filter
const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 10 }  });

export default upload;
