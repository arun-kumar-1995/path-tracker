import React, { useState, useEffect } from "react";
import "./track.css";
import Map from "../components/Map";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast, Toaster } from "react-hot-toast";
import Location from "../components/Location";

const Track = () => {
  const { shipmentid } = useParams();
  const [shipmentData, setShipmentData] = useState(null);
  const [isTransit, setIsTransit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchShipmentData = async () => {
      try {
        const response = await api.get(`/shipment/${shipmentid}`);
        if (response.status === 200) {
          const data = response.data.data;
          setShipmentData(data);
          console.log("--------", data.shipmentDetails.status);
          if (data?.shipmentDetails?.status.toLowerCase() === "assigned") {
            setIsTransit(false);
          } else {
            setIsTransit(true);
          }
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchShipmentData();
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

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

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
          />
        )}
      </div>
      <Toaster />
      {<Location /> }
    </div>
  );
};

export default Track;
