import Stripe from "stripe";
import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import UserModel from "../models/user.model.js";
import { OrderModel } from "../models/order.model.js";
import { userAuth } from "../middleweare/userAuth.middleweare.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);
export const orderRouter = express.Router();

// Function to get the latest USD to AED exchange rate
let cachedRate = null;
let lastFetched = null;

const getExchangeRate = async () => {
  const now = Date.now();
  if (!cachedRate || now - lastFetched > 300000) {
    try {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      cachedRate = response.data.rates.AED;
      lastFetched = now;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      cachedRate = 3.67; // Fallback default price
    }
  }
  return cachedRate;
};

// Place order route
orderRouter.post("/place", userAuth, async (req, res) => {
  const url = "http://localhost:5173";
  try {
    const { items, amount, address } = req.body;
    const { userId } = req.user;

    // Fetch real-time exchange rate
    const exchangeRate = await getExchangeRate();

    // Convert USD amount to AED
    const convertedAmount = Math.round(amount * exchangeRate);

    // Create order in database with default payment status set to false
    const newOrder = new OrderModel({
      userId,
      items,
      amount: convertedAmount,
      address,
      payment: false // Default to false
    });
    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "AED",
        product_data: {
          name: item.name
        },
        unit_amount: Math.round(item.price * 100 * exchangeRate)
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "AED",
        product_data: {
          name: "Delivery Fee"
        },
        unit_amount: Math.round(2 * 100 * exchangeRate)
      },
      quantity: 1
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.send({
      success: true,
      sessionUrl: session.url,
      message: "Order placed successfully"
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Verify order payment route
orderRouter.post("/verify", async (req, res) => {
  const { orderId, success } = req.body;
  console.log(orderId, success);
  try {
    if (success === "true") {
      // Make sure the success variable is checked correctly
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});
