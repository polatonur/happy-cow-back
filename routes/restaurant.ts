export {};

const express = require("express");
import { Request, Response } from "express";
const axios = require("axios");

const router = express.Router();

// all restaurants route
router.get("/restautants/all", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
    );
    res.status(200).send(response.data);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
