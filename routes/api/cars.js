const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const passport = require("passport");

const Car = require("../../models/Car");
const Ride = require("../../models/Ride");

const validateCarInput = require("../../validation/car");
const validateCarInviteRideInput = require("../../validation/carinviteride");

// @route   GET api/cars
// @desc    Get cars
// @access  Public
router.get("/", (req, res) => {
  var now = new Date();
  var dt = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  Car.find({ date: { $gte: dt } })
    .populate("user", ["name", "avatar"])
    .populate("rides")
    .sort({ date: "asc" })
    .then(cars => res.json(cars))
    .catch(err => res.status(404).json({ nocarsfound: "Cars not found" }));
});

// @route   GET api/cars/:id
// @desc    Get car by id
// @access  Public
router.get("/:id", (req, res) => {
  Car.findById(req.params.id)
    .populate("user", ["name", "avatar"])
    .populate("chat.user", ["name", "avatar"])
    .then(car => {
      let dte = new Date(car.date.getTime());
      dte.setDate(dte.getDate() + 1);

      Ride.find({
        date: {
          $gte: car.date,
          $lt: dte
        }
      })
        .populate("user", ["name", "avatar"])
        .then(rides => {
          car.ridesByDate = rides;
          res.json(car);
        })
        .catch(err => {
          res.json(car);
        });
    })
    .catch(err => res.status(404).json({ nocarsfound: "Car not found" }));
});

// @route   GET api/cars/count/count
// @desc    Get cars count
// @access  Public
router.get("/count/count", (req, res) => {
  var now = new Date();
  var dt = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  Car.find({ date: { $gte: dt } }).count(function(err, count) {
    res.json(count);
  });
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
      .populate("user", ["name", "avatar"])
      .populate("chat.user", ["name", "avatar"])
      .then(car => {
        //Check if pilot is already added to car
        ridenotexist =
          car.rides.find(el => {
            return el.name == req.body.name;
          }) == null;

        if (ridenotexist) {
          const newRide = {
            name: req.body.name
          };

          // Add to rides array
          car.rides.push(newRide);

          car.save().then(car => {
            let dte = new Date(car.date.getTime());
            dte.setDate(dte.getDate() + 1);

            Ride.find({
              date: {
                $gte: car.date,
                $lt: dte
              }
            })
              .populate("user", ["name", "avatar"])
              .then(rides => {
                car.ridesByDate = rides;
                res.json(car);
              })
              .catch(err => {
                res.json(car);
              });
          });
        } else {
          res.status(404).json({ nocarsfound: "Piloto já adicionado" });
        }
      })
      .catch(err =>
        res.status(404).json({ useralreadyadded: "Car not found" })
      );
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
      .populate("user", ["name", "avatar"])
      .populate("chat.user", ["name", "avatar"])
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

              car.save().then(car => {
                let dte = new Date(car.date.getTime());
                dte.setDate(dte.getDate() + 1);

                Ride.find({
                  date: {
                    $gte: car.date,
                    $lt: dte
                  }
                })
                  .populate("user", ["name", "avatar"])
                  .then(rides => {
                    car.ridesByDate = rides;
                    res.json(car);
                  })
                  .catch(err => {
                    res.json(car);
                  });
              });
            } else {
              return res
                .status(404)
                .json({ fbm_error: "Piloto já adicionado" });
            }
          })
          .catch(err =>
            res.status(404).json({ nouserfound: "User not found" })
          );
      })
      .catch(err => res.status(404).json({ nocarsfound: "Car not found" }));
  }
);

// @route   POST api/cars/:carid/full
// @desc    Mark car as full
// @access  Private
router.post(
  "/:carid/full",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Car.findOne({ _id: req.params.carid, user: req.user.id })
      .populate("user", ["name", "avatar"])
      .populate("chat.user", ["name", "avatar"])
      .then(car => {
        car.full = req.body.full;
        car.save().then(car => {
          let dte = new Date(car.date.getTime());
          dte.setDate(dte.getDate() + 1);

          Ride.find({
            date: {
              $gte: car.date,
              $lt: dte
            }
          })
            .populate("user", ["name", "avatar"])
            .then(rides => {
              car.ridesByDate = rides;
              res.json(car);
            })
            .catch(err => {
              res.json(car);
            });
        });
      })
      .catch(err => res.status(401).json({ carnotfound: "Not authorized" }));
  }
);

// @route   POST api/cars/:carid/chat
// @desc    Post chat
// @access  Private
router.post(
  "/:carid/chat",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Car.findOne({ _id: req.params.carid })
      .then(car => {
        const newChat = {
          user: req.user._id,
          text: req.body.text
        };

        // Add to rides array
        car.chat.push(newChat);
        car.save().then(car => {
          Car.findOne({ _id: car._id })
            .populate("user", ["name", "avatar"])
            .populate("chat.user", ["name", "avatar"])
            .then(car => res.json(car));
        });
      })
      .catch(err => res.status(404).json({ nocarsfound: "Car not found" }));
  }
);

// @route   DELETE api/cars/:carid/ride/:rideid
// @desc    Delete ride from car
// @access  Private
router.delete(
  "/:carid/ride/:rideid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Car.findOne({ _id: req.params.carid, user: req.user.id })
      .populate("user", ["name", "avatar"])
      .populate("chat.user", ["name", "avatar"])
      .then(car => {
        const removeIndex = car.rides
          .map(item => item.id)
          .indexOf(req.params.rideid);

        if (removeIndex == -1) {
          return res.json({ ridenotfound: "Piloto não encontrado" });
        }

        car.rides.splice(removeIndex, 1);

        car.save().then(car => {
          let dte = new Date(car.date.getTime());
          dte.setDate(dte.getDate() + 1);

          Ride.find({
            date: {
              $gte: car.date,
              $lt: dte
            }
          })
            .populate("user", ["name", "avatar"])
            .then(rides => {
              car.ridesByDate = rides;
              res.json(car);
            })
            .catch(err => {
              res.json(car);
            });
        });
      })
      .catch(err => res.status(401).json({ carnotfound: "Not authorized" }));
  }
);

// @route   DELETE api/cars/:carid/chat/:chatid
// @desc    Delete chat from car
// @access  Private
router.delete(
  "/:carid/chat/:chatid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Car.findOne({ _id: req.params.carid })
      .populate("user", ["name", "avatar"])
      .populate("chat.user", ["name", "avatar"])
      .then(car => {
        const removeIndex = car.chat
          .map(item => item.id)
          .indexOf(req.params.chatid);

        if (removeIndex == -1) {
          return res.json({ chatnotfound: "Mensagem não encontrada" });
        }

        //Only car owner or message owner can delete message
        if (
          car.user == req.user.id ||
          car.chat[removeIndex].user == req.user.id
        ) {
          car.chat.splice(removeIndex, 1);

          car.save().then(car => res.json(car));
        } else {
          return res.json({ messageotherperson: "Not authorized" });
        }
      })
      .catch(err => res.status(401).json({ carnotfound: "Not authorized" }));
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
