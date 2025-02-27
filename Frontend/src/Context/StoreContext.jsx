import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  // ✅ Load Token from LocalStorage on Initial Render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken); // Set token in state
    }
  }, []);

  const addToCart = (id) => {
    setCartItems((prev) => {
      if (prev[id]) {
        return { ...prev, [id]: prev[id] + 1 };
      }
      return { ...prev, [id]: 1 };
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const newCartItems = { ...prev };
        delete newCartItems[id];
        return newCartItems;
      }
    });
  };

  const totalCartAmount = () => {
    let total = 0;
    for (let key in cartItems) {
      let quantity = cartItems[key];
      const food = food_list.find((item) => item._id === key);
      total += food.price * quantity;
    }
    return total;
  };

  const totalCartItems = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  const backendUrl = "http://localhost:4000";

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    totalCartAmount,
    backendUrl,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };
