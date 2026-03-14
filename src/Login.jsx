import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Login({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: () => {
      const msg = isLogin ? "Login Successful 🎉" : "Signup Successful 🎉";
      setNotification(msg);

      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");

      setTimeout(() => {
        setNotification("");
        navigate("/Booknow");
        window.scrollTo(0, 0);
      }, 1500);
    },
  });

  return (
    <div className="login-container">
      {notification && <div className="toast-notification">{notification}</div>}

      <form onSubmit={formik.handleSubmit} className="login-form">
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
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="login-input"
            required
          />
        )}

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{ cursor: "pointer", marginTop: "15px", color: "#3498db" }}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
