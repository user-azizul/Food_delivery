import React from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";

function LoginPopup({ setShowLogin }) {
  const [currentState, setCurrentState] = React.useState("Sign Up");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-tittle">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" ? (
            <input type="text" placeholder="Your name" required />
          ) : (
            ""
          )}

          <input type="email" required placeholder="Your email" />
          <input type="password" required placeholder="Your password" />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Log In"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />

          <p>
            I agree to the <span>Terms</span> and <span>Privacy Policy</span>
          </p>
        </div>
        {currentState !== "Sign Up" ? (
          <p>
            Create a new account?{" "}
            <span className="link" onClick={() => setCurrentState("Sign Up")}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have a new account?{" "}
            <span className="link" onClick={() => setCurrentState("Login")}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
