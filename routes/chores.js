const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Unauthorized } = require('http-errors');
const db = require('../db/models');
const { asyncHandler, csrfProtection, handleValidationErrors } = require("../utils.js");
const { Chore } = db;
// const { User } = db; <= ADD THIS TO users.js

const choreNotFoundError = (id) => {
  const err = Error("Chore not found");
  err.errors = [`Chore with id of ${id} could not be found.`];
  err.title = "Chore not found.";
  err.status = 404;
  return err;
};

const validateChore = [
    check('choreName')
        .exists({ checkFalsy: true })
        .withMessage("Chore Name cannot be empty.")
        .isLength({ max: 50 })
        .withMessage("Chore Name cannot be longer than 50 characters."),
    check('value')
        .exists({ checkFalsy: true })
        .withMessage("Chore Name cannot be empty.")
        .custom((value) => Number.isInteger(value))
        .withMessage("Value must be an integer."),
    check('note')
        .isLength({ max: 255 })
        .withMessage('Note cannot be longer than 255 characters.'),
    check('dueDate')
        .isDate()
        .withMessage("Due date should be a valid date.")
]

// Find one chore with chore ID
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const chore = await Chore.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (chore) {
        res.json({ chore });
    } else {
        next(choreNotFoundError(req.params.id));
    }
  })
);

// Create a new chore
router.post(
  "/create", validateChore, asyncHandler(async (req, res, next) => {
    const { choreName, value, note, dueDate, choreTypeId } = req.body;
    try {
      const chore = await Chore.create({
        choreName,
        value,
        note, 
        dueDate,
        choreTypeId,
        userId: req.session.auth.userId
      });
      res.json({ chore });
    } catch(err) {
      console.log('Chore not posted', err);
    }
  })
);

// Edit a chore + Complete a chore
router.put("/edit/:id(\\d+)", validateChore, asyncHandler(async(req, res, next)=>{
  const { choreName, value, note, dueDate, choreTypeId, isCompleted, listId } = req.body;
  const chore = await Chore.findOne({
    where: {
      id: req.params.id
    }
  })
  if(req.user.id !== chore.userId){
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You're not authorized to edit this chore.";
    err.title = "Unauthorized";
    throw err;
  } 
  if(chore){
    await chore.update({
      choreName,
      value,
      note,
      dueDate,
      choreTypeId,
      isCompleted,
      listId
    })
    res.json({ chore });
  } else {
    next(choreNotFoundError(req.params.id));
  }
}))

// Delete a chore
router.delete("/delete/:id(\\d+)", asyncHandler(async(req, res, next)=>{
  const { choreName } = req.body;
  const destroyedChore = choreName;
  const chore = await Chore.findOne({
    where: {
      id: req.params.id
    }
  });
  if(req.user.id !== chore.userId){
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You're not authorized to delete this chore.";
    err.title = "Unauthorized";
    throw err;
  } 
  if(chore){
    await chore.destroy();
    res.json({ message: `${destroyedChore} has been deleted.` });
  } else {
    next(choreNotFoundError(req.params.id));
  }
}))

module.exports = router;
