const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require('../db/models');
const { asyncHandler, csrfProtection, handleValidationErrors } = require("../utils.js");
const { List } = db;

const listNotFoundError = (id) => {
    const err = Error("List not found");
    err.errors = [`List with id of ${id} could not be found.`];
    err.title = "List not found.";
    err.status = 404;
    return err;
  };

  const validateList = [
      check('listName')
        .exists({checkFalsy: true})
        .withMessage("List name cannot be empty.")
        .isLength({max: 60})
        .withMessage("List name cannot be longer than 60 characters.")
  ]

  router.get(
      "/:id",
      asyncHandler(async (req, res, next)=>{
          const list = List.findAll({
              where: {
                  userId: req.params.id,
              },
          })
      })

  )


  module.exports = router
