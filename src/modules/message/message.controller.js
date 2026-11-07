import { authentication } from "../../common/middleware/authentication.js";
import { multerLocal } from "../../common/middleware/multer.js";
import { validation } from "../../common/middleware/validation.js";

import {Router} from "express";

import * as MS from "./message.service.js";
import * as MV from "./message.validation.js";
import { multerEnum } from "./../../common/enum/multer.enum.js";

const messageRouter = Router({ caseSensitive: true ,mergeParams:true});
messageRouter.post(
  "/send",
  multerLocal({ customPath: "messages", customTypes: multerEnum.pdf }).array(
    "attachments",
    2,
  ),
  validation(MV.createMessageSchema),
  MS.createMessage,
);

messageRouter.get(
  "/",
//   authentication,
  MS.getMessages,
);

export default messageRouter;
