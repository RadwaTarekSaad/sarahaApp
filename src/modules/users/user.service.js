
import { Decrypt, Encrypt } from "../../common/security/encrypt.js";
import * as dbService from "../../DB/db.service.js";
import userModel from "../../DB/models/user.model.js"
import { compare, Hash } from "../../common/security/hash.js";
import jwt from "jsonwebtoken";
import {OAuth2Client} from 'google-auth-library';
import { ProviderEnum } from "../../common/enum/user.enum.js";
import joi from "joi";
import { hash } from "bcrypt";
import { randomUUID } from 'node:crypto';
import revokeTokenModel from "../../DB/models/revokeToken.model.js";
const client = new OAuth2Client();
export const signUpWithGmail = async (req, res, next) => {
  const { idToken } = req.body;

  const decoded = await client.verifyIdToken({
    idToken,
    audience:
      "840220362006-ls1f9gbbg8toeceiu5pqatjhrh6updp4.apps.googleusercontent.com"
  });

  const { family_name, given_name, picture, email_verified, email }=decoded.getPayload();

  let user = await userModel.findOne({
    email: email.toLowerCase()
  });

  if (!user) {
    user = await userModel.create({
      fName: given_name,
      lName: family_name,
      email,
      profileImage: picture,
      isConfirmed: email_verified,
      provider: ProviderEnum.google
    });
  }

  if (user.provider === "system") {
    throw new Error("login with system only");
  }

  const access_token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "ahmed123",
    {
      expiresIn: 60 * 5,
    }
  );

  const refresh_token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    "ali123"
  );

  return res.status(200).json({
    message: "Done",
    tokens: {
      access_token,
      refresh_token,
    },
  });
};

export const signUP=async(req,res,next)=>{


 const{fName,lName,email,password,age,gender,phone}=req.body
 

if(await dbService.findOne({model:userModel,filter:{email:email.toLowerCase()}})){
    throw new Error("email is already exists",{cause:409})
}
const paths=[];
for(const file of req.files.attachments){
paths.push(file.path)
}
 
const user =await dbService.create({model:userModel,data:{fName,lName,email,password:await Hash(password),age,gender,phone:Encrypt(phone),profileImage:req.files.attachment[0].path,coverImages:paths.slice(1)}});
 
return res.status(201).json({message:"Done",user})


}

export const signIn=async(req,res,next)=>{

    const{email,password}=req.body

const user =await dbService.findOne({model:userModel,filter:{email:email.toLowerCase(),provider:ProviderEnum.system}});
if(!user){
    throw new Error("email not exist you can signUp",{cause:404});
   
}
// if(user.isConfirmed!==true){
//    return res.status(400).json({message:"email not confirmed"})
// }
const tokenId=randomUUID();
if(!await compare(password,user.password)){
    throw new Error("invalid password",{cause:400})
}
const accessToken=jwt.sign({id:user._id,email:user.email},"ahmed123",{
    expiresIn:60*5,
    audience:"http://localhost:4000",
    issuer:"http://localhost:3000",
    noTimestamp:true,
    jwtid:tokenId
    // notBefore:60
})
const refreshToken=jwt.sign({id:user._id,email:user.email},"ali123",{
    expiresIn:60*5,
    audience:"http://localhost:4000",
    issuer:"http://localhost:3000",
    noTimestamp:true,
    jwtid:tokenId
    // notBefore:30
})


    return res.status(200).json({message:"login success",tokens:{accessToken,refreshToken}})



}


export const getProfile=async(req,res,next)=>{

    return res.status(200).json({message:"Done",user:req.user});

}

export const shareProfile=async(req,res,next)=>{
    const{id}=req.params;
  let user=await dbService.findById({model:userModel,id,options:{password:0}});
  if(!user){  
    throw new Error("user not exists",{cause:404});
  }
  user.phone=Decrypt(user.phone);
  return res.status(200).json({message:"Done",user})

}

export const updateProfile=async(req,res,next)=>{
  const{fName,lName,gender,age,phone}=req.body;
  const updateQuery={};
  if(fName!==undefined){
    updateQuery.fName=fName;
  }
  if(lName!==undefined){
    updateQuery.lName=lName;
  }
  if(gender!==undefined){
    updateQuery.gender=gender;
  }
  if(age!==undefined){
    updateQuery.age=age;
  }
  if(phone!==undefined){
    updateQuery.phone=Encrypt(phone);
  }
  let user=await dbService.findByIdAndUpdate({model:userModel,id:req.user._id,update:updateQuery});
  return res.status(200).json({message:"Done",user});
}
export const updatePassword=async(req,res,next)=>{
  const{oldPassword,newPassword}=req.body;
  if(!await compare(oldPassword,req.user.password)){
    throw new Error("invalid old password",{cause:400});
  }
 
  req.user.password=await hash(newPassword,10);
   req.user.changeCredentialAt=new Date();
  await req.user.save();
  return res.status(200).json({message:"Done",user:req.user});
}

export const refreshToken=async(req,res,next)=>{
  const{authorization}=req.headers;
  if(!authorization){
    throw new Error("token not exists",{cause:400});
  }

  const decoded=jwt.verify(authorization,"ali123");
  if(!decoded?.id){
    throw new Error("invalid token",{cause:400});
  }

  const user=await dbService.findOne({model:userModel,filter:{_id:decoded.id}});
  if(!user){
    throw new Error("user not exists",{cause:404});
  }
  const access_token=jwt.sign({id:user._id,email:user.email},"ahmed123",{
    expiresIn:60*5
  });
  return res.status(200).json({message:"Done",tokens:{access_token}});
}

export const logOut=async(req,res,next)=>{
  const{flag}=req.query;
  if(flag==="all"){
  req.user.changeCredentialAt=new Date();
  await req.user.save();
 }
  
 await dbService.create({

  model:revokeTokenModel,
  data:{
    userId:req.user._id,
    tokenId:req.decoded.jti,
    expireAt:new Date(req.decoded.exp*1000)

  }
 })
 return res.status(200).json({
  message:"Done"
 })

}