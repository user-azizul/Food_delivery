import React, { useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom"; // Fixing the import from "react-router"
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const { totalCartAmount, token, setToken } = useContext(StoreContext);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const logout = () => {
    setToken(""); // Clear token from state
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        {/* Use NavLink for automatic active state styling */}
        <NavLink
          to={"/"}
          onClick={() => setMenu("home")}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <Link to="/" onClick={() => handleScroll("explore-menu")}>
          Menu
        </Link>
        <Link to="/" onClick={() => handleScroll("mobile-app")}>
          Mobile App
        </Link>
        <Link to="/" onClick={() => handleScroll("footer")}>
          Contact Us
        </Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          <div className={`${totalCartAmount() === 0 ? "" : "dot"}`}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="Bag" />
                Order
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
