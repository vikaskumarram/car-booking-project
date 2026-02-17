import { useState } from "react";

export function Login() {
  const [Login, setLogin] = useState(true);
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-forms">
          <button
            className={Login ? "active" : ""}
            onClick={() => setLogin(true)}
          >
            Login
          </button>
          <button
            className={!Login ? "active" : "Login"}
            onClick={() => setLogin(false)}
          >
            SignUp
          </button>
        </div>
        {Login ? (
          <>
            <div className="form">
              <h1>please login to your Account</h1>
              <input type="email" placeholder="Mobile,Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forget password ?</a>
              <button>Login</button>
              <h2>
                <p>
                  Don't have an account yet?
                  <a href="#" onClick={() => setLogin(false)}>
                    {" "}
                    Sign up
                  </a>
                </p>
              </h2>
            </div>
          </>
        ) : (
          <>
            <div className="form">
              <h1>please Sign Up your Account</h1>
              <input type="email" placeholder="mobile,Email" />
              <input type="password" placeholder="password" />
              <h1>
                <input type="password" placeholder="conform password" />
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
