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
    return res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.log("error on adding food", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong on adding food" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});

    if (!foods.length) {
      return res.status(404).json({
        success: false,
        message: "No food items found",
      });
    }

    return res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing food:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while listing food",
    });
  }
};

// remove food

const removeFood = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.json({ success: false, message: "Food ID is required" });
    }

    const food = await FoodModel.findById(_id);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // Delete food image from uploads if it exists
    if (food.image) {
      const imagePath = `uploads/${food.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
    }

    await FoodModel.findByIdAndDelete(_id);
    return res.json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error("Something went wrong while deleting food:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong while deleting food",
      });
  }
};

export { addFood, listFood, removeFood };
