const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RideSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, required: true },
  from: { type: String, required: true, max: 30 },
  to: { type: String, required: true, max: 30 },
  used: { type: Boolean, default: false }
});

module.exports = Ride = mongoose.model("ride", RideSchema);
