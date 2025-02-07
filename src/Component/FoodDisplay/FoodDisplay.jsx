import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFoodList = category
    ? food_list.filter((food) => food.category === category)
    : food_list;

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((food) => (
          <FoodItem
            key={food.name}
            id={food._id}
            name={food.name}
            description={food.description}
            price={food.price}
            image={food.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
