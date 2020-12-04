var express = require("express");
var router = express.Router();
const db = require("../db/models");
const { List, Chore } = db;
const { requireAuth } = require("../auth");
const { asyncHandler } = require("../utils");

/* GET home page. */
router.get("/", asyncHandler(async(req, res, next) => {
  res.render("index", { title: "ChoreScore Homepage" });
}));

/* GET dashboard page. */
router.get("/dashboard", requireAuth, asyncHandler(async(req, res, next) => {
  let errors=[];
  const id = req.session.auth.userId;
  const user = await db.User.findByPk(id, {
    include: [Chore,List]
  });
  const chore = await db.Chore.build();

  res.render("dashboard", { title: "Dashboard", userName: user.userName, lists: user.Lists, chores: user.Chores, chore});
}));

module.exports = router;
