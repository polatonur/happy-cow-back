export {};

const express = require("express");
import { Request, Response } from "express";
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
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my happy cow app" });
});

// ALL ROUTE
app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Oops!, Page not found");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
