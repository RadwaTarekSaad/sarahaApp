import { authentication } from "../../common/middleware/authentication.js";
import { authorization } from "../../common/middleware/authorization.js";
import { multerLocal } from "../../common/middleware/multer.js";
import { validation } from "../../common/middleware/validation.js";
import * as US from "./user.service.js";
import Router from "express";
import { signInSchema, signUpSchema } from "./user.validation.js";

const userRouter=Router();
userRouter.post("/signUP",validation(signUpSchema),multerLocal().single("attachment"),US.signUP);
userRouter.post("/signIn",validation(signInSchema),US.signIn);
userRouter.post("/signup/gmail",US.signUpWithGmail);
userRouter.get("/getProfile",authentication,authorization(["user","admin"]),US.getProfile);


export default userRouter