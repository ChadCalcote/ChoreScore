const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
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
        .withMessage("Chore Name cannot be longer than 50 characters"),
    check('value')
        .exists({ checkFalsy: true })
        .withMessage("Chore Name cannot be empty.")
        .custom((value) => Number.isInteger(value))
        .withMessage("Value must be an integer."),
    check('note')
        .isLength({ max: 255 })
        .withMessage('Note cannot be longer than 255 characters'),
    check('dueDate')
        .exists
]

// find all chores from the same user (move to users)
router.get('/:id/chores', asyncHandler(async (req, res, next) => {
  const chores = Chore.findAll({
      where: {
          listId: req.params.id
      }
  })
}));

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const chore = Chore.findOne({
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

router.post('/', asyncHandler(async (req, res, next) => {

}))



module.exports = router;
