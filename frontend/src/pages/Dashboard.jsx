import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom"; 
import SideNav from "../components/SideNav";
import { Toaster } from "react-hot-toast";
import "./dashboard.css";

// Lazy load components for better performance
const OnboardShip = React.lazy(() => import("../components/OnboardShip"));
const AssignShipment = React.lazy(() => import("../components/AssignShipment"));
const ShipmentList = React.lazy(() => import("../components/ShipmentList"));

const Dashboard = () => {
  return (
    <div>
      <SideNav />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="onboard-ship" element={<OnboardShip />} />
            <Route path="assign-shipment" element={<AssignShipment />} />
            <Route path="shipment-list" element={<ShipmentList />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster />
    </div>
  );
};

export default Dashboard;
