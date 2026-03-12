import { useFormik } from "formik";
import { useState,  } from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState(""); // Success message ke liye
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",   // <--- Yahan comma miss tha
      email: "",      // <--- Yahan bhi comma miss tha
      password: ""
    },

    onSubmit: () => {
      // 1. Success Message set karein
      const msg = isLogin ? "Login Successful 🎉" : "Signup Successful 🎉";
      setNotification(msg);

      // 2. 1.5 Second ka wait (taaki user message padh sake)
      setTimeout(() => {
        setNotification(""); 
        navigate("/booknow"); // Book Now page par bhejo
        window.scrollTo(0, 0); 
      }, 1500);
    }
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      {notification && (
        <div className="toast-notification">
          {notification}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="login-form">
        <h2 className="login-title">{isLogin ? "Login" : "Signup"}</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="login-input"
          required
        />

        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="login-input"
            required
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          {isLogin ? "Login" : "Signup"}
        </button>
        
        <p className="toggle-link" onClick={toggleForm}>
          {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}