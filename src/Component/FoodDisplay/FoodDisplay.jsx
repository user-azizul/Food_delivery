import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list = [] } = useContext(StoreContext);

  // Show all dishes if "All" is selected, otherwise filter by category
  const filteredFoodList =
    category === "All" || !category
      ? food_list
      : food_list.filter((food) => food.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((food) => (
            <FoodItem
              key={food._id} // Ensures unique key
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
