import express from 'express';

import {addFood} from '../controllers/food.controller.js';

import multer from 'multer';

 const foodRouter = express.Router();


// image upload
const  storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage:storage})  

foodRouter.post("/add",upload.single('image'),addFood)

export default foodRouter