import { Schema, model } from "mongoose";

export type RestaurantType = {
  placeId: number;
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
  nearbyPlacesIds: string[];
  favorite: number;
};

const restaurantSchema = new Schema<RestaurantType>({
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

const Restaurant = model<RestaurantType>("restaurant", restaurantSchema);

module.exports = Restaurant;
