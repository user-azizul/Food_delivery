import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";

import "./Navbar.css";
import { Link, NavLink } from "react-router";
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
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <NavLink
          to={"/"}
          onClick={() => setMenu("home")}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <Link
          id="li"
          to="/"
          onClick={() => handleScroll("explore-menu")}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          menu
        </Link>
        <Link
          id="li"
          to="/"
          onClick={() => handleScroll("mobile-app")}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          mobile-app
        </Link>
        <Link
          id="li"
          to="/"
          onClick={() => handleScroll("footer")}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          contact us
        </Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />{" "}
          </Link>
          <div className={`${totalCartAmount() === 0 ? "" : "dot"}`}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                {" "}
                <img src={assets.bag_icon} alt="" />
                Order
              </li>
              <hr />
              <li onClick={() => logout()}>
                {" "}
                <img src={assets.logout_icon} alt="" />
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
