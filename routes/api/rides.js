const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const IsEmpty = require("../../validation/is-empty");

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

// @route   GET api/rides/count/count
// @desc    Get rides count
// @access  Public
router.get("/count/count", (req, res) => {
  var now = new Date();
  var dt = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  Ride.find({ date: { $gte: dt } }).count(function(err, count) {
    res.json(count);
  });
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

    //Check if already exists for this date

    checkIfRideExists(req.body.date, req.user.id)
      .then(alreadyexists => {
        if (alreadyexists) {
          errors.date = "Já criou um pedido de boleia para esta data";
          res.status(400).json(errors);
        } else {
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
      })
      .catch(err => {
        res
          .status(404)
          .json({ alreadyexists: "Já criou uma boleia para esta data" });
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
        ride.remove().then(() => {
          var now = new Date();
          var dt = new Date(now.getFullYear(), now.getMonth(), now.getDate());

          Ride.find({ date: { $gte: dt } })
            .populate("user", ["name", "avatar"])
            .sort({ date: "asc" })
            .then(rides => res.json(rides))
            .catch(err =>
              res.status(404).json({ noridesfound: "Rides not found" })
            );
        });
      })
      .catch(err => res.status(401).json({ noridefound: "Not authorized" }));
  }
);

function getRideByDate(date, userid) {
  return new Promise(resolve => {
    Ride.findOne({ date: date, user: userid })
      .then(ride => {
        let isempty = !IsEmpty(ride);
        resolve(isempty);
      })
      .catch(err => {
        resolve(false);
      });
  });
}

async function checkIfRideExists(date, userid) {
  const result = await getRideByDate(date, userid);
  return result;
}

module.exports = router;
