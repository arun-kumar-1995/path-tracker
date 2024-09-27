import React from "react";

const Dashboard = () => {
  return (
    <div>
      <main>
        <div className="multi-form">
          <section className="onboard-ship">
            <div className="title">OnBoard Ship</div>
            <form action="">
              <input
                type="text"
                placeholder="Enter ship name"
                required
                autoComplete="off"
              />
              <button className="submit">Submit</button>
            </form>
          </section>
          <section className="assign-shipment">
            <div className="title">Assign Shipment</div>
            <form action="">
              <button className="submit">Submit</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
