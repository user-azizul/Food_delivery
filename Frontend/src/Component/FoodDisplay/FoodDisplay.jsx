import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { foodList = [] } = useContext(StoreContext);

  // Show all dishes if "All" is selected, otherwise filter by category
  const filteredFoodList =
    category === "All" || !category
      ? foodList
      : foodList.filter((food) => food.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((food) => (
            <FoodItem
              key={food._id}
              id={food._id}
              name={food.name}
              description={food.description}
              price={food.price}
              image={food.image}
            />
          ))
        ) : (
          <p className="no-items">No dishes available.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
