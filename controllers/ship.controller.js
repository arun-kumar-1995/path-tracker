import Ship from "../models/ship.models";
import ErrorHandler from "../utils/error.handler";
import SendResponse from "../utils/responseHandler";

export const onBoardShip = async (req, res, next) => {
  try {
    const { shipName } = req.body;
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
