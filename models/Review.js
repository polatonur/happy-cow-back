"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now() },
    owner: String,
    rating: String,
    restaurantId: String,
});
const Review = (0, mongoose_1.model)("Review", reviewSchema);
module.exports = Review;
