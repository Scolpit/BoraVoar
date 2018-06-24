const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Car = require("../../models/Car");

const validateCarInput = require("../../validation/car");

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
  Car.find({ date: { $gte: Date.now() } })
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
