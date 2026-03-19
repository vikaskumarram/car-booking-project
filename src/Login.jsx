import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getStrength = (password) => {
    let strengthCount = 0;
    if (password.length > 0) strengthCount++;
    if (password.length >= 6) strengthCount++;
    if (/\d/.test(password)) strengthCount++;
    return strengthCount;
  };

  const handleForgotPassword = () => {
    const email = prompt("Please enter your registered Email Address:");
    if (email) {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        alert(`A password reset link has been sent to: ${email}`);
      } else {
        alert("Please enter a valid email address!");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      profilePic: "", // Naya field DP ke liye
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Username is required";
      } else if (values.username.length < 4) {
        errors.username = "Username must be at least 4 characters";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      } else if (!/\d/.test(values.password)) {
        errors.password = "Password must include at least one number";
      }
      return errors;
    },
    onSubmit: (values) => {
      const savedUser = JSON.parse(localStorage.getItem("userCredentials"));

      if (isLogin) {
        if (!savedUser || savedUser.username !== values.username) {
          alert("User not found or incorrect username! Please create an account first.");
          setIsLogin(false);
          return;
        }

        if (savedUser.password !== values.password) {
          alert("Incorrect Password! Please try again.");
          return;
        }

        // Login ke waqt user info save kar rahe hain display ke liye
        localStorage.setItem("user", JSON.stringify({
          name: savedUser.username,
          profilePic: savedUser.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Default DP agar user ne upload nahi ki
          email: savedUser.email
        }));

        setNotification("Login Successful 🎉");
      } else {
        // Signup Mode: User image ke saath save hoga
        localStorage.setItem("userCredentials", JSON.stringify(values));
        alert("Signup Successful! ✅ You can now log in.");
        setNotification("Signup Successful 🎉");
        setIsLogin(true);
        formik.resetForm();
        return;
      }

      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setTimeout(() => {
        setNotification("");
        navigate("/Booknow");
        window.scrollTo(0, 0);
      }, 1500);
    },
  });

  const strength = formik.values.password ? getStrength(formik.values.password) : 0;

  const handleSubmitWithCheck = (e) => {
    e.preventDefault();
    if (formik.errors.username) {
      alert("⚠️ " + formik.errors.username);
    } else if (formik.errors.password) {
      alert("⚠️ " + formik.errors.password);
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <div className="login-container">
      {notification && <div className="toast-notification">{notification}</div>}

      <form onSubmit={handleSubmitWithCheck} className="login-form">
        <h2 className="login-title">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="login-input"
          required
        />

        {!isLogin && (
          <>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="login-input"
              required
            />
            <input
              name="profilePic"
              type="text"
              placeholder="Profile Picture URL (Optional)"
              onChange={formik.handleChange}
              value={formik.values.profilePic}
              className="login-input"
            />
          </>
        )}

        <div style={{ position: "relative", width: "100%" }}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="login-input"
            style={{ width: "100%", paddingRight: "40px", marginBottom: "5px" }}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "12px", top: "25%", cursor: "pointer" }}
          >
            {showPassword ? "🫣" : "👁️"}
          </span>
        </div>

        <div style={{ height: "4px", width: "100%", background: "#ddd", borderRadius: "5px", marginBottom: "15px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(strength / 3) * 100}%`, backgroundColor: strength === 1 ? "red" : strength === 2 ? "orange" : "#0cdf21", transition: "width 0.3s ease" }}></div>
        </div>

        {isLogin && (
          <p onClick={handleForgotPassword} style={{ textAlign: "right", fontSize: "13px", color: "#e74c3c", cursor: "pointer", marginTop: "-5px", marginBottom: "15px" }}>
            Forgot Password?
          </p>
        )}

        <button type="submit" className="login-button">
          {isLogin ? "Login" : "Signup"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", marginTop: "15px", color: "#3498db" }}>
          {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}