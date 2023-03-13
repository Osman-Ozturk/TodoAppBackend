import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalname = file.originalname;
    const filename = originalname.split(".").slice(0, -1).join(".");
    const fileEnd = originalname.split(".").at(-1);
    cb(null, filename + uniqueSuffix + "." + fileEnd);
  },
});
const upload = multer({ storage: storage });

export default upload;