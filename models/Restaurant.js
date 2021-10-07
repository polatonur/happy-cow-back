"use strict";
const { Schema, model } = require("mongoose");
const restaurantSchema = Schema({
    placeId: String,
    name: String,
    address: String,
    location: {
        lng: Number,
        lat: Number,
    },
    phone: String,
    thumbnail: String,
    type: String,
    category: Number,
    rating: Number,
    vegan: Number,
    vegOnly: Number,
    link: String,
    description: String,
    pictures: Array,
    price: String,
    website: String,
    facebook: String,
    nearbyPlaces: Array,
});
const Restaurant = model("restaurant", restaurantSchema);
module.exports = Restaurant;
