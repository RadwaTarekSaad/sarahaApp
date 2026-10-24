import joi from "joi";

export const generalRules = {
     id:joi.string().custom((value,helper)=>{
        return Types.objectId.isValid(value)?value:helper.message("invalid id")
     }),
    email:joi.string().email({minDomainSegments: 2,maxDomainSegments: 2}),
    password:joi.string(),
    file:joi.object({
            fieldname:joi.string().required(),
            originalname:joi.string().required(),
            encoding: joi.string().required(),
            mimetype: joi.string().required(),
            path: joi.string(),
            destination: joi.string(),
            filename: joi.string(),
            size: joi.number().required(),
          })
        .messages({
          "any.required": "file is required",
        }),
        token:joi.object({
      authorization: joi.string().required(),
      'user-agent': joi.string(),
      accept: joi.string(),
      'postman-token': joi.string(),
      host: joi.string(),
      'accept-encoding': joi.string(),
      connection: joi.string(),
      'content-length': joi.string()

})
}