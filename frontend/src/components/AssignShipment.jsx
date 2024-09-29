import React, { useState, useEffect } from "react";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";

const AssignShipment = () => {
  const [ships, setShips] = useState([]);
  const [selectedShipId, setSelectedShipId] = useState("");
  const [startLatitude, setStartLatitude] = useState("");
  const [startLongitude, setStartLongitude] = useState("");
  const [endLatitude, setEndLatitude] = useState("");
  const [endLongitude, setEndLongitude] = useState("");
  const [loading, setIsLoading] = useState(false);

  const handleShipAssignment = async (e) => {
    e.preventDefault();
    try {
      const shipmentData = {
        shipId: selectedShipId,
        startCoordinate: [
          parseFloat(startLatitude),
          parseFloat(startLongitude),
        ],
        endCoordinate: [parseFloat(endLatitude), parseFloat(endLongitude)],
      };
      const response = await api.post("/create-shipment", shipmentData);
      toast.success(response.data.message);
      // Clear form fields upon success
      setSelectedShipId("");
      setStartLatitude("");
      setStartLongitude("");
      setEndLatitude("");
      setEndLongitude("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Fetch ships once the component mounts
  useEffect(() => {
    const fetchShips = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/getShips");
        if (response.status === 200) {
          setShips(response.data.data || []);
        } else {
          toast.error("Error fetching ships");
        }
      } catch (error) {
        console.error("Error fetching ships:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShips();
  }, []);

  if (loading) return <div>loading....</div>;
  console.log("ships------", ships);
  console.log("ships------", ships.ships);
  return (
    <section className="assign-shipment d-section">
      <div className="section-wrapper">
        <h2 className="form-title">Assign Shipment</h2>
        <form onSubmit={handleShipAssignment}>
          <label htmlFor="shipSelect">Select Ship</label>
          <select
            id="shipSelect"
            value={selectedShipId}
            onChange={(e) => setSelectedShipId(e.target.value)}
            required
          >
            <option value="">Select a ship</option>
            {ships && ships?.ships?.length > 0 ? (
              ships?.ships.map((ship) => (
                <option key={ship._id} value={ship._id}>
                  {ship.shipName}
                </option>
              ))
            ) : (
              <option disabled>No ships available</option>
            )}
          </select>

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
      </div>
      <Toaster />
    </section>
  );
};

export default AssignShipment;
