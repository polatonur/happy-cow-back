"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: String,
    hash: String,
    salt: String,
    token: String,
    email: String,
    favorites: { type: Array, defaul: [] },
});
const User = (0, mongoose_1.model)("User", UserSchema);
module.exports = User;
