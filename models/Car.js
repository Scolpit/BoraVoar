const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, required: true },
  from: { type: String, required: true, max: 30 },
  to: { type: String, required: true, max: 30 },
  description: { type: String, required: true, min: 10, max: 2000 },
  full: { type: Boolean, default: false },
  rides: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      name: { type: String, required: true }
    }
  ],
  ridesByDate: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      from: { type: String, required: true, max: 30 },
      to: { type: String, required: true, max: 30 },
      used: { type: Boolean, default: false }
    }
  ],
  chat: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      date: { type: Date, default: Date.now },
      text: { type: String, required: true }
    }
  ]
});

module.exports = Car = mongoose.model("car", CarSchema);
