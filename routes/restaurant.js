"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const axios = require("axios");
const router = express.Router();
// import restaurant model
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Review = require("../models/Review");
// isAthenticated
const isAthenticated = require("../middlewares/isAuthenticated");
// HOMEPAGE 20 BEST RESTAURANT ROUTE
router.get("/restaurants/best", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant.find({
            thumbnail: { $ne: "https://www.happycow.net/img/no-image.jpg" },
        })
            .sort({ rating: -1 })
            .limit(20);
        res.status(200).send(restaurants);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}));
// restaurant details route
router.get("/restaurant/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const restaurant = yield Restaurant.findById(id);
        const nearByRestaurantsIds = restaurant.nearbyPlacesIds;
        const reviews = yield Review.find({ restaurantId: id });
        const nearByRestaurants = yield Restaurant.find({
            thumbnail: { $ne: "https://www.happycow.net/img/no-image.jpg" },
            placeId: { $in: nearByRestaurantsIds },
        }).select("name address thumbnail type rating");
        // console.log(nearByRestaurants);
        res.status(200).json({
            result: restaurant,
            near: nearByRestaurants,
            reviews: reviews,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}));
router.post("/restaurant/review", isAthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, userId, restaurantId, rating, pros, cons } = req.body;
        console.log(req.body);
        const newReview = new Review({
            title: title,
            body: body,
            owner: userId,
            rating: rating,
            restaurantId: restaurantId,
            pros: pros,
            cons: cons,
        });
        yield newReview.save();
        res.status(200).json({
            message: "review saved",
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.messsage,
        });
    }
}));
router.get("/rating", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restos = yield Restaurant.find({});
        restos.forEach((elem) => __awaiter(void 0, void 0, void 0, function* () {
            elem.favorite = Math.floor(Math.random() * 10);
            yield elem.save();
        }));
        res.send("ok");
    }
    catch (error) {
        res.send(error.message);
    }
}));
module.exports = router;
