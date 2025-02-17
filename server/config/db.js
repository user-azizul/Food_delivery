import mongoose from "mongoose";


 export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://azizul2:Aa123456@cluster0.b9fz7.mongodb.net/").then(()=>console.log('Db Connected'))
}