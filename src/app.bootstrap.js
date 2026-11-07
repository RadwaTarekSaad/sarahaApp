import { ALLOW_ORIGINS, PORT } from "../config/config.service.js";
import express from "express";
import connectionDb from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
import cors from "cors";
import { connectionRedis } from "./DB/connection.redis.js";
import messageRouter from "./modules/message/message.controller.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();
const port = PORT;
const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,
  message: {
    success: false,
    message: "Game Over",
  },
  standardHeaders: true,
  legacyHeaders: false,
  // skip:(req)=>{
  //   req.path=="/messages"
  // }
  //  skipSuccessfulRequests:true,
  //  statusCode:400
  handler: (req, res) => {
    res.status(401).json({
      success: false,
      message: "Game Over",
    });
  },
});

const bootstrap = async () => {
  app.use(
    cors({
      origin: function (origin, callback) {
        if ([...ALLOW_ORIGINS, undefined].includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by origin"));
        }
      },
      // db.loadOrigins is an example call to load
      // a list of origins from a backing database
    }),
  );
  app.use(express.json());
  app.use(limiter);
  app.use(helmet());

  await connectionDb();
  await connectionRedis();

  app.get("/", (req, res, next) => {
    res.status(200).json({ message: "welcome on sarahaApp.....😊" });
  });

  app.use("/users", userRouter);
  app.use("/messages", messageRouter);

  app.use("{/*demo}", (req, res, next) => {
    throw new Error(
      `URL ${req.originalUrl} AND METHOD ${req.method} Not FOUND `,
      { cause: 404 },
    );
  });

  app.use((err, req, res, next) => {
    res
      .status(err.cause || 500)
      .json({ message: err.message, stack: err.stack });
  });

  app.listen(port, () => {
    console.log(`sarahaApp is running on port ${port}`);
  });
};
export default bootstrap;
