import mongoose from "mongoose";


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
        required:true,
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
        required:true,
        trim:true
     },
     gender:{
        type:String,
        enum:["male","female"],
        default:"male"
     },
     profileImage:String,
     phone:String,
     provider:{
        type:String,
        enum:["system","google"],
        default:"system"
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
