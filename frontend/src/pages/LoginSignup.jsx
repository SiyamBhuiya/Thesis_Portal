import React, { useState } from "react";
import "../styles/style.css"; // Assuming CSS is external

const SlideForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Signed up successfully!");
    // Handle real signup logic here
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
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="studentName"
              placeholder="Full Name"
              value={signupData.studentName}
              onChange={handleSignupChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="User name"
              value={signupData.username}
              onChange={handleSignupChange}
              required
            />
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={signupData.studentId}
              onChange={handleSignupChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
              required
            />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SlideForm;

// import React from 'react';
// import '../styles/style.css'; // Make sure you rename your CSS file and update this path accordingly

// const SlideNavbar = () => {
//   return (
//     <div className="auth-container">
//     <div className="main">
//       <input type="checkbox" id="chk" aria-hidden="true" />

//       <div className="signup">
//         <form>
//           <label htmlFor="chk" aria-hidden="true">Sign up</label>
//           <input type="text" name="txt" placeholder="User name" required />
//           <input type="email" name="email" placeholder="Email" required />
//           <input type="password" name="password" placeholder="Password" required />
//           <input type="password" name="ConfirmPassword" placeholder="Confirm Password" required />
//           <button>Sign up</button>
//         </form>
//       </div>

//       <div className="login">
//         <form>
//           <label htmlFor="chk" aria-hidden="true">Login</label>
//           <input type="email" name="email" placeholder="Email" required />
//           <input type="password" name="pswd" placeholder="Password" required />
//           <button>Login</button>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SlideNavbar;
