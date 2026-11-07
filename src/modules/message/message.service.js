import * as dbService from "../../DB/service/db.service.js";

import messageModel from "../../DB/models/message.model.js";
import userModel from "./../../DB/models/user.model.js";
import { successResponse } from "../../common/utils/success.response.js";

export const createMessage = async (req, res, next) => {
  const { content, userId } = req.body;
  if (!content && !req.files?.length) {
    throw new Error("content or attachments required", { cause: 400 });
  }
  const userExist = await dbService.findById({
    model: userModel,
    id: userId,
  });
  if (!userExist) {
    throw new Error("User not found", { cause: 404 });
  }
  let urls = [];
  if (req.files?.length) {
    for (const file of req.files) {
      urls.push(file.path);
    }
  }
  const message = await dbService.create({
    model: messageModel,
    data: { content, userId, attachments: urls },
  });

  successResponse({
    res,
    statusCode: 201,
    message: "Message created successfully",
    data: message,
  });
};

export const getMessages = async (req, res, next) => {
  console.log(req.params);
  
  const messages = await dbService.find({
    model: messageModel,
    filter: { userId: req.params.userId },
    populate: { path: "userId", select: "fName lName email" },
  });

  successResponse({
    res,
    statusCode: 200,
    message: "Messages retrieved successfully",
    data: messages,
  });
};
