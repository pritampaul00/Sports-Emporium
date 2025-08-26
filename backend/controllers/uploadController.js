import multer from "multer";
import path from "path";

// Multer config for local storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // folder where images will be saved
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpg, jpeg, png)"));
    }
  },
});

// Controller function to return the uploaded file path
export const uploadImage = (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }
  res.status(201).json({ imageUrl: `/uploads/${req.file.filename}` });
};
