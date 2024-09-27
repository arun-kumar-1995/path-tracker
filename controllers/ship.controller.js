import Ship from "../models/ship.models.js";
import Shipment from "../models/shipment.models.js";
import ErrorHandler from "../utils/error.handler.js";
import SendResponse from "../utils/responseHandler.js";

export const onBoardShip = async (req, res, next) => {
  try {
    const { shipName } = req.body;
    const ship = await Ship.findOne({ shipName }).lean();
    if (ship)
      return ErrorHandler(res, 409, `Ship ${shipName} already onboarded`);
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

    const ship = await Ship.findById(shipId).lean();
    if (!ship) return ErrorHandler(res, 400, "Ship not found");

    const shipment = await Shipment.create({
      shipId: ship._id,
      "startCoordinate.coordinates": startCoordinate,
      "endCoordinate.coordinates": endCoordinate,
      shipmentStatus,
    });

    await Ship.findByIdAndUpdate(
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

export const getAllShips = async (req, res, next) => {
  try {
    const ships = await Ship.find({})
      .select("-shipments")
      .sort({ _id: -1 })
      .lean();
    return SendResponse(res, 200, "Here is list of all ships", { ships });
  } catch (err) {
    next(err);
  }
};

export const updateShipmentStatus = async (req, res, next) => {
  try {
    const { shipmentId, shipmentStatus, shipmentCompletedDate } = req.body;

    if (!shipmentStatus) {
      return ErrorHandler(res, 400, "Select shipment status");
    }

    // Update the shipment status and completion date
    const shipment = await Shipment.findByIdAndUpdate(
      shipmentId,
      {
        shipmentStatus,
        shipmentCompletedDate,
      },
      { new: true, upsert: true }
    );

    if (!shipment) {
      return ErrorHandler(res, 404, "Shipment not found");
    }
    return SendResponse(req, 200, "Shipment updated successfully");
  } catch (err) {
    next(err);
  }
};
export const getShipmentDetails = async () => {};
