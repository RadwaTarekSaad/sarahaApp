import { findOne } from "../../DB/db.service.js";
import revokeTokenModel from "../../DB/models/revokeToken.model.js";
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

if(Math.floor(user.changeCredentialAt?.getTime()/1000) > decoded.iat){
    throw new Error("token expired",{cause:400})
    

}
if(await findOne({model:revokeTokenModel,filter:{tokenId:decoded.jti}})){
    throw new Error("token revoked login again",{cause:400})
}
req.user=user;
req.decoded=decoded;
next();

}