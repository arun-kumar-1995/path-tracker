import React, { useEffect } from "react";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import api from "../services/api";

const ShipmentList = () => {
  
  return (
    <section className="d-section">
      <div className="section-wrapper">
        <h1>Shipment list</h1>
        <div className="shipment-table-container">
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
            {/* <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>{shipment.id}</td>
                  <td>
                    <select
                      value={shipment.status}
                      onChange={(e) => shipment.updateStatus(e.target.value)}
                    >
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <FaMapMarkerAlt /> {shipment.startCoordinate}
                  </td>
                  <td>
                    <FaMapMarkerAlt /> {shipment.endCoordinate}
                  </td>
                  <td>
                    <a href={`/track/${shipment.id}`} className="track-button">
                      <FaEye /> Track
                    </a>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </section>
  );
};

export default ShipmentList;
