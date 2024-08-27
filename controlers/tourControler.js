import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";
import Tour from "../models/tourModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tours = JSON.parse(
  readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

export function checkId(req, res, next, val) {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
}

export function checkBody(req, res, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price in request body",
    });
  }
  next();
}

export function getAllTours(req, res) {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
}

export function getTour(req, res) {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
}

export async function createTours(req, res) {
  try {
    const { name, price, rating } = req.body;

    const newTour = new Tour({
      name,
      price,
      rating,
    });

    const doc = await newTour.save();

    res.status(201).json({
      status: "success",
      data: {
        tour: doc,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      res.status(400).json({
        status: "fail",
        message: errors.join(", "),
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "An internal server error occurred.",
      });
    }
  }
}

export function updateTour(req, res) {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour ...>",
    },
  });
}

export function deleteTour(req, res) {
  res.status(204).json({
    status: "success",
    data: null,
  });
}
