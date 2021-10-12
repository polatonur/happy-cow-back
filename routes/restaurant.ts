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
router.get("/restaurants/search", async (req: Request, res: Response) => {
  console.log("search");
  console.log("req.query==>", req.query);

  try {
    type Query = {
      name?: any;
      type?: any;
      thumbnail: any;
    };
    let searchQuery: Query = {
      thumbnail: { $ne: "https://www.happycow.net/img/no-image.jpg" },
    };
    if (req.query.title) {
      let title = String(req.query.title);
      searchQuery.name = new RegExp(title, "gi");
    }
    if (req.query.type && req.query.type !== "All") {
      searchQuery.type = req.query.type;
    }
    console.log("searchQuery==>", searchQuery);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const restos = await Restaurant.find(searchQuery)
      .limit(limit)
      .skip(limit * (page - 1))
      .select("name address type description rating thumbnail");

    const count = await Restaurant.countDocuments(searchQuery);

    res.status(200).json({
      results: restos,
      count: count,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
