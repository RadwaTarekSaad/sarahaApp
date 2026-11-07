import mongoose from "mongoose";

 const connectionDb=async()=>{
   try{
     await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS:5000});
      console.log("DB connected successfully....😁")
   }catch(e){
    console.log("DB connection failed...😥")
   }

}

export default connectionDb;