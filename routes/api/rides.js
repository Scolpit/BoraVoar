const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Ride = require("../../models/Ride");

const validateRideInput = require("../../validation/ride");

// @route   GET api/rides
// @desc    Get rides
// @access  Public
router.get("/", (req, res) => {
  var now = new Date();
  var dt = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  Ride.find({ date: { $gte: dt } })
    .populate("user", ["name", "avatar"])
    .sort({ date: "asc" })
    .then(rides => res.json(rides))
    .catch(err => res.status(404).json({ noridesfound: "Rides not found" }));
});

// @route   GET api/rides/:id
// @desc    Get ride by id
// @access  Public
router.get("/:id", (req, res) => {
  Ride.findById(req.params.id)
    .populate("user", ["name", "avatar"])
    .then(ride => res.json(ride))
    .catch(err => res.status(404).json({ noridefound: "Ride not found" }));
});

// @route   GET api/rides/date/:date
// @desc    Get rides by date
// @access  Public
router.get("/date/:date", (req, res) => {
  const year = req.params.date.substring(0, 4);
  const month = req.params.date.substring(4, 6);
  const day = req.params.date.substring(6, 8);
  const dt = new Date(year, month - 1, day);
  const dte = new Date(year, month - 1, day);
  dte.setDate(dte.getDate() + 1);

  Ride.find({
    date: {
      $gte: dt,
      $lt: dte
    }
  })
    .populate("user", ["name", "avatar"])
    .then(rides => res.json(rides))
    .catch(err => res.status(404).json({ noridesfound: "Rides not found" }));
});

// @route   POST api/rides
// @desc    Create Ride
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRideInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newRide = new Ride({
      from: req.body.from,
      to: req.body.to,
      date: req.body.date,
      user: req.user.id
    });

    newRide.save().then(ride => {
      res.json(ride);
    });
  }
);

// @route   DELETE api/rides/:id
// @desc    Delete ride by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Ride.findOne({ _id: req.params.id, user: req.user.id })
      .then(ride => {
        ride.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(401).json({ noridefound: "Not authorized" }));
  }
);

module.exports = router;
