import nodemailer from "nodemailer";
import { randomInt} from 'node:crypto';
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user:"radwatarek125@gmail.com",
    pass:"fjfsfyqhdadkraqi"
 }  
})
const sendEmail=async({to,subject,html,attachments}={})=>{
 


const info = await transporter.sendMail({
    from: '"Rody" <radwatarek125@gmail.com>', // sender address
    to, // list of recipients
    subject,// subject line 
    html: html||"<b>Hello world?</b>", // HTML body
    attachments:attachments||[]
  });
  
return info.accepted?.length > 0 ? true:false
}
try {
  await transporter.verify();
  console.log("Connection successful!");
} catch (error) {
  console.log("Code:", error.code);
  console.log("Message:", error.message);
  console.log("Command:", error.command);
}

export const generate_otp=async()=>{
    return randomInt(100000,1000000).toString();
}

export default sendEmail