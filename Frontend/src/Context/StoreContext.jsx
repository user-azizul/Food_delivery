import React, { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Save Token to LocalStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      console.warn("Token removed from LocalStorage");
    }
  }, [token]);

  const addToCart = async (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    try {
      if (!token) {
        console.warn("Skipping API call: No token available");
        return;
      }
      const { data } = await axios.post(
        `${backendUrl}/cart/add`,
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data);
    } catch (error) {
      console.log(error, "add to cart error");
    }
  };

  const removeFromCart = async (id) => {
    try {
      setCartItems((prev) => {
        const newCartItems = { ...prev };
        if (newCartItems[id] > 1) {
          newCartItems[id] -= 1;
        } else {
          delete newCartItems[id];
        }
        return newCartItems;
      });
      const { data } = await axios.post(
        `${backendUrl}/cart/remove`,
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        console.log("item removed from cart");
      }
    } catch (error) {
      console.log("item remove error from cart" + error);
    }
  };

  const removeItemFromCart = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/cart/removeItem`,
        { productId: id },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (data.success) {
        console.log("item removed from cart");
        setCartItems((prev) => {
          const newCartItems = { ...prev };
          delete newCartItems[id];
          return newCartItems;
        });
      }
    } catch (error) {
      console.log("cart error from cart page " + error);
    }
  };

  const totalCartAmount = () => {
    let total = 0;
    for (let key in cartItems) {
      let quantity = cartItems[key];
      const food = foodList.find((item) => item._id === key);
      if (food) {
        total += food.price * quantity;
      }
    }
    return total;
  };

  const totalCartItems = useMemo(() => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  }, [cartItems]);

  const backendUrl = "http://localhost:4000";

  const getAllfood = async () => {
    try {
      const result = await axios.get(`${backendUrl}/api/food/list`);
      if (result.data.success) {
        setFoodList(result.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  const getCartItems = async () => {
    if (!token) {
      console.warn("Skipping API call: No token available");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/cart/get`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.cart) {
        setCartItems(response.data.cart);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  useEffect(() => {
    getCartItems();
    getAllfood();
  }, [token]); // Runs when token changes

  const contextValue = useMemo(
    () => ({
      foodList,
      cartItems,
      addToCart,
      removeFromCart,
      totalCartAmount,
      totalCartItems,
      backendUrl,
      token,
      setToken,
      removeItemFromCart
    }),
    [foodList, cartItems, totalCartAmount, totalCartItems, token]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };
