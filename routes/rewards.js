const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Unauthorized } = require('http-errors');
const db = require('../db/models');
const { asyncHandler, csrfProtection, handleValidationErrors } = require("../utils.js");
const { Reward } = db;

const rewardNotFoundError = (id) => {
  const err = Error("Reward not found");
  err.errors = [`Reward with id of ${id} could not be found.`];
  err.title = "Reward not found.";
  err.status = 404;
  return err;
};

const validateReward = [
  check("rewardName")
    .exists({checkFalsy: true})
    .withMessage("Reward Name cannot be empty.")
    .isLength({ max: 255 })
    .withMessage("Reward Name cannot be longer than 255 characters."),
  check('rewardValue')
    .exists({ checkFalsy: true })
    .withMessage("Reward value cannot be empty.")
    .custom((value) => Number.isInteger(value))
    .withMessage("Value must be an integer.")
]

// Find all rewards according to user ID
router.get('/', asyncHandler(async (req, res, next) => {
  const rewards = await Reward.findAll({
      where: {
          userId: req.session.auth.id
      }
  })
  if (rewards) {
      res.json({ rewards });
  } else {
    const err = new Error("Reward not found");
    err.status = 404;
    err.title = "Reward not found.";
    throw err;
  }
}));

// Find one reward according to reward ID
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const reward = await Reward.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (reward) {
        res.json({ reward });
    } else {
        next(rewardNotFoundError(req.params.id));
    }
  })
);

// Create a new reward
router.post(
  "/create", validateReward, asyncHandler(async (req, res, next) => {
    const { rewardName, rewardDescription, rewardValue } = req.body;
    try {
      const reward = await Reward.create({
        rewardName,
        rewardDescription,
        rewardValue,
        userId: req.session.auth.userId
      });
      res.json({ reward });
    } catch(err) {
      console.error('Reward not posted', err);
    }
  })
);

// Edit a reward + redeem a reward
router.put("/:id(\\d+)/edit", validateReward, asyncHandler(async(req, res, next)=>{
  const { rewardName, rewardDescription, rewardValue, isCollected } = req.body;
  const reward = await Reward.findOne({
    where: {
      id: req.params.id
    }
  })
  if(req.session.auth.userId !== reward.userId){
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You're not authorized to edit this reward.";
    err.title = "Unauthorized";
    throw err;
  }
  if(reward){
    await reward.update({
      rewardName,
      rewardDescription,
      rewardValue,
      isCollected
    })
    res.json({ reward });
  } else {
    next(rewardNotFoundError(req.params.id));
  }
}))

// Delete a reward
router.delete("/:id(\\d+)/delete", asyncHandler(async(req, res, next)=>{
  const { rewardName } = req.body;
  const destroyedReward = rewardName;
  const reward = await Reward.findOne({
    where: {
      id: req.params.id
    }
  });
  if(req.session.auth.userId !== reward.userId){
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You're not authorized to delete this reward.";
    err.title = "Unauthorized";
    throw err;
  }
  if(reward){
    await reward.destroy();
    res.json({ message: `${destroyedReward} has been deleted.` });
  } else {
    next(rewardNotFoundError(req.params.id));
  }
}))

module.exports = router;
