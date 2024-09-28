import Shipment from "../models/shipment.models.js";

export const updateShipmentTrajectory = async (data, callback) => {
  try {
    const { socketData, socket, io } = data;
    console.log("----DATA---", socketData);

    const shipment = await Shipment.findByIdAndUpdate(
      socketData.shipmentId,
      { $addToSet: { "trajectory.coordinates": socketData.currentPosition } },
      { new: true, upsert: true }
    );

    if (shipment) {
      socket.emit("pathUpdated", { message: "Path updated", shipment });
    } else {
      socket.emit("error", "Shipment not found");
    }
  } catch (err) {
    socket.emit("error", err.message);
  }
};
