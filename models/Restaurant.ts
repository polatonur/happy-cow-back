import { Schema, model } from "mongoose";

export type RestaurantType = {
  placeId: string;
  name: string;
  address: string;
  location: {
    lng: number;
    lat: number;
  };
  phone: string;
  thumbnail: string;
  type: string;
  category: number;
  rating: number;
  vegan: number;
  vegOnly: number;
  link: string;
  description: string;
  pictures: string[];
  price: string;
  website: string;
  facebook: string;
  nearbyPlaces: string[];
};

const restaurantSchema = new Schema<RestaurantType>({
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

const Restaurant = model<RestaurantType>("restaurant", restaurantSchema);

module.exports = Restaurant;
