import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String, // Fixed typo here
    required: true // Fixed typo here
  },
  items: {
    type: Array,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  date: {
    type: Date,
    default: Date.now
  },
  payment: {
    type: Boolean,
    required: true
  }
});

export const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
