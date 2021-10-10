import { Schema, model } from "mongoose";

export type UserType = {
  username: string;
  hash: string;
  salt: string;
  token: string;
  email: string;
  favorites: string[];
};

const UserSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
  token: String,
  email: String,
  favorites: { type: Array, defaul: [] },
});

const User = model("User", UserSchema);

module.exports = User;
