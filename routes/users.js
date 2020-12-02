const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler, csrfProtection } = require("../utils.js");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { logoutUser } = require("../auth");

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
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),
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
router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const user = db.User.build();
    res.render("signup", {
      title: "Sign up",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);

// Sign Up Users POST
router.post(
  "/signup",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    const user = db.User.build({ userName, email });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      console.log(req.body);
      await user.save();
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.log(errors);
      res.render("signup", {
        title: "Sign up",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

/* GET account page. */
router.get("/account", function (req, res, next) {
  res.render("account", { title: "Account" });
});

/* Logout */
router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.json({
    message: "Logout successful",
  });
});

module.exports = router;
