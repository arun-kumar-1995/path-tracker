import Shipment from "../models/shipment.models.js";

export const updateShipmentTrajectory = async (data, callback) => {
  const { socketData, socket, io } = data;
  try {
    console.log("----DATA---", socketData.trajectory);

    const shipment = await Shipment.findByIdAndUpdate(
      socketData.shipmentId,
      {
        $addToSet: {
          "trajectory.coordinates": {
            $each: socketData.trajectory,
          },
        },
      },
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
