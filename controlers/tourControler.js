import { fileURLToPath } from "url";
import Tour from "../models/tourModel.js";

const __filename = fileURLToPath(import.meta.url);

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
    const doc = await Tour.create(req.body);

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
