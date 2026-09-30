
import { Decrypt, Encrypt } from "../../common/middleware/security/encrypt.js";
import * as dbService from "../../DB/db.service.js";
import userModel from "../../DB/models/user.model.js"
import { compare, Hash } from "../../common/middleware/security/hash.js";

export const signUP=async(req,res,next)=>{
 const{fName,lName,email,password,age,gender,phone}=req.body
if(await dbService.findOne({model:userModel,filter:{email:email.toLowerCase()}})){
    throw new Error("email is already exists",{cause:409})
}
const user =await dbService.create({model:userModel,data:{fName,lName,email,password:await Hash(password),age,gender,phone:Encrypt(phone)}});

return res.status(201).json({message:"Done",user})


}

export const signIn=async(req,res,next)=>{

    const{email,password}=req.body

const user =await dbService.findOne({model:userModel,filter:{email:email.toLowerCase(),provider:"system"}});
if(!user){
    throw new Error("email not exist you can signUp",{cause:404});
   
}
// if(user.isConfirmed!==true){
//    return res.status(400).json({message:"email not confirmed"})
// }
if(!await compare(password,user.password)){
    throw new Error("invalid password",{cause:400})
}
    return res.status(200).json({message:"login success",user:{...user._doc,phone:Decrypt(user.phone)}})



}