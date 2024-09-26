import express from 'express';
const router = express.Router();

// define routes
router.route("/onboard-ship").post(onBoardShip);


export default router;