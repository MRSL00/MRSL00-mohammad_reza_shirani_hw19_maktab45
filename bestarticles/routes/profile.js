const express = require("express");
const router = express.Router();
const {
  render_editPage,
  render_profile,
  postProfile,
} = require("../controllers/profile");

router.get("/profile", render_profile);
router.get("/editprofile", render_editPage);
router.post("/profile", postProfile);

module.exports = router;
