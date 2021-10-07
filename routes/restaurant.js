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
module.exports = router;
