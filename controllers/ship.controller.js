import Ship from "../models/ship.models.js";
import Shipment from "../models/shipment.models.js";
import ErrorHandler from "../utils/error.handler.js";
import SendResponse from "../utils/responseHandler.js";

export const onBoardShip = async (req, res, next) => {
  try {
    const { shipName } = req.body;
    console.log(shipName);
    const ship = await Ship.findOne({ shipName }).lean();
    if (ship)
      return ErrorHandler(res, 409, `Ship {shipName} already onboarded`);
    // else create ship

    await Ship.create(req.body);
    // return response
    return SendResponse(res, 201, "Ship onboarded successfully", { ship });
  } catch (err) {
    next(err);
  }
};

export const createShipment = async (req, res, next) => {
  try {
    const {
      startCoordinate,
      endCoordinate,
      shipmentStatus = "assigned",
      shipId,
    } = req.body;

    if (!startCoordinate || !endCoordinate)
      return ErrorHandler(res, 400, "Provide start and end coordinates");

    const ship = await Ship.findById(shipId).lena();
    if (!ship) return ErrorHandler(res, 400, "Ship not found");

    const shipment = await Shipment.create({
      shipId: ship._id,
      "startCoordinate.coordinates": startCoordinate,
      "endCoordinate.coordinates": endCoordinate,
      shipmentStatus,
    });

    await Ship.findById(
      shipId,
      { $addToSet: { shipments: shipment._id } },
      { new: true, upsert: true }
    );

    // return response
    return SendResponse(res, 201, `Shipment assigned for ${ship.shipName}`);
  } catch (err) {
    next(err);
  }
};

export const getShipmentDetails = async () => {

};
