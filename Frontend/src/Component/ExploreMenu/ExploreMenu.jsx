import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((menu, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === menu.menu_name ? "All" : menu.menu_name
                )
              }
              className="explore-menu-item"
              key={index}
            >
              <img
                className={category === menu.menu_name ? "active" : ""}
                src={menu.menu_image}
                alt={menu.menu_name}
              />
              <p>{menu.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
