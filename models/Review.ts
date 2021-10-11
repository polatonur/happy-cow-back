import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now() },
  owner: String,
  rating: String,
  restaurantId: String,
  pros: Array,
  cons: Array,
  ownerName: String,
});

const Review = model("Review", reviewSchema);

module.exports = Review;
