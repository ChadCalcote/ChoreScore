const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require('../db/models');
const { asyncHandler, csrfProtection, handleValidationErrors } = require("../utils.js");
const { List, Chore } = db;

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

// Find all chores according to list ID
router.get('/:id(\\d+)/chores', asyncHandler(async (req, res, next) => {
    const chores = await Chore.findAll({
        where: {
            listId: req.params.id
        }
    })
    if (chores) {
        res.json({ chores });
    } else {
       next(listNotFoundError(req.params.id));
    }
}));

// Find one list with list ID
router.get(
    "/:id(\\d+)",
    asyncHandler(async (req, res, next)=>{
        const list = await List.findAll({
            where: {
                id: req.params.id,
            },
        })
        if (list) {
            res.json({ list });
        } else {
            next(listNotFoundError(req.params.id));
        }
    })
)


// Create a list
router.post("/create", validateList, asyncHandler(async(req, res, next)=>{
    const { listName } = req.body;
    try {
        const list = await List.create({
            listName,
            userId: req.session.auth.userId
        })
        res.json({ list });
    } catch (err) {
        console.log('List not posted', err);
    }
}))


// Edit a list
router.put("/:id(\\d+)/edit", validateList, asyncHandler(async(req, res, next)=>{
    const { listName } = req.body;
    const list = await List.findOne({
      where: {
        id: req.params.id
      }
    })
    if(req.session.auth.userId !== list.userId){
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You're not authorized to edit this list.";
      err.title = "Unauthorized";
      throw err;
    } 
    if(list){
      await list.update({
        listName
      })
      res.json({ list });
    } else {
      next(listNotFoundError(req.params.id));
    }
  }))

// Delete a list
router.delete("/:id(\\d+)/delete", asyncHandler(async(req, res, next)=>{
    const { listName } = req.body;
    const destroyedList = listName;
    const list = await List.findOne({
      where: {
        id: req.params.id
      }
    })
    if(req.session.auth.userId !== list.userId){
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You're not authorized to delete this list.";
      err.title = "Unauthorized";
      throw err;
    } 
    if(list){
        await list.destroy();
        res.json({ message: `${destroyedList} has been deleted.` });
      } else {
        next(choreNotFoundError(req.params.id));
      }
  }))

module.exports = router
