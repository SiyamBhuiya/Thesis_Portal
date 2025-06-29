import React, { useState } from "react";
import "../styles/loginSign.css";
import { useNavigate } from "react-router-dom";



const LoginSignup = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [signupData, setSignupData] = useState({
    studentName: "",
    username: "",
    studentID: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
     const [errors, setErrors] = useState({});
  // Sign Up Handlers
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    let error = "";
if (name === "studentName") {
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      error = "Name must contain only letters and spaces.";
    } else if (value.length < 3 || value.length > 50) {
      error = "Name must be between 3 and 50 characters.";
    }
  }
  if (name === "username") {
    if (!/^[a-z0-9]*$/.test(value)) {
      error = "Username must be lowercase letters and numbers only.";
    }
  }
  if (name === "studentID") {
    if (!/^[0-9-]+$/.test(value)) {
      error = "Student ID must be numbers and dash(-) only."
    } else if (value.length < 3 || value.length > 15) {
      error = "Student ID must be between 3 and 15 characters.";
    }
  }
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email format.";
      }
    }
    if (name === "password") {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
        error = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
      }
    }

    setSignupData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Signup successful!");
        navigate("/dashboard");
      } else {
        alert(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  // Login Handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/dashboard");
      } else {
        alert(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="main">
        <input
          type="checkbox"
          id="chk"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          aria-hidden="true"
        />

        <div className="signup">
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="studentName" placeholder="Full Name" value={signupData.studentName} onChange={handleSignupChange} required />
            {errors.studentName && <small className="error">{errors.studentName}</small>}
            <input type="text" name="username" placeholder="User name" value={signupData.username} onChange={handleSignupChange} required />
            {errors.username && <small className="error">{errors.username}</small>}
            <input type="text" name="studentID" placeholder="Student ID" value={signupData.studentID} onChange={handleSignupChange} required />
            {errors.studentID && <small className="error">{errors.studentID}</small>}
            <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
            {errors.email && <small className="error">{errors.email}</small>}
            <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
            {errors.password && <small className="error">{errors.password}</small>}
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={handleSignupChange} required />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
