"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    placeId: Number,
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
    nearbyPlacesIds: Array,
    favorite: Number,
});
const Restaurant = (0, mongoose_1.model)("restaurant", restaurantSchema);
module.exports = Restaurant;
