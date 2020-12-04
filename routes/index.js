var express = require("express");
var router = express.Router();
const db = require("../db/models")
const { requireAuth } = require("../auth");
const { asyncHandler } = require("../utils");

/* GET home page. */
router.get("/", asyncHandler(async(req, res, next) => {
  res.render("index", { title: "ChoreScore Homepage" });
}));

/* GET dashboard page. */
router.get("/dashboard", requireAuth, asyncHandler(async(req, res, next) => {
  let errors=[];
  let chore = await db.Chore.build()
  res.render("dashboard", { title: "Dashboard", chore, errors });
}));

module.exports = router;
