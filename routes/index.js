const {
  express,
  asyncHandler,
  requireAuth,
  db,
  List,
  Chore,
} = require("../utils");

const router = express.Router();

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.render("home", { title: "ChoreScore - Homepage" });
  })
);

/* GET dashboard page. */
router.get(
  "/dashboard",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = req.session.auth.userId;
    const user = await db.User.findByPk(id, {
      include: [Chore, List],
    });
    const chore = await db.Chore.build();

    res.render("dashboard", {
      title: "ChoreScore - Dashboard",
      userName: user.userName,
      lists: user.Lists,
      chores: user.Chores,
      chore,
    });
  })
);

module.exports = router;
