export const validation=(schema)=>{
    return (req,res,next)=>{
        const errResult=[];
        for (const key of Object.keys(schema)) {
            const{error}=schema[key].validate(req[key],{abortEarly:false
});
            if(error){
                console.log(error.details);
                errResult.push({message:error.message,path:error.details.map(detail => detail.path[0]),key});
            }
        }
        if(errResult.length){
            console.log(errResult);
            console.log(JSON.stringify(errResult, null, 2));
            throw new Error("validation error",{cause:400});
        }
        next();
    }
}