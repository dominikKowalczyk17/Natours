import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

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

export function createTours(req, res) {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Error writing to file",
        });
      }
      res.status(201).json({
        status: "succes",
        data: {
          tour: newTour,
        },
      });
    },
  );
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
