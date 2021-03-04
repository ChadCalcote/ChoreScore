const { sequelize } = require("./db/models");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const listsRouter = require("./routes/lists");
const choresRouter = require("./routes/chores");
const rewardsRouter = require("./routes/rewards");

const {
  express,
  createError,
  path,
  cookieParser,
  logger,
  session,
  sessionSecret,
  expiresIn,
  restoreUser,
} = require("./utils");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// initialize app
const app = express();

// view engine setup
app.set("view engine", "pug");
app.set('views', './views')

// middlewares 
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    name: "chore-score.sid",
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
    maxAge: expiresIn,
  })
);

// create Session table if it doesn't already exist
store.sync();

// routes
app.use(restoreUser);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/lists", listsRouter);
app.use("/chores", choresRouter);
app.use("/rewards", rewardsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
