// export {};

const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
const sha256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid = require("uid2");

// import models
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

// isAthenticated
const isAthenticated = require("../middlewares/isAuthenticated");

router.post("/user/signup", async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    console.log(req.body);

    const token = uid(16);
    const salt = uid(16);
    const hash = sha256(password + salt).toString(encBase64);
    const user = await User.findOne({ email: email });
    console.log("user==>", user);

    if (!user) {
      const user = new User({
        username: username,
        hash: hash,
        salt: salt,
        token: token,
        email: email,
      });
      const savedUSer = await user.save();
      res.status(200).json({
        id: savedUSer._id,
        username: savedUSer.username,
        email: savedUSer.email,
        token: savedUSer.token,
      });
    } else {
      res.status(409).json({
        message: "User already exists",
      });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const hashToCompare = sha256(password + user.salt).toString(encBase64);
      if (hashToCompare === user.hash) {
        res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          token: user.token,
        });
      } else {
        res.status(401).json({
          message: "Password or username error",
        });
      }
    } else {
      res.status(401).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
router.post(
  "/user/favorites",
  isAthenticated,
  async (req: Request, res: Response) => {
    try {
      const { userId, restaurantId } = req.body;
      const user = User.findById(userId);
      const isExist = await User.findOne({
        userId: userId,
        favorites: { $eq: restaurantId },
      });
      //   console.log("isexist==>", isExist);
      let action = "inc";
      if (isExist) {
        action = "dec";
        await User.findByIdAndUpdate(userId, {
          $pull: { favorites: restaurantId },
        });

        const resto = await Restaurant.findByIdAndUpdate(
          restaurantId,
          {
            $inc: { favorite: -1 },
          },
          {
            new: true,
          }
        );
        console.log("count==>", resto);

        const updatedUser = await User.findById(userId);
        res.status(200).json({
          message: updatedUser.favorites,
          count: resto.favorite,
        });
      } else {
        await User.findByIdAndUpdate(userId, {
          $push: { favorites: restaurantId },
        });
        const resto = await Restaurant.findByIdAndUpdate(
          restaurantId,
          {
            $inc: { favorite: 1 },
          },
          {
            new: true,
          }
        );
        console.log("count==>", resto.value);

        const updatedUser = await User.findById(userId);
        res.status(200).json({
          message: updatedUser.favorites,
          count: resto.favorite,
        });
      }
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);
router.get(
  "/user/favlist",
  isAthenticated,
  async (req: Request, res: Response) => {
    console.log("get fav  list");

    try {
      const { id } = req.query;
      const user = await User.findById(id);

      res.status(200).json({
        message: user.favorites,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
