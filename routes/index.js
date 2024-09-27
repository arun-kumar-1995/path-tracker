import express from "express";
import {
  createShipment,
  onBoardShip,
  getShipmentDetails,
} from "../controllers/ship.controller.js";
const router = express.Router();

// define routes
router.route("/onboard-ship").post(onBoardShip);
router.route("/create-shipment").post(createShipment);
router.route("/get-ship/:shipId").get(getShipmentDetails);

export default router;
