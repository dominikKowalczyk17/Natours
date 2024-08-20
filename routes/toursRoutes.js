import { Router } from "express";
import {
  getAllTours,
  createTours,
  getTour,
  updateTour,
  deleteTour,
  checkId,
} from "../controlers/tourControler.js";

const router = Router();

router.param("id", checkId);

router.route("/").get(getAllTours).post(checkId, createTours);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;
