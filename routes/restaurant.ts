export {};

const express = require("express");
import { Request, Response } from "express";
const axios = require("axios");

const router = express.Router();

// import restaurant model
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Review = require("../models/Review");

// isAthenticated
const isAthenticated = require("../middlewares/isAuthenticated");

// HOMEPAGE 20 BEST RESTAURANT ROUTE
router.get("/restaurants/best", async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({
      thumbnail: { $ne: "https://www.happycow.net/img/no-image.jpg" },
    })
      .sort({ rating: -1 })
      .limit(20);
    res.status(200).send(restaurants);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// restaurant details route
router.get("/restaurant/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const restaurant = await Restaurant.findById(id);
    const nearByRestaurantsIds: Array<number> = restaurant.nearbyPlacesIds;
    const reviews = await Review.find({ restaurantId: id });

    const nearByRestaurants = await Restaurant.find({
      thumbnail: { $ne: "https://www.happycow.net/img/no-image.jpg" },
      placeId: { $in: nearByRestaurantsIds },
    }).select("name address thumbnail type rating");
    // console.log(nearByRestaurants);

    res.status(200).json({
      result: restaurant,
      near: nearByRestaurants,
      reviews: reviews,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post(
  "/restaurant/review",
  isAthenticated,
  async (req: Request, res: Response) => {
    try {
      const {
        title,
        body,
        userId,
        restaurantId,
        rating,
        pros,
        cons,
        userName,
      } = req.body;
      console.log(req.body);
      const newReview = new Review({
        title: title,
        body: body,
        owner: userId,
        ownerName: userName,
        rating: rating,
        restaurantId: restaurantId,
        pros: pros,
        cons: cons,
      });
      await newReview.save();
      res.status(200).json({
        message: "review saved",
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.messsage,
      });
    }
  }
);
router.get("/rating", async (req: Request, res: Response) => {
  try {
    interface resto {
      save: () => void;
      favorite: number;
    }
    const restos: Array<resto> = await Restaurant.find({});
    restos.forEach(async (elem) => {
      elem.favorite = Math.floor(Math.random() * 10);
      await elem.save();
    });
    res.send("ok");
  } catch (error: any) {
    res.send(error.message);
  }
});

module.exports = router;
