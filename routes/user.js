"use strict";
// export {};
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
const router = express.Router();
const sha256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid = require("uid2");
// import models
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
// isAthenticated
const isAthenticated = require("../middlewares/isAuthenticated");
router.post("/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        console.log(req.body);
        const token = uid(16);
        const salt = uid(16);
        const hash = sha256(password + salt).toString(encBase64);
        const user = yield User.findOne({ email: email });
        console.log("user==>", user);
        if (!user) {
            const user = new User({
                username: username,
                hash: hash,
                salt: salt,
                token: token,
                email: email,
            });
            const savedUSer = yield user.save();
            res.status(200).json({
                id: savedUSer._id,
                username: savedUSer.username,
                email: savedUSer.email,
                token: savedUSer.token,
            });
        }
        else {
            res.status(409).json({
                message: "User already exists",
            });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User.findOne({ email: email });
        if (user) {
            const hashToCompare = sha256(password + user.salt).toString(encBase64);
            if (hashToCompare === user.hash) {
                res.status(200).json({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    token: user.token,
                    favorites: user.favorites,
                });
            }
            else {
                res.status(401).json({
                    message: "Password or username error",
                });
            }
        }
        else {
            res.status(401).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post("/user/favorites", isAthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, restaurantId } = req.body;
        const user = User.findById(userId);
        const isExist = yield User.findOne({
            userId: userId,
            favorites: { $eq: restaurantId },
        });
        //   console.log("isexist==>", isExist);
        if (isExist) {
            const updatedUser = yield User.findByIdAndUpdate(userId, {
                $pull: { favorites: restaurantId },
            });
            res.status(200).json({
                message: updatedUser.favorites,
            });
        }
        else {
            const updatedUser = yield User.findByIdAndUpdate(userId, {
                $push: { favorites: restaurantId },
            });
            res.status(200).json({
                message: updatedUser.favorites,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}));
module.exports = router;
