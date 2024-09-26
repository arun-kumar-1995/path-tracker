import express from "express";
import { createShipment, onBoardShip } from "../controllers/ship.controller";
const router = express.Router();

// define routes
router.route("/onboard-ship").post(onBoardShip);
router.route("/create-shipment").post(createShipment);

export default router;
