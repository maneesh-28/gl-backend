const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/products',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext.match(/\.(jpg|jpeg|png)$/)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
