import React, { createContext } from "react";
import { food_list } from "../assets/frontend_assets/assets";

const StoreContext = createContext();

const contextValue = {
  food_list
};

const StoreContextProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };
