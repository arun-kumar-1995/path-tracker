import React, { useState } from "react";
import "./dashboard.css";
import api from "../services/api";
import { toast, Toaster } from "react-hot-toast";

const Dashboard = () => {
  // State to manage which form is visible
  const [activeForm, setActiveForm] = useState("onboard");
  const [shipName, setShipName] = useState("");
  const [startLatitude, setStartLatitude] = useState("");
  const [startLongitude, setStartLongitude] = useState("");
  const [endLatitude, setEndLatitude] = useState("");
  const [endLongitude, setEndLongitude] = useState("");

  const handleOnboard = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/onboard-ship", { shipName });
      toast.success(response.data.message);
      setShipName("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleShipAssignment = async (e) => {
    try {
      e.preventDefault();

      const shipmentData = {
        shipId: "66f6a89899abb53291206b8a",
        startCoordinate: [
          parseFloat(startLatitude),
          parseFloat(startLongitude),
        ],
        endCoordinate: [parseFloat(endLatitude), parseFloat(endLongitude)],
      };
      const response = await api.post("/create-shipment", { ...shipmentData });
      console.log(response);
      toast.success(response.data.message);
      // Clear form fields upon success
      setShipName("");
      setStartLatitude("");
      setStartLongitude("");
      setEndLatitude("");
      setEndLongitude("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <main>
        <div className="multi-form">
          <div className="selector-chain">
            {/* Buttons to toggle forms */}
            <button
              type="button"
              className={`option ${
                activeForm === "onboard" ? "active-option" : ""
              }`}
              onClick={() => setActiveForm("onboard")}
            >
              OnBoard ship
            </button>
            <button
              type="button"
              className={`option ${
                activeForm === "assign" ? "active-option" : ""
              }`}
              onClick={() => setActiveForm("assign")}
            >
              Assign Shipment
            </button>
          </div>

          {/* Conditionally rendered forms */}
          {activeForm === "onboard" && (
            <section className="onboard-ship">
              <label htmlFor="shipName">Enter ship name</label>
              <form onSubmit={handleOnboard}>
                <input
                  type="text"
                  placeholder="Enter ship name"
                  required
                  autoComplete="off"
                  name="shipName"
                  onChange={(e) => setShipName(e.target.value)}
                  value={shipName}
                />
                <button type="submit">Submit</button>
              </form>
            </section>
          )}

          {activeForm === "assign" && (
            <section className="assign-shipment">
              <form onSubmit={handleShipAssignment} method="POST">
                <label htmlFor="shipName">Ship Name</label>
                <input
                  type="text"
                  placeholder="Enter ship name"
                  value={shipName}
                  onChange={(e) => setShipName(e.target.value)}
                  required
                  name="shipName"
                />

                <div className="form-group">
                  <label htmlFor="startCoordinate">Start Coordinate</label>
                  <input
                    type="text"
                    placeholder="Latitude"
                    value={startLatitude}
                    onChange={(e) => setStartLatitude(e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    placeholder="Longitude"
                    value={startLongitude}
                    onChange={(e) => setStartLongitude(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endCoordinate">End Coordinate</label>
                  <input
                    type="text"
                    placeholder="Latitude"
                    value={endLatitude}
                    onChange={(e) => setEndLatitude(e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    placeholder="Longitude"
                    value={endLongitude}
                    onChange={(e) => setEndLongitude(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </section>
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Dashboard;
