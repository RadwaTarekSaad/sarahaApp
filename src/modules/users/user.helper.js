import { Hash } from "../../common/security/hash.js";
import sendEmail, { generate_otp } from "../../common/service/sendEmail.js";
import { otpTemplate } from "../../common/utils/emailTemplate.js";
import { eventEmitter } from "../../common/utils/events.js";
import userModel from "../../DB/models/user.model.js";
import { getValue, incr, setValue, ttl } from "../../DB/service/redis.service.js";
import * as dbService  from './../../DB/service/db.service.js';

export const sendEmailOtp=async({email,isConfirmed,subject="Confirm Email"}={})=>{
    const isBlocked_ttl=await ttl(`otp::block::${email}`);
 if(isBlocked_ttl>0){
    throw new Error(`you are blocked for ${isBlocked_ttl} seconds`,{cause:400})
 }
if(isBlocked_ttl<0){
  if(await getValue(`otp::max::${email}`)>=3){
    await setValue({key:`otp::max::${email}`,value:0,ttl:60*5});
  }
}

  const otpTTL=await ttl(`otp::${email}`);
  if(otpTTL>0){
    throw new Error(`you can resend otp after ${otpTTL} seconds`,{cause:400})
  }

  const max_otp=await getValue(`otp::max::${email}`);
  if(max_otp>=3){
     await setValue({key:`otp::block::${email}`,value:"1",ttl:60*10});

    throw new Error("you reach max otp",{cause:400})
  }
const user =await dbService.findOne({model:userModel,filter:{email:email.toLowerCase(),isConfirmed:{$exists:isConfirmed}}});
 

if(!user){
throw new Error("email not exist you can signUp or is already confirmed",{cause:404})
}
 const otp=await generate_otp();
const otpHash=await Hash(otp,12);
 await setValue({key:`otp::${email}`,value:otpHash,ttl:60*20});
eventEmitter.emit("confirm_email",async()=>{
await sendEmail({
  to:email,
  subject,
  html:otpTemplate(otp)
 })
})

await incr(`otp::max::${email}`)
}