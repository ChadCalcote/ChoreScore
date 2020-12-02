const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler, csrfProtection } = require("../utils.js");
const { check, validationResult } = require("express-validator");

const userValidators = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 50 })
    .withMessage("userName must not be longer than 50 characters"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email")
    .isLength({ max: 255 })
    .withMessage("Email must not be longer than 255 characters")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } }).then(
        (user) => {
          if (user) {
            return Promise.reject(
              "The provided Email Address is already in use by another account"
            );
          }
        }
      );
    }),
  ,
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password")
    .isLength({ max: 50 })
    .withMessage("Password must not be longer than 50 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please confirm your password")
    .isLength({ max: 50 })
    .withMessage("Password must not be longer than 50 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Sign up" });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

/* GET account page. */
router.get("/account", function (req, res, next) {
  res.render("account", { title: "Account" });
});

// Sign Up Users POST
// router.post(
//   "/",
//   csrfProtection,
//   userValidators,
//   asyncHandler(async (req, res, next) => {})
// );

module.exports = router;
