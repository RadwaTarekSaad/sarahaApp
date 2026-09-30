import * as US from "./user.service.js";
import Router from "express";

const userRouter=Router();
userRouter.post("/signUP",US.signUP);
userRouter.post("/signIn",US.signIn)

export default userRouter