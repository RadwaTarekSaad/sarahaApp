import { compareSync, hashSync } from "bcrypt"

export const Hash=async(plainText,SALT_ROUNDS=12)=>{
return hashSync(plainText,SALT_ROUNDS)
}

export const compare=async(plainText,cipherText)=>{
    return compareSync(plainText,cipherText)

}