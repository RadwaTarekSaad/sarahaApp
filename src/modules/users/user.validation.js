import joi from "joi"

export const signUpSchema={
    body:joi.object({
        fName:joi.string().alphanum().min(2).max(10).messages({
            "any.required":"where is firstName",
            "string.min":"firstName is too short"
        }),
        lName:joi.string().alphanum().min(2).max(10),
        email:joi.string().email({minDomainSegments: 2,maxDomainSegments: 2}),
        password:joi.string(),
        cPassword:joi.string().valid(joi.ref("password")),
        gender:joi.string().valid("male","female"),
        age:joi.number().min(20).max(60),
        date:joi.date()
    }).options({presence:"required"})
   
}
   

export const signInSchema={
    body:joi.object({
        email:joi.string().email({minDomainSegments: 2,maxDomainSegments: 2}),
        password:joi.string(),
    }).options({presence:"required"})
   
}
   