import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./FoodItem.css";

const FoodItem = ({ id, name, description, price, image }) => {
  cosnst[(itemCount, setItemCount)] = React.useState(0);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt={name} />
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating stars" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
