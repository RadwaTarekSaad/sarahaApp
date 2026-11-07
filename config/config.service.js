
import { config } from "dotenv";
import { resolve } from "path";
console.log({key:process.env.NODE_ENV});

let envKey={
    development:".env.development",
    production:".env.production"
}

config({ path: resolve(`config/${envKey[process.env.NODE_ENV]}`) });

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
export const ALLOW_ORIGINS=process.env.ALLOW_ORIGINS.split(",")||[]
export const SIGNATURE_KEY = process.env.SIGNATURE_KEY;
export const ENCRYPTION_KEY  = process.env.ENCRYPTION_KEY;
export const EMAIL  = process.env.EMAIL;
export const PASSWORD  = process.env.PASSWORD;
export const AUDIENCE_GMAIL  = process.env.AUDIENCE_GMAIL;

export const SALT_ROUNDS = +process.env.SALT_ROUNDS;
export const ACCESS_TOKEN_SIGNATURE = process.env.ACCESS_TOKEN_SIGNATURE;
export const REFRESH_TOKEN_SIGNATURE = process.env.REFRESH_TOKEN_SIGNATURE;


