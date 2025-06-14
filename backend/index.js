const express= require('express');
const cors= require('cors');

require("./db/config");
const User= require("./db/User");
const app= express();

app.use(express.json());
app.use(cors());
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