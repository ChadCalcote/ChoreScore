const express = require("express");
const csrf = require("csurf");
const bcrypt = require("bcryptjs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { check, validationResult, body } = require("express-validator");
const { Unauthorized, createError } = require("http-errors");

const { sessionSecret, expiresIn } = require("./config");
const db = require("./db/models");
const sequelize = require("./db/models");
const { Chore, List, Reward, User } = db;
const { requireAuth, loginUser, logoutUser, restoreUser } = require("./auth");

const asyncHandler = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
};

const csrfProtection = csrf({ cookie: true });

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error("Bad request.");
    err.status = 400;
    err.title = "Bad request.";
    err.errors = errors;
    return next(err);
  }
  next();
};

module.exports = {
  express,
  csrf,
  path,
  bcrypt,
  cookieParser,
  logger,
  session,
  SequelizeStore,
  check,
  validationResult,
  body,
  Unauthorized,
  createError,
  db,
  sequelize,
  sessionSecret,
  expiresIn,
  Chore,
  List,
  Reward,
  User,
  asyncHandler,
  handleValidationErrors,
  csrfProtection,
  requireAuth,
  loginUser,
  logoutUser,
  restoreUser,
};
