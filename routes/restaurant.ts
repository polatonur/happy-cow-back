export {};

const express = require("express");
import { Request, Response } from "express";
const axios = require("axios");

const router = express.Router();

// import restaurant model
const Restaurant = require("../models/Restaurant");

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

module.exports = router;
