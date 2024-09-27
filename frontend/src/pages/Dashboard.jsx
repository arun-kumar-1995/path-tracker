import React, { useState } from "react";
import "./dashboard.css";
import { post } from "../services/api";

const Dashboard = () => {
  // State to manage which form is visible
  const [activeForm, setActiveForm] = useState("onboard");
  const [shipName, setShipName] = useState("");

  const handleOnboard = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/onboard-ship", { shipName });
      console.log("Ship Created:", response.data);
    } catch (error) {
      console.error("Error creating ship:", error.message);
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
                />
                <button type="submit">Submit</button>
              </form>
            </section>
          )}

          {activeForm === "assign" && (
            <section className="assign-shipment">
              <form action="/create-shipment" method="POST">
                <label htmlFor="shipName">Ship Name</label>
                <input type="text" placeholder="Enter ship name" />

                <div className="form-group">
                  <label htmlFor="startCoordinate">Start Coordinate</label>
                  <input
                    type="text"
                    placeholder="Latitude"
                    required
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    placeholder="Longitude"
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endCoordinate">End Coordinate</label>
                  <input
                    type="text"
                    placeholder="Latitude"
                    required
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    placeholder="Longitude"
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
    </div>
  );
};

export default Dashboard;
