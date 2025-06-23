const express = require("express");
const router = express.Router();
const User = require("./User");
const { hashPassword, comparePassword, createToken } = require("./util/auth");

router.post("/signup", async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const hashed = await hashPassword(password);
    const newUser = new User({ ...userData, password: hashed });
    const savedUser = await newUser.save();

    const token = createToken(savedUser);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password" });

    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

module.exports = router;
