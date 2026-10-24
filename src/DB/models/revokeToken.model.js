import mongoose from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/enum/user.enum.js";


const revokeTokenSchema=new mongoose.Schema({
   
     tokenId:{
        type:String,
        trim:true,
        required:true,
        
     },
     userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
   expireAt:Date,
    
     changeCredentialAt:{
      type:Date,
    
},
},
{
  timestamps:true,
    strict:true,
    strictQuery:true,
  
});
revokeTokenSchema.index({expireAt:1},{expireAfterSeconds:0});
const revokeTokenModel=mongoose.models.revokeToken||mongoose.model("revokeToken",revokeTokenSchema);
export default revokeTokenModel;
