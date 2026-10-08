import express from "express";
import connectionDb from "./DB/connectionDb.js";
import userRouter from "./modules/users/user.controller.js";
import cors from "cors";    

const app=express();
const port=3000;

const bootstrap=async()=>{
    app.use(cors({
        origin:"*"
    }))
app.use(express.json());
await connectionDb();
app.get("/",(req,res,next)=>{
    res.status(200).json({message:"welcome on sarahaApp.....😊"})
});


app.use("/users",userRouter)

  

app.use("{/*demo}",(req,res,next)=>{
    throw new Error(`URL ${req.originalUrl} AND METHOD ${req.method} Not FOUND `,{cause:404})
   
})

app.use((err,req,res,next)=>{
    res.status(err.cause||500).json({message:err.message,stack:err.stack})
})

    app.listen(port,()=>{
        console.log(`sarahaApp is running on port ${port}`)
    })

}
export default bootstrap;