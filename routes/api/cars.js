const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const passport = require("passport");

const Car = require("../../models/Car");

const validateCarInput = require("../../validation/car");
const validateCarInviteRideInput = require("../../validation/carinviteride");

// @route   GET api/cars/test
// @desc    Test Cars route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "Cars router works!" });
});

// @route   GET api/cars
// @desc    Get cars
// @access  Public
router.get("/", (req, res) => {
  var now = new Date();
  var dt = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  Car.find({ date: { $gte: dt } })
    .sort({ date: "asc" })
    .then(cars => res.json(cars))
    .catch(err => res.status(404).json({ nocarsfound: "Cars not found" }));
});

// @route   GET api/cars/:id
// @desc    Get car by id
// @access  Public
router.get("/:id", (req, res) => {
  Car.findById(req.params.id)
    .then(car => res.json(car))
    .catch(err => res.status(404).json({ nocarsfound: "Car not found" }));
});

// @route   POST api/cars
// @desc    Create Car
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCarInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newCar = new Car({
      from: req.body.from,
      to: req.body.to,
      description: req.body.description,
      date: req.body.date,
      user: req.user.id
    });

    newCar.save().then(car => {
      res.json(car);
    });
  }
);

// @route   POST api/cars/:carid/ride
// @desc    Invite to car by name
// @access  Private
router.post(
  "/:carid/ride",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCarInviteRideInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Car.findOne({ _id: req.params.carid, user: req.user.id })
      .then(car => {
        const newRide = {
          name: req.body.name
        };

        // Add to rides array
        car.rides.push(newRide);

        car.save().then(car => res.json(car));
      })
      .catch(err => res.status(404).json({ nocarsfound: "Car not found" }));
  }
);

// @route   POST api/cars/:carid/ride/:userid
// @desc    Invite to car by userid
// @access  Private
router.post(
  "/:carid/ride/:userid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Car.findOne({ _id: req.params.carid, user: req.user.id })
      .then(car => {
        User.findById(req.params.userid)
          .then(user => {
            //Check if pilot is already added to car
            ridenotexist =
              car.rides.find(el => {
                return el.user == req.params.userid;
              }) == null;

            if (ridenotexist) {
              const newRide = {
                name: user.name,
                user: user._id
              };

              // Add to rides array
              car.rides.push(newRide);

              car.save().then(car => res.json(car));
            } else {
              res.status(404).json({ fbm_error: "Piloto já adicionado" });
            }
          })
          .catch(err =>
            res.status(404).json({ nouserfound: "User not found" })
          );
      })
      .catch(err => res.status(404).json({ nocarsfound: "Car not found" }));
  }
);

// @route   DELETE api/cars/:id
// @desc    Delete car by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Car.findOne({ _id: req.params.id, user: req.user.id })
      .then(car => {
        car.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(401).json({ nocarfound: "Not authorized" }));
  }
);

module.exports = router;
