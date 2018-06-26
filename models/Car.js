const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, required: true },
  from: { type: String, required: true, max: 30 },
  to: { type: String, required: true, max: 30 },
  full: { type: Boolean, default: false },
  rides: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      name: { type: String, required: true }
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
