const User = require("../models/user");

const createAdmin = () => {
  User.findOne({ role: "admin" }, (err, existAdmin) => {
    if (err) return console.log("err in create admin");
    if (existAdmin) return console.log("admin already exist");

    new User({
      firstname: "admin",
      lastname: "admin",
      username: "admin",
      email: "admin12345@gmail.com",
      password: "admin1378",
      gender: "male",
      mobile: "09031234567",
      role: "admin",
    }).save((err) => {
      if (err) return console.log("err in create admin");
      console.log("admin created successfully");
    });
  });
};

module.exports = { createAdmin };
