import express from "express";
import {
  createShipment,
  onBoardShip,
  getAllShips,
  getShipmentDetails,
  updateShipmentStatus,
  getShipments,
} from "../controllers/ship.controller.js";
const router = express.Router();

// define routes
router.route("/onboard-ship").post(onBoardShip);
router.route("/create-shipment").post(createShipment);
router.route("/getShips").get(getAllShips);
router.route("/shipment/:id").get(getShipmentDetails);
router.route("/update-shipment").put(updateShipmentStatus);
router.route("/shipments").get(getShipments);

export default router;
