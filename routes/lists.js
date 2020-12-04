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
// router.get('/:id(\\d+)/chores', asyncHandler(async (req, res, next) => {
//     const chores = await Chore.findAll({
//         where: {
//             listId: req.params.id
//         }
//     })
//     if (chores) {
//         res.json({ chores });
//     } else {
//        next(listNotFoundError(req.params.id));
//     }
// }));

//Get a list and all of its chores
router.get('/', asyncHandler(async (req, res, next) => {
    const lists = await List.findAll({
        include: Chore
    })
    if (lists) {
        res.json({ lists });
    } else {
       next(listNotFoundError(req.params.id));
    }
}));


// Find one list with list ID
router.get( "/:id", asyncHandler(async (req, res, next)=>{
      console.log('Auth', req.session.auth.userId)
      const id = req.params.id;
      console.log(req.params.id);
      console.log(id);
        const list = await List.findByPk(id, {
          include: Chore
        });
        if (list) {
            res.json({ listName, chores: list.Chores });
        } else {
            next(listNotFoundError(req.params.id));
        }
    }));


// Create a list
router.post("/create", validateList, asyncHandler(async(req, res, next)=>{
    const { listName } = req.body;
    const list = db.List.build({userId: req.session.auth.userId, listName});
    const user = await db.User.findByPk(req.session.auth.userId, {
      include: [List, Chore]
    });
    const chore = user.Chores;
    const validatorErrors = validationResult(req)
    if(validatorErrors.isEmpty()){
      await list.save()
      res.json({ userName: user.userName, lists: user.Lists, chores: user.Chores, chore })
    } else {
      errors = validatorErrors.array().map((error)=>error.msg);
      res.render("dashboard", {title: "Dashboard", user, errors})
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
