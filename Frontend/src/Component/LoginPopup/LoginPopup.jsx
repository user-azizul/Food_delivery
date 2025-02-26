import React, { useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

function LoginPopup({ setShowLogin }) {
  const [currentState, setCurrentState] = React.useState("Sign Up");
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
      if (currentState === "Sign Up") {
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
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
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
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Log In"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            I agree to the <span>Terms</span> and <span>Privacy Policy</span>
          </p>
        </div>
        {currentState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => setCurrentState("Login")}>
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span className="link" onClick={() => setCurrentState("Sign Up")}>
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
