// export function Login() {
//   return;
import { useFormik } from "formik";
import { useState } from "react";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },

    onSubmit: (values) => {
      console.log(values);
      alert(isLogin ? "Login Successful 🎉" : "Signup Successful 🎉");
    }
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <form onSubmit={formik.handleSubmit} className="login-form">

        <h2 className="login-title">{isLogin ? "Login" : "Signup"}</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="login-input"
        />

        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="login-input"
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="login-input"
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