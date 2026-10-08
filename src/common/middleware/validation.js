export const validation=(schema)=>{
    return (req,res,next)=>{
        const errResult=[];
        for (const key of object.keys(schema)) {
            const{error}=schema[key].validate(req[key],{abortEarly:false});
            if(error){
                errResult.push({message:error.message,path:err.path[0],key});
            }
        }
        if(errResult.length){
            throw new Error("validation error",{cause:400,errResult})
        }
        next();
    }
}