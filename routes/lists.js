const {
  express,
  check,
  validationResult,
  db,
  List,
  Chore,
  asyncHandler,
} = require("../utils.js");
const router = express.Router();

const listNotFoundError = (id) => {
  const err = Error("List not found");
  err.errors = [`List with id of ${id} could not be found.`];
  err.title = "List not found.";
  err.status = 404;
  return err;
};

const validateList = [
  check("listName")
    .exists({ checkFalsy: true })
    .withMessage("List name cannot be empty.")
    .isLength({ max: 60 })
    .withMessage("List name cannot be longer than 60 characters."),
];

//Get a list and all of its chores
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const lists = await List.findAll({
      include: Chore,
      where: { userId: req.session.auth.userId },
    });
    if (lists) {
      res.json({ lists });
    } else {
      next(listNotFoundError(req.params.id));
    }
  })
);

// Find one list with list ID
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    console.log("Auth", req.session.auth.userId);
    const id = req.params.id;
    const list = await List.findByPk(id, {
      include: Chore,
    });
    if (list) {
      res.json({ listName: list.listName, chores: list.Chores });
    } else {
      next(listNotFoundError(req.params.id));
    }
  })
);

// Create a list
router.post(
  "/create",
  validateList,
  asyncHandler(async (req, res, next) => {
    const { listName } = req.body;
    const list = db.List.build({ userId: req.session.auth.userId, listName });
    const user = await db.User.findByPk(req.session.auth.userId, {
      include: [List, Chore],
    });
    const chore = user.Chores;
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      await list.save();
      res.json({
        userName: user.userName,
        lists: user.Lists,
        chores: user.Chores,
        chore,
      });
    } else {
      listErrors = validatorErrors.array().map((error) => error.msg);
      console.log(listErrors);
      res.json({ listErrors: listErrors });
    }
  })
);

// Edit a list
router.put(
  "/:id(\\d+)/edit",
  validateList,
  asyncHandler(async (req, res, next) => {
    const { listName } = req.body;
    const list = await List.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.session.auth.userId !== list.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You're not authorized to edit this list.";
      err.title = "Unauthorized";
      throw err;
    }
    if (list) {
      await list.update({
        listName,
      });
      res.json({ list });
    } else {
      next(listNotFoundError(req.params.id));
    }
  })
);

// Delete a list
router.delete(
  "/:id(\\d+)/delete",
  asyncHandler(async (req, res, next) => {
    const { listName } = req.body;
    const destroyedList = listName;
    const list = await List.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.session.auth.userId !== list.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You're not authorized to delete this list.";
      err.title = "Unauthorized";
      throw err;
    }
    if (list) {
      await list.destroy();
      res.json({ message: `${destroyedList} has been deleted.` });
    } else {
      next(choreNotFoundError(req.params.id));
    }
  })
);

module.exports = router;
