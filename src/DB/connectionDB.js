import mongoose from "mongoose";
import { MONGO_URI } from "../../config/config.service.js";

 const connectionDb=async()=>{
   try{
     await mongoose.connect(MONGO_URI,{serverSelectionTimeoutMS:5000});
      console.log("DB connected successfully....😁")
   }catch(e){
    console.log("DB connection failed...😥")
   }

}

export default connectionDb;