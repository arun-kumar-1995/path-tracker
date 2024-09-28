import React, { useEffect } from "react";
import useSocket from "../hooks/useSocket";

const Location = ({ shipmentId }) => {
  const { sendMessage } = useSocket();

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
      const socketData = {
        shipmentId: shipmentId,
        currentPosition: [latitude, longitude],
      };
      sendMessage("updatePath", { socketData });
      console.log("---location----", latitude, longitude);
    } catch (err) {
      // Ask the user to enable location services
      alert(err.message || "Unable to get current location");
    }
  };

  useEffect(() => {
    // Send location every 30 seconds
    const intervalId = setInterval(sendLocationUpdate, 30 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [sendMessage]);

  return null;
};

export default Location;
