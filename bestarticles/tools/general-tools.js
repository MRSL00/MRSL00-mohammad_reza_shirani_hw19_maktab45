const path = require("path");
const multer = require("multer");

// ############### session settings ####################
const CheckSession = function (req, res, next) {
  if (req.cookies.user_sid && req.session.user) {
    return res.redirect("http://localhost:5000/login");
  }
  next();
};

const CheakLogin = function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("http://localhost:5000/login");
  }
  next();
};

// #################### uploud photo #################

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let a = path.join(__dirname, '../public/images/avatars');
    cb(null, path.join(__dirname, "../public/images/avatars"));
  },
  filename: function (req, file, cb) {
    let a = `${req.session.user.username}-${Date.now()}-${file.originalname}`;
    cb(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`);
  },
});

const UploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("invalid image type!"), false);
    }
  },
});

module.exports = { CheakLogin, CheckSession, UploadAvatar };
