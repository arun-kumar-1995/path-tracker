import React, { useState, useEffect } from "react";
import "./track.css";
import Map from "../components/Map";
import { useParams } from "react-router-dom";
import api from "../services/api";
const Track = () => {
  const { shipmentid } = useParams();
  const [shipmentData, setShipmentData] = useState();

  const [start, setStart] = useState(false);

  const handleStartShipment = () => {
    setStart(!start);
  };

  useEffect(() => {
    const fetchShipmentData = async () => {
      try {
        const response = await api.get(`/shipment/${shipmentid}`);
        setShipmentData(response.data.data);
        console.log(response.data.data);
      } catch (err) {}
    };

    fetchShipmentData();
  }, [shipmentid]);

  console.log(shipmentData);

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
        <button
          className="page-control-btn start-shipment"
          onClick={handleStartShipment}
        >
          {start ? "Stop" : "Start"}
        </button>
      </div>
      <div className={`map-container ${start ? "blurred" : ""}`}>
        <Map />
      </div>
    </div>
  );
};

export default Track;
