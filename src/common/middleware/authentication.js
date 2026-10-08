import { findOne } from "../../DB/db.service.js";
import userModel from "../../DB/models/user.model.js";
import jwt  from "jsonwebtoken";

export const authentication=async(req,res,next)=>{
const {authorization}=req.headers;
if(!authorization){
    throw new Error("token not exists",{cause:404})
}
const decoded=jwt.verify(authorization,"ahmed123");

if(!decoded?.id){
    throw new Error("invalid token",{cause:400})
}
console.log("decoded:", decoded);

const user=await findOne({model:userModel,filter:{_id:decoded.id}});
if(!user){
    throw new Error("user not exists",{cause:404})
}
req.user=user;
next();

}