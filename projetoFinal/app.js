var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//------------------------------
// var cors = require("cors");
//------------------------------
require("dotenv").config();
//------------------------------
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//--------------------------------
var tweetRouter = require("./routes/tweet");
var adminRouter = require("./routes/admin");
//-------------------------------
// var authRouter = require("./routes/auth");
// var commentsRouter = require("./routes/comments");
var feedRouter = require("./routes/feed");
var likeRouter = require("./routes/like");
//-------------------------------
var swaggerUi = require("swagger-ui-express");
// var swaggerFile = require("./swagger");
var swaggerFile = require("./swagger_output.json");
//-----------------------------
var app = express();
//-------------------------------

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//-------------------------------
// app.use(cors({origin: "http://localhost:3000", credentials: true  }));
//---------------------------------
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/", indexRouter);
app.use("/users", usersRouter);
//-------------------------------
// app.use("/auth", authRouter);

app.use("/tweets", tweetRouter);
// app.use("/user", userRouter);
// app.use("/admin");
// app.use("/users");
//--------------------------------
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

app.use("/admin", adminRouter);

app.use("/feed", feedRouter);
// app.use("/comments", commentsRouter);
app.use("/like", likeRouter);
//-------------------------------
app.use("/api/users", usersRouter);
app.use("/api/tweets", tweetRouter);
app.use("/api/admin", adminRouter);
// app.use("/api/like", likeRouter);
// app.use("/api/comments", commentsRouter);
app.use("/api/feed", feedRouter);
app.use("/api/like", likeRouter);

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
