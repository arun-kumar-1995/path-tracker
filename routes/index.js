import express from "express";
import { createShipment, onBoardShip , getShipDetails } from "../controllers/ship.controller";
const router = express.Router();

// define routes
router.route("/onboard-ship").post(onBoardShip);
router.route("/create-shipment").post(createShipment);
router.route("/get-ship/:shipId").get(getShipDetails);

export default router;
