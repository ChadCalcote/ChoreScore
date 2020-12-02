var express = require("express");
var router = express.Router();
const db = require("../db/models")
const { requireAuth } = require("../auth")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "ChoreScore Homepage" });
});

/* GET dashboard page. */
router.get("/dashboard", requireAuth, function (req, res, next) {
  res.render("dashboard", { title: "Dashboard" });
});

module.exports = router;
