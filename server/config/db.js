

import mongoose from "mongoose";



const connectDB = async () => {
  try {
    const res = await mongoose.connect("mongodb+srv://saarman1261:azizul123@clusterdb.uqinl.mongodb.net/food-del");
    console.log(` DB  connected  `)
  } catch (error) {
    console.log(error, "DB connection error");
    process.exit(1);
  }
};

export  {connectDB};