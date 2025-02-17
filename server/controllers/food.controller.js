import FoodModel from "../models/food.model.js";
import fs from "fs";


// add food item
const add = async (req, res) => {
    const { name, description, price, category } = req.body;
    const image = req.file.filename;
    try {
        const food = new FoodModel({
            name,
            description,
            price,
            image,
            category,
        });
        await food.save();
        res.status(201).json({ message: "Food added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
const addFood = async (req, res) => {
    const { name, description, price, category } = req.body;
let image_fileName = req.file.filename;
const food = new FoodModel({
    name,description,price,category,image:image_fileName
}) 
try {
    await food.save();
    res.json({sucess:true, message:'Food added successfully'})
} catch (error) {
    console.log("error on adding food",error)
    res.status(500).json({sucess:false,message:'Something went wrong on adding food'})
    
}
}

export { addFood };