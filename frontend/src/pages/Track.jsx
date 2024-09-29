import React, { useState, useEffect, useRef } from "react";
import "./track.css";
import Map from "../components/Map";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast, Toaster } from "react-hot-toast";
import Location from "../components/Location";
import useSocket from "../hooks/useSocket";

const Track = () => {
  const { shipmentid } = useParams();
  const [shipmentData, setShipmentData] = useState(null);
  const [isTransit, setIsTransit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trajectory, setTrajectory] = useState([]);
  const { sendMessage } = useSocket();
  const trajectoryRef = useRef(trajectory);

  // Update the ref whenever the trajectory state changes
  useEffect(() => {
    trajectoryRef.current = trajectory;
  }, [trajectory]);

  // Function to merge trajectories and ensure uniqueness
  const mergeUniqueTrajectory = (newTrajectory) => {
    setTrajectory((prevTrajectory) => {
      const merged = [...prevTrajectory];

      newTrajectory.forEach((point) => {
        if (
          !merged.some(
            (existingPoint) =>
              existingPoint[0] === point[0] && existingPoint[1] === point[1]
          )
        ) {
          merged.push(point);
        }
      });

      return merged;
    });
  };

  console.log("'TRACK--- PATH", trajectory);
  useEffect(() => {
    setLoading(true);

    const fetchShipmentData = async () => {
      try {
        const response = await api.get(`/shipment/${shipmentid}`);
        if (response.status === 200) {
          const data = response.data.data;
          setShipmentData(data);
          if (data?.shipmentDetails?.status.toLowerCase() === "assigned") {
            setIsTransit(false);
          } else {
            setIsTransit(true);
          }

          // Merge trajectory from API with existing trajectory
          if (data?.shipmentDetails?.path?.length > 0) {
            mergeUniqueTrajectory(data.shipmentDetails.path);
          }
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShipmentData();

    const intervalId = setInterval(handleSocket, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [shipmentid]);

  const handleStartShipment = async () => {
    try {
      const response = await api.post("/update-shipment", {
        shipmentId: shipmentid,
        shipmentStatus: "in-transit",
      });
      if (response.status === 200) {
        setIsTransit(true);
        toast.success("Shipment started");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  // Callback function to get the trajectory from Location component
  const handleTrajectoryUpdate = (newPosition) => {
    mergeUniqueTrajectory(newPosition);
  };

  function handleSocket() {
    const socketData = {
      shipmentId: shipmentid,
      trajectory: trajectoryRef.current,
    };
    console.log("socket data--------", socketData);
    sendMessage("updatePath", { socketData });
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(trajectory);

  return (
    <div className="tracking-page">
      <div className="tracking-page-controls">
        <button className="page-control-btn btn-download" title="download">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6239 10.3593L17.8361 11.5714L11.7752 17.6323L5.71429 11.5714L6.92647 10.3593L10.9181 14.3508V3H12.6323V14.3508L16.6239 10.3593Z"
              fill="currentColor"
            ></path>
            <path
              d="M19.4286 19.2857H4V21H19.4286V19.2857Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        {!isTransit && (
          <button
            className="page-control-btn start-shipment"
            onClick={handleStartShipment}
          >
            Start
          </button>
        )}
      </div>
      <div className={`map-container ${!isTransit ? "blurred" : ""}`}>
        {shipmentData && (
          <Map
            startPosition={shipmentData?.shipmentDetails.startCoordinates}
            endPosition={shipmentData?.shipmentDetails.endCoordinates}
            trajectory={trajectory}
          />
        )}
      </div>
      <Toaster />
      {isTransit && (
        <Location
          shipmentId={shipmentid}
          onTrajectoryUpdate={handleTrajectoryUpdate}
        />
      )}
    </div>
  );
};

export default Track;
