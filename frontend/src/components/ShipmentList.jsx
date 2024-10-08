import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);
  const [shipmentStatus, setShipmentStatus] = useState("assigned");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/shipments?shipmentStatus=${shipmentStatus}`
        );

        if (response.status === 200) {
          const shipmentData = response.data.data?.shipments || [];
          setShipments(shipmentData);
        } else {
          toast.error("Failed to fetch shipments.");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [shipmentStatus]);

  // Handler for status change
  const handleUpdateShipment = async (shipmentId, newStatus) => {
    try {
      // Make an API call to update the status on the server
      const response = await api.put(`/update-shipment`, {
        shipmentId,
        shipmentStatus: newStatus,
      });
      if (response.status === 200) {
        // Update local state
        setShipments((prevShipments) =>
          prevShipments.map((shipment) =>
            shipment._id === shipmentId
              ? { ...shipment, shipmentStatus: newStatus }
              : shipment
          )
        );
        toast.success("Shipment status updated successfully!");
      } else {
        toast.error("Failed to update shipment status.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log("---shipments", shipments);

  const handleFilterChange = (value) => {
    setShipmentStatus(value);
  };

  if (loading) return <div>...loading</div>;
  return (
    <section className="d-section">
      <div className="section-wrapper">
        <div className="filter-table">
          <select
            value={shipmentStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="in-transit">In Transit</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
            <option value="not-started">Not Started</option>
          </select>
        </div>

        <div className="shipment-table-container">
          <h1>Shipment List</h1>

          <table className="shipment-table">
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Status</th>
                <th>Start Coordinate</th>
                <th>End Coordinate</th>
                <th>Track</th>
              </tr>
            </thead>
            <tbody>
              {shipments && shipments.length > 0 ? (
                shipments.map((shipment) => (
                  <tr key={shipment._id}>
                    <td>{shipment._id}</td>
                    <td>
                      <select
                        value={shipment.shipmentStatus}
                        onChange={(e) =>
                          handleUpdateShipment(shipment._id, e.target.value)
                        }
                      >
                        <option value="in-transit">In Transit</option>
                        <option value="assigned">Assigned</option>
                        <option value="completed">Completed</option>
                        <option value="not-started">Not Started</option>
                      </select>
                    </td>
                    <td>
                      <FaMapMarkerAlt />{" "}
                      {shipment.startCoordinate.coordinates
                        ? `${shipment.startCoordinate.coordinates[1]}, ${shipment.startCoordinate.coordinates[0]}`
                        : "N/A"}
                    </td>
                    <td>
                      <FaMapMarkerAlt />{" "}
                      {shipment.endCoordinate.coordinates
                        ? `${shipment.endCoordinate.coordinates[1]}, ${shipment.endCoordinate.coordinates[0]}`
                        : "N/A"}
                    </td>
                    <td>
                      <a
                        href={`/track/${shipment._id}`}
                        className="track-button"
                      >
                        <FaEye /> Track
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No shipments available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default ShipmentList;
