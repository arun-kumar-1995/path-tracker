import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

const OnboardShip = () => {
  const [shipName, setShipName] = useState("");

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

  return (
    <section className="onboard-ship d-section">
      <div className="section-wrapper">
        <h2 className="form-title">Onboard Ship</h2>
        <form onSubmit={handleOnboard}>
          <label htmlFor="shipName">Enter ship name</label>
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
      </div>
    </section>
  );
};

export default OnboardShip;
