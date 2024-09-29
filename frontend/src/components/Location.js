import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

const Location = ({ shipmentId, onTrajectoryUpdate }) => {
  const [trajectory, setTrajectory] = useState([]);

  // Get current location
  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
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
        onTrajectoryUpdate(updatedTrajectory);
      }

    } catch (err) {
      alert(err.message || "Unable to get current location");
    }
  };

  // Update trajectory array if current location is not the same
  const updateTrajectory = (latitude, longitude) => {
    const lastPosition = trajectory[trajectory.length - 1];

    // Ensure the current location is unique
    if (
      !lastPosition ||
      lastPosition[0] !== latitude ||
      lastPosition[1] !== longitude
    ) {
      const newTrajectory = [...trajectory, [latitude, longitude]];
      setTrajectory(newTrajectory);
      return newTrajectory;
    }

    return null;
  };

  console.log("TRAJECTORY-----", trajectory);

  useEffect(() => {
    // Update location every 10 seconds
    const intervalId = setInterval(sendLocationUpdate, 30 * 1000);
    return () => clearInterval(intervalId);
  }, [trajectory]);

  return null;
};

export default Location;
