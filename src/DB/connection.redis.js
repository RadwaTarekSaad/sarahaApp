import { createClient } from "redis"

export const client_redis = createClient({
  url: "rediss://default:gQAAAAAAApqRAAIgcDFmNTkwMjI2OGYzNDY0ZjRhYjcxOWE5YmJlMjJmYjEyZQ@funny-sailfish-170641.upstash.io:6379"
});

export const connectionRedis=async()=>{
   try{
     await client_redis.connect();
      console.log("redis connected successfully....😁")
   }catch(e){
    console.log("redis connection failed...😥")
   }

}
