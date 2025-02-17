import FoodModel from "../models/food.model.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  let image_fileName = req.file.filename;
  const food = new FoodModel({
    name,
    description,
    price,
    category,
    image: image_fileName,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.log("error on adding food", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong on adding food" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing food:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while listing food",
    });
  }
};

export { addFood, listFood };
