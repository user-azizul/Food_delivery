import React from "react";
import "./Appdownload.css";
import { assets } from "../../assets/frontend_assets/assets";

function Appdownload() {
  return (
    <div className="app-download" id="mobile-app">
      <p>
        For Better Experience Download <br /> Tomato App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
}

export default Appdownload;
