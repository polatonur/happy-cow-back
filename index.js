"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv").config();
// call express
const app = express();
// app.use(formidableMiddleware());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// import routes
const restaurantRoutes = require("./routes/restaurant");
app.use(restaurantRoutes);
const userRoutes = require("./routes/user");
app.use(userRoutes);
// MONGOOSE CONNECT
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// HOME ROUTE
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to my happ cow app" });
});
// ALL ROUTE
app.all("*", (req, res) => {
    res.status(404).send("Oops!, Page not found");
});
const Port = 5000;
app.listen(Port, () => console.log(`Server is running on port ${Port}`));
