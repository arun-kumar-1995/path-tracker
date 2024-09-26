import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    shipId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    startCoordinate: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    endCoordinate: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    trajectory: {
      type: {
        type: String,
        enum: ["LineString"],
        default: "LineString",
      },
      coordinates: {
        type: [[Number]],
        default: [],
      },
    },
    shipmentStatus: {
      type: String,
      enum: [
        "in-transit",
        "completed",
        "not started",
        "assigned",
        "not-assigned",
      ],
      default: "not-assigned",
    },
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", schema);
export default Shipment;
