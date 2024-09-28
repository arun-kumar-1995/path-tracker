import Events from "../events/eventName.js";
import socketHandler from "./socket.handler.js";
console.log(Events.UPDATE_PATH);

import { updateShipmentTrajectory } from "../controllers/socket.controller.js";

const socketManager = (io, socket) => {
  socket.on(
    Events.UPDATE_PATH,
    socketHandler(updateShipmentTrajectory, io, socket)
  );
};

export default socketManager;
