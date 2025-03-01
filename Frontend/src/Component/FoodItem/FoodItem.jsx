import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart, backendUrl } =
    React.useContext(StoreContext);

  const itemInCart = cartItems?.[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-img"
          src={`${backendUrl}/images/${image}`}
          alt={name}
        />
        {itemInCart === 0 ? (
          <img
            onClick={() => addToCart(id)}
            className="add-img"
            src={assets.add_icon_white}
            alt={name}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{itemInCart}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
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
