import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

const Location = ({ shipmentId, onTrajectoryUpdate }) => {
  const { sendMessage } = useSocket();
  const [trajectory, setTrajectory] = useState([]);

  // Get current location
  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const sendLocationUpdate = async () => {
    try {
      const position = await getCurrentLocation();
      const { latitude, longitude } = position.coords;
      const updatedTrajectory = updateTrajectory(latitude, longitude);

      if (updatedTrajectory) {
        const socketData = {
          shipmentId: shipmentId,
          trajectory: updatedTrajectory,
        };

        onTrajectoryUpdate(updatedTrajectory);
        sendMessage("updatePath", { socketData });
        console.log("---location----", latitude, longitude);
        console.log("---updated trajectory----", updatedTrajectory);
      }
    } catch (err) {
      alert(err.message || "Unable to get current location");
    }
  };

  const updateTrajectory = (latitude, longitude) => {
    const lastPosition = trajectory[trajectory.length - 1];

    // Check if lastPosition is defined
    if (lastPosition && lastPosition.length >= 2) {
      const isSamePosition = (lastPosition, currentPosition) => {
        return (
          lastPosition[0] === currentPosition[0] &&
          lastPosition[1] === currentPosition[1]
        );
      };

      if (!isSamePosition(lastPosition, [latitude, longitude])) {
        const newTrajectory = [...trajectory, [latitude, longitude]];
        setTrajectory(newTrajectory);
        return newTrajectory;
      }
    } else {
      const newTrajectory = [[latitude, longitude]];
      setTrajectory(newTrajectory);
      return newTrajectory;
    }

    return null;
  };

  useEffect(() => {
    const intervalId = setInterval(sendLocationUpdate, 10 * 1000); // Fetch location every 30 seconds
    return () => clearInterval(intervalId);
  }, [sendMessage]);

  return null;
};

export default Location;
