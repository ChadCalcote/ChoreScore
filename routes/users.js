const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { asyncHandler, csrfProtection, handleValidationErrors } = require("../utils.js");
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const { loginUser, logoutUser } = require("../auth");

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

const loginValidators = [
check("userName")
  .exists({ checkFalsy: true })
  .withMessage("Please enter your user name."),
check("password")
  .exists({ checkFalsy: true })
  .withMessage("Please enter your password."),
];

// GET signup page.
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
  const {userName, email, password} = req.body
  const user = db.User.build({userName, email})
  const validatorErrors = validationResult(req)
  if(validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10)
    user.hashedPassword = hashedPassword
    await user.save()
    res.redirect("/")
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render("signup", { title: "Sign up", user, errors, csrfToken: req.csrfToken()})
  }
  }));

// GET login page.
router.get("/login", csrfProtection, asyncHandler( async (req, res, next) => {
  errors = []
  if(req.query.redir) errors.push("Sorry, you must be logged in to see that page.")
  res.render("login", { title: "Login", errors, csrfToken: req.csrfToken() });
}));

// POST login page.
router.post("/login", csrfProtection, loginValidators, asyncHandler( async (req, res, next) => {
  const {
    userName,
    password
  } = req.body;
  const validatorErrors = validationResult(req);
  let errors = [];
  if (validatorErrors.isEmpty()) {
    //TODO: Attempt to log in user
    const user = await db.User.findOne({ where: { userName }});
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req, res, user);
        return res.redirect("/dashboard");
      }
    }
    errors.push("Username and password do not match.");
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }
  res.render("login", { title: "Log in", errors, userName, csrfToken: req.csrfToken()})
}));

// GET account page.
router.get("/account", function (req, res, next) {
  res.render("account", { title: "Account" });
});

// Logout
router.post("/logout", (req, res) => {
  logoutUser(req, res);
  res.json({
    message: "Logout successful",
  });
});

module.exports = router;
