import mongoose from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/enum/user.enum.js";


const userSchema=new mongoose.Schema({
    fName:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:5

    },
      lName:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:5
     },
     age:{
        type:Number,
        required:function(){
         return this.provider===ProviderEnum.system
        },
        min:20,
        max:60
     },
     email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowerCase:true
     },
     password:{
        type:String,
          required:function(){
         return this.provider===ProviderEnum.system
        },
        trim:true
     },
     gender:{
        type:String,
        enum:Object.values(GenderEnum),
        default:GenderEnum.male
     },
     profileImage:String,
     phone:String,
      role:{
        type:String,
        enum:Object.values(RoleEnum),
        default:RoleEnum.user
      },
     provider:{
        type:String,
        enum:Object.values(ProviderEnum),
        default:ProviderEnum.system
     },
     isConfirmed:{
        type:Boolean,
        default:false

     }


},{
   timestamps:true,
    strict:true,
    strictQuery:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

const userModel=mongoose.models.user||mongoose.model("user",userSchema);
export default userModel;
