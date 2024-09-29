import React from "react";
import { FaShip, FaClipboardList, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./sidenav.css";

const SideNav = () => {
  return (
    <div className="side-nav">
      <nav>
        <ul>
          <li>
            <Link to="onboard-ship">
              <FaShip className="nav-icon" title="Onboard Ship" />
            </Link>
          </li>
          <li>
            <Link to="assign-shipment">
              <FaTasks className="nav-icon" title="Assign Shipment" />
            </Link>
          </li>
          <li>
            <Link to="shipment-list">
              <FaClipboardList className="nav-icon" title="Shipment List" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
