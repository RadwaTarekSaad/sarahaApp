import { client_redis } from "../connection.redis.js"

export const setValue=async({key,value,ttl}={})=>{
    try{
        value=typeof value == "string"?value:JSON.stringify(value)
       ttl?await client_redis.set(key,value,{Ex:ttl}):await client_redis.set(key,value)
    }catch(e){
           console.log(e,"redis setValue failed")
    }
}
export const update=async({key,value,ttl}={})=>{
    try{
        if(!await client_redis.exists(key)) return 0;
     await client_redis.set(key,value,{Ex:ttl})
    }catch(e){
           console.log(e,"redis update failed")
    }
}
export const getValue=async(key)=>{
    try{

       
      try{
       return JSON.parse(await client_redis.get(key))

      }catch(e){
      return  await client_redis.get(key)
      }
    }catch(e){
           console.log(e,"redis getValue failed")
    }
}


export const ttl=async(key)=>{
    try{
        
     await client_redis.ttl(key)
    }catch(e){
           console.log(e,"redis ttl failed")
    }
}
export const exists=async(key)=>{
    try{
        
     await client_redis.exists(key)
    }catch(e){
           console.log(e,"redis exists failed")
    }
}
export const expire=async({ttl,key}={})=>{
    try{
        
     await client_redis.expire(key,ttl)
    }catch(e){
           console.log(e,"redis expire failed")
    }
}
export const deleteKey=async(key)=>{
    try{
        if(!key?.length)return 0;
        
     return await client_redis.del(key)
    }catch(e){
           console.log(e,"redis deleteKey failed")
    }
}
export const keys=async(key)=>{
    try{
        
     await client_redis.keys(`${key}*`)
    }catch(e){
           console.log(e,"redis exists failed")
    }
}
export const incr=async(key)=>{
    try{
        
     await client_redis.incr(key)
    }catch(e){
           console.log(e,"redis increment failed")
    }
}