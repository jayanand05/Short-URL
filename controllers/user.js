const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleSignUp(req, res) {
  const { username, email, password } = req.body;

  await User.create({
    username,
    email,
    password,
  });
  res.redirect("/");
}

async function handleLoginPage(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    res.render("login", {
      error: "invalid email or password",
    });
  const token = setUser(user);
  res.cookie("uid", token);
  res.redirect("/");
}

module.exports = { handleSignUp, handleLoginPage };
