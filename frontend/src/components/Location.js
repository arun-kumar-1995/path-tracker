import React, { useEffect } from "react";
import useSocket from "../hooks/useSocket";
const Location = () => {
  const { sendMessage } = useSocket();

  // get current location
  const getCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        const currentCords = await navigator.geolocation.getCurrentPosition();
        console.log(currentCords);
      }
    } catch (er) {}
  };

  useEffect(() => {
    const sendLocationUpdate = async () => {
      try {
        await getCurrentLocation();
      } catch (err) {
        // ask user to open location
      }
    };

    // Send location every 30 seconds
    const intervalId = setInterval(sendLocationUpdate, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [sendMessage]);
  return null;
};

export default Location;
