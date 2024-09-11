import { Router } from "express";
import {
  getAllTours,
  createTours,
  getTour,
  updateTour,
  deleteTour,
} from "../controlers/tourControler.js";

const router = Router();

router.route("/").get(getAllTours).post(createTours);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;
