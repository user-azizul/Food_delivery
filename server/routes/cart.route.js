import express from "express";
import {
  addToCart,
  getCartItem,
  removeFromCart,
  removeItemFromCart
} from "../controllers/cart.controller.js";
import { userAuth } from "../middleweare/userAuth.middleweare.js";

export const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/remove", userAuth, removeFromCart);
cartRouter.post("/removeItem", userAuth, removeItemFromCart);
cartRouter.get("/get", userAuth, getCartItem);
