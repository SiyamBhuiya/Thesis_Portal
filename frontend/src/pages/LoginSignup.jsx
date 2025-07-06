import React, { useState, useEffect } from "react";
import "../styles/loginSign.css"; // Ensure this path is correct
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
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    if (signupData.password && signupData.confirmPassword && signupData.password !== signupData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }, [signupData.password, signupData.confirmPassword]);

  // Function to clear all signup-related errors and data
  const clearSignupForm = () => {
    setSignupData({
      studentName: "",
      username: "",
      studentID: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({}); // Clear all general errors
    setConfirmPasswordError(""); // Clear confirm password error
  };

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
        error = "Student ID must be numbers and dash(-) only.";
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
        error = "Password must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number.";
      }
    }

    setSignupData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {};

    // --- Start of Form Validation ---
    if (!signupData.studentName || !/^[a-zA-Z\s]+$/.test(signupData.studentName) || signupData.studentName.length < 3 || signupData.studentName.length > 50) {
      newErrors.studentName = "Name must be between 3 and 50 characters and contain only letters and spaces.";
      hasErrors = true;
    }
    if (!signupData.username || !/^[a-z0-9]*$/.test(signupData.username)) {
      newErrors.username = "Username must be lowercase letters and numbers only.";
      hasErrors = true;
    }
    if (!signupData.studentID || !/^[0-9-]+$/.test(signupData.studentID) || signupData.studentID.length < 3 || signupData.studentID.length > 15) {
      newErrors.studentID = "Student ID must be numbers and dash(-) and between 3 and 15 characters.";
      hasErrors = true;
    }
    if (!signupData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors.email = "Invalid email format.";
      hasErrors = true;
    }
    if (!signupData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(signupData.password)) {
      newErrors.password = "Password must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number.";
      hasErrors = true;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasErrors = true;
    } else {
      setConfirmPasswordError("");
    }
    // --- End of Form Validation ---

    setErrors(newErrors); // Update general errors state

    if (hasErrors) {
      alert("Please fix the errors in the form.");
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
        clearSignupForm(); // Clear form after successful signup
        setIsChecked(true); // Optionally switch to login tab after signup
        navigate("/dashboard");
      } else {
        alert(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

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
        credentials: "include",
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
    <div className="login-signup-page">
      <div className="auth-container">
        <div className="main">
          <input
            type="checkbox"
            id="chk"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
              // If the checkbox is currently checked (meaning we're on login and switching to signup),
              // or if we're on signup and switching to login, clear errors.
              // A simpler way: just clear errors regardless of direction to be safe.
              clearSignupForm();
            }}
            aria-hidden="true"
          />

          <div className="signup">
            <form onSubmit={handleSignupSubmit}>
              <label htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
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
              {confirmPasswordError && <small className="error">{confirmPasswordError}</small>}

              <button type="submit">Sign up</button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={handleLoginSubmit}>
              <label htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
              <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;