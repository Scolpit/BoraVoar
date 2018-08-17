const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configKeys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateChangePasswordInput = require("../../validation/changepassword");
const validateChangeNameInput = require("../../validation/changename");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email.toLowerCase() }).then(user => {
    if (user) {
      errors.email = "Email já existe";
      return res.status(400).json(errors);
    } else {
      User.findOne({ name: req.body.name }).then(user_name => {
        if (user_name) {
          errors.name = "Nome já existe";
          return res.status(400).json(errors);
        } else {
          const avatar = gravatar.url(req.body.email.toLowerCase(), {
            s: "200", //Size
            r: "pg", //Rating
            d: "mm" //Default
          });

          const newUser = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            avatar,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.json(user);
                })
                .catch(err => {
                  console.log(err);
                });
            });
          });
        }
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login user / return token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        jwt.sign(
          payload,
          configKeys.secretOrKey,
          { expiresIn: 7776000 },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password inválida";
        return res.status(404).json(errors);
      }
    });
  });
});

// @route   POST api/users/changepassword
// @desc    Change Password
// @access  Private
router.post(
  "/changepassword",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChangePasswordInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { oldpassword, newpassword } = req.body;

    User.findById(req.user.id).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      bcrypt.compare(oldpassword, user.password).then(isMatch => {
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newpassword, salt, (err, hash) => {
              if (err) throw err;

              user.password = hash;
              user
                .save()
                .then(user => {
                  return res.json(user);
                })
                .catch(err => {
                  console.log(err);
                });
            });
          });
        } else {
          errors.oldpassword = "Password inválida";
          return res.status(404).json(errors);
        }
      });
    });
  }
);

// @route   POST api/users/changename
// @desc    Change User Name
// @access  Private
router.post(
  "/changename",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChangeNameInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { name } = req.body;

    User.findOne({ name: req.body.name }).then(user_name => {
      if (user_name) {
        errors.name = "Nome já existe";
        return res.status(400).json(errors);
      } else {
        User.findById(req.user.id).then(user => {
          if (!user) {
            errors.email = "User not found";
            return res.status(404).json(errors);
          }

          user.name = name;
          user
            .save()
            .then(user => {
              return res.json(user);
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    });
  }
);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);

module.exports = router;
