import { Response, Request, NextFunction, RequestHandler } from "express";
import { nextTick } from "process";
const User = require("../models/User");

const isAthenticated: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Athenticating...");

  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      console.log("token==>", token);

      const user = await User.findOne({ token });
      if (user) {
        return next();
      } else {
        res.json(401).json({
          message: "Unauthorized",
        });
      }
    } else {
      res.json(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error: any) {
    res.status(200).json({
      message: error.message,
    });
  }
};

module.exports = isAthenticated;
