const User = require("../models/user");

const fieldsPattern = [
  "firstname",
  "lastname",
  "username",
  "email",
  "password",
  "gender",
  "mobile",
];

const render_profile = (req, res) => {
  res.render("profile/profile", { data: req.session.user });
};

const render_editPage = (req, res) => {
  res.render("profile/edit_profile", {
    data: req.session.user,
    succ: undefined,
    err: req.flash("err"),
  });
};

const postProfile = async (req, res) => {
  const bodyKeys = Object.keys(req.body);
  bodyKeys.pop();
  const checkFieldsResult = fieldsPattern.every((field) =>
    bodyKeys.includes(field)
  );
  //  ##################  check body response ######################
  if (!checkFieldsResult || bodyKeys.length !== 7) {
    req.flash("err", "Server err!!! check your inputs");
    return res.status(400).redirect("edit_profile");
  }

  try {
    const user = await User.findOne({ username: req.session.user.username });
    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
      if (err) {
        req.flash("err", "Server err!!!");
        return res.status(500).redirect("edit_profile");
      }

      if (!isMatch) {
        req.flash("err", "Wrong password!!!");
        return res.status(404).redirect("edit_profile");
      }

      if (req.body.password === req.body.confirm) {
        req.flash("err", "Passwords are equl!!!");
        return res.status(400).redirect("edit_profile");
      }

      User.findOneAndUpdate(
        { _id: user._id },
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          email: req.body.email,
          mobile: req.body.phone,
          gender: req.body.gender,
          password: !req.body.newpassword
            ? req.body.password
            : req.body.newpassword,
        },
        { new: true },
        (err, userUpdate) => {
          if (err) {
            return console.log(err.message);
          }
          userUpdate.save();
          req.session.user = {
            role: userUpdate.role,
            firstname: userUpdate.firstname,
            lastname: userUpdate.lastname,
            username: userUpdate.username,
            email: userUpdate.email,
            mobile: userUpdate.mobile,
            gender: userUpdate.gender,
          };
          res.status(200).render("profile/edit_profile", {
            data: req.session.user,
            succ: "Update Successfuly :)",
            err: req.flash("err"),
          });
        }
      );
    });
  } catch (err) {
    req.flash("err", "Server err!!!");
    return res.status(500).redirect("edit_profile");
  }
};

module.exports = { render_editPage, render_profile, postProfile };
