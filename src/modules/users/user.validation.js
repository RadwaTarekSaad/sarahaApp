import joi from "joi"
import { generalRules } from "../../common/utils/generalRules.js"

export const signUpSchema={
    body:joi.object({
        fName:joi.string(),
        lName:joi.string(),
        email:generalRules.email.required(),
        password:generalRules.password.required(),
        // cPassword:joi.string().valid(joi.ref("password")),
        gender:joi.string().valid("male","female"),
        age:joi.number(),
        phone:joi.string()
    }).required(),


    files: joi.object({
  attachment: joi.array()
    .items(generalRules.file.required()).required(),

  attachments:joi.array()
    .items(generalRules.file.required()).required()
}).required()
   
}
   

export const signInSchema={
    body:joi.object({
        email:generalRules.email.required(),
        password:generalRules.password.required()
    }).options({presence:"required"})
   
}
   
export const refreshTokenSchema={
  headers:generalRules.token.required(),

}

export const updateProfileSchema={
  body:joi.object({
    fName:joi.string(),
    lName:joi.string(),
    gender:joi.string().valid("male","female"),
    age:joi.number(),
    phone:joi.string()
  }).required(),
}
export const updatePasswordSchema={
  body:joi.object({
    oldPassword:generalRules.password.required(),
    newPassword:generalRules.password.required(),
    cPassword:joi.string().valid(joi.ref("newPassword")).required()

  }).required(),
}

export const shareProfileSchema={
  params:joi.object({
    id:generalRules.id.required()
  }).required()
}