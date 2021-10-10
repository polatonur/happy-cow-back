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
const User = require("../models/User");
const isAthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Athenticating...");
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace("Bearer ", "");
            console.log("token==>", token);
            const user = yield User.findOne({ token });
            if (user) {
                return next();
            }
            else {
                res.json(401).json({
                    message: "Unauthorized",
                });
            }
        }
        else {
            res.json(401).json({
                message: "Unauthorized",
            });
        }
    }
    catch (error) {
        res.status(200).json({
            message: error.message,
        });
    }
});
module.exports = isAthenticated;
