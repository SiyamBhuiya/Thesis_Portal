const express= require('express');
const cors= require('cors');
const cookieParser = require("cookie-parser");
const {
  hashPassword,
  comparePassword,
  createToken
} = require("./util/auths");
require("./db/config");
const submissions = require("./db/submissions");
const authRoutes = require("./routes/route");
const User= require("./db/User");
const app= express();
const PORT = process.env.PORT || 5000;

// Signup 
app.post("/signup", async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const hashed = await hashPassword(password);
    const newUser = new User({ ...userData, password: hashed });
    const savedUser = await newUser.save();

    const token = createToken(savedUser);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: "Lax",
    });

    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect password" });

    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000,
      sameSite: "Lax",
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});
//submission
app.post("/submit", async (req, res) => {
  try {
    const submissionData = req.body;
    const newSubmission = new submissions(submissionData);
    const savedSubmission = await newSubmission.save();
    res.status(201).json({ success: true, data: savedSubmission });
  } catch (error) {
    console.error("❌ Submission error:", error);
    res.status(500).json({ success: false, message: "Submission failed" });
  }
});
app.use(express.json());