// import { useFormik } from "formik";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// // 🛡️ setIsLoggedIn ko props mein receive karna zaroori hai
// export function Login({ setIsLoggedIn }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [notification, setNotification] = useState("");
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: ""
//     },

//     onSubmit: (values) => {
//       // 1. Success Message
//       const msg = isLogin ? "Login Successful 🎉" : "Signup Successful 🎉";
//       setNotification(msg);

//       // 2. 🔑 YE SABSE IMPORTANT STEP HAI:
//       // App ko batao ki user login ho gaya hai aur browser ki memory (localStorage) mein save karo
//       setIsLoggedIn(true);
//       localStorage.setItem("isLoggedIn", "true");

//       // 3. Navigation
//       setTimeout(() => {
//         setNotification("");
//         navigate("/booknow");
//         window.scrollTo(0, 0);
//       }, 1500);
//     }
//   });

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <div className="login-container">
//       {notification && (
//         <div className="toast-notification">
//           {notification}
//         </div>
//       )}

//       <form onSubmit={formik.handleSubmit} className="login-form">
//         <h2 className="login-title">{isLogin ? "Login" : "Signup"}</h2>

//         <input
//           type="text"
//           name="username"
//           placeholder="Enter Username"
//           onChange={formik.handleChange}
//           value={formik.values.username}
//           className="login-input"
//           required
//         />

//         {!isLogin && (
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             onChange={formik.handleChange}
//             value={formik.values.email}
//             className="login-input"
//             required
//           />
//         )}

//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           onChange={formik.handleChange}
//           value={formik.values.password}
//           className="login-input"
//           required
//         />

//         <button type="submit" className="login-button">
//           {isLogin ? "Login" : "Signup"}
//         </button>

//         <p className="toggle-link" onClick={toggleForm}>
//           {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
//         </p>
//       </form>
//     </div>
//   );
// }

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
      // 1. Success Message tayyar karein
      const msg = isLogin ? "Login Successful 🎉" : "Signup Successful 🎉";
      setNotification(msg);

      // 2. App.jsx ki state ko update karein (Taaki Logout button dikhe aur car select ho sake)
      setIsLoggedIn(true);

      // 3. Browser memory mein save karein taaki refresh par logout na ho
      localStorage.setItem("isLoggedIn", "true");

      // 4. Thodi der baad Booknow page par bhej dein
      setTimeout(() => {
        setNotification("");
        navigate("/Booknow");
        window.scrollTo(0, 0);
      }, 1500);
    },
  });

  return (
    <div className="login-container">
      {/* Success Notification Popup */}
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
