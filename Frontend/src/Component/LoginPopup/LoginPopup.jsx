import React, { useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

function LoginPopup({ setShowLogin }) {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const { backendUrl, setToken } = useContext(StoreContext);

  // Handle input changes
  const onChangeHandlers = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login or sign-up
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignUp) {
        // Sign-up request
        response = await axios.post(`${backendUrl}/auth/register`, data);
      } else {
        // Login request
        response = await axios.post(`${backendUrl}/auth/login`, {
          email: data.email,
          password: data.password
        });
      }
      // Save the token to context or local storage
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false); // Close the login popup
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-tittle">
          <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {isSignUp && (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandlers}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandlers}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandlers}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit">{isSignUp ? "Create Account" : "Log In"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            I agree to the <span>Terms</span> and <span>Privacy Policy</span>
          </p>
        </div>
        {isSignUp ? (
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => setIsSignUp(!isSignUp)}>
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span className="link" onClick={() => setIsSignUp(!isSignUp)}>
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
