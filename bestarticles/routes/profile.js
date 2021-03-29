const express = require("express");
const router = express.Router();
const {
  render_editPage,
  render_profile,
  putProfile,
  PutAvatar,
} = require("../controllers/profile");

router.get("/profile", render_profile);
router.get("/profile/edit", render_editPage);
router.put("/profile/edit", putProfile);
router.post("/profile/edit/avatar", PutAvatar);

module.exports = router;
