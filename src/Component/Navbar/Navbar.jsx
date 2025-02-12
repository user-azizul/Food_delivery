import React, { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";

import "./Navbar.css";
import { Link, NavLink } from "react-router";

const Navbar = ({ setShowLogin }) => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          <div className="dot"></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
