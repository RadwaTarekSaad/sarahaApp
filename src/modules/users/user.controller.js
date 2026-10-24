import { authentication } from "../../common/middleware/authentication.js";
import { authorization } from "../../common/middleware/authorization.js";
import { multerLocal } from "../../common/middleware/multer.js";
import { validation } from "../../common/middleware/validation.js";
import * as US from "./user.service.js";
import Router from "express";
import { signInSchema, signUpSchema ,refreshTokenSchema,shareProfileSchema, updateProfileSchema, updatePasswordSchema} from "./user.validation.js";


const userRouter=Router();
userRouter.post("/signUP",

    multerLocal({customPath:"Users",customTypes:["application/pdf"]}).fields([{name:"attachment"},{name:"attachments"}]),validation(signUpSchema),US.signUP);
userRouter.post("/signIn",validation(signInSchema),US.signIn);
userRouter.post("/signup/gmail",US.signUpWithGmail);
userRouter.get("/getProfile",authentication,
    // authorization(["user","admin"]),
    US.getProfile);

userRouter.get("/shareProfile/:id",validation(shareProfileSchema),US.shareProfile);
userRouter.patch("/updateProfile",validation(updateProfileSchema),authentication,US.updateProfile);
userRouter.patch("/updatePassword",validation(updatePasswordSchema),authentication,US.updatePassword);


userRouter.post("/refreshToken",validation(refreshTokenSchema),US.refreshToken);
userRouter.patch("/logout",authentication,US.logOut)


export default userRouter