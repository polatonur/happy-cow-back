export {};

const express = require("express");
import { Request, Response } from "express";
const formidableMiddleware = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidableMiddleware());
app.use(cors());

const restaurantRoutes = require("./routes/restaurant");
app.use(restaurantRoutes);

// home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my happ cow app" });
});

// all route
app.all("*", (req: Request, res: Response) => {
  res.status(404).send("Oops!, Page not found");
});

const Port = 5000;
app.listen(Port, () => console.log(`Server is running on port ${Port}`));