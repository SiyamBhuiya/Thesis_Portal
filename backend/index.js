const express= require('express');
const cors= require('cors');
const cookieParser = require("cookie-parser");
const authRoutes = require("./auths");
require("./db/config");
const User= require("./db/User");
const app= express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", authRoutes);
app.post("/signup", async (req, resp) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    resp.status(201).send({
      success: true,
      message: "User created successfully",
      data: result
    });
  } catch (error) {
    console.error("Signup error:", error);
    resp.status(500).send({
      success: false,
      message: "Failed to create user",
      error: error.message
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});