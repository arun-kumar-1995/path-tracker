# Shipment Tracker

## Project Overview
The Shipment Tracker is a real-time web application that enables users to track the current location of shipments on a map and update shipment statuses dynamically. It uses Node.js, Socket.io, Redis, and MongoDB on the backend to manage real-time data, and React.js for a dynamic frontend.
```
.
├── frontend                 # Frontend code (React app)
│   ├── src
│   │   ├── components     # React components
│   │   ├── pages          # API service for fetching data
│   │   └── styles         # Component-specific styles
                           # Backend code
|   |── configs            # backend configuration
│   ├── controllers        # Controllers for shipment handling
|   ──  events             # list of socket events
│   ├── models             # Mongoose models
│   ├── routes             # API routes
│   ├── socket             # Socket.io event handlers
│   ├── services           # Redis, MongoDB services
│   └── utils              # Utility functions
├── .env                   # Environment variables
└── README.md              # Project documentation
```


## Features
- **Real-time Map Updates**: The current location of a shipment is displayed on a map and updated dynamically as the shipment moves.
- **Live Status Update**: Users can update shipment statuses in real-time using a table with filters.
- **WebSocket Integration**: Real-time communication between the server and clients to push location updates and status changes instantly.
- **Optimized Operations**: Avoided continuous bulk read and write operations.
- **Filter Shipments**: Users can filter shipments by status.

## Tech Stack
- **Frontend**: React, JavaScript, CSS, `react-hot-toast` for notifications.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose ODM, WebSockets (Socket.io).
- **Database**: MongoDB for persistent data storage.

## Installation
Follow these steps to install and run the project locally:

## Installation
 
 Step-by-step guide to install the project locally.

1. **Clone the repository**:
```bash
 git clone https://github.com/arun-kumar-1995/path-tracker.git
  
```
2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Go back to root and install backend dependencies**
```bash
cd ..
npm install
```
4. **Env Setup**
```bash
NODE_ENV=Development
PORT=5000
MONGODB_URL=your mongodb url
DB_NAME=Path-tracker
FRONTEND_URL=http://localhost:3000
```
5. **Run the server**
```bash
bash
Copy code
npm start
```

6. **API Endpoints**
```bash
POST/onboard-ship : - onBoardShip 
POST("/create-shipment:- createShipment
GET/getShips:- get All Ships name
GET/shipment/:id: - get Shipment Details
PUT/update-shipment: - update Shipment Status
GET/shipments:- get Shipments

```   
