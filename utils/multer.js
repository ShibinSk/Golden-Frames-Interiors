const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "public/gallery-images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "unsuported image formate" });
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000 * 5000*5},
  fileFilter: fileFilter,
});

module.exports = upload;
