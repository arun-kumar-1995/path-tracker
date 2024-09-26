import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    shipName: {
      type: String,
      required: true,
    },
    shipments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shipment",
      },
    ],
  },
  { timestamps: true }
);

const Ship = mongoose.model("Ship", schema);
export default Ship;
