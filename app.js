const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const nunjucks = require("nunjucks");
const session = require("express-session");

require("dotenv").config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const tasksApiRouter = require("./routes/api/tasks");

const app = express();

nunjucks.configure("views", {
    autoescape: true,
    express: app
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    sassMiddleware({
        src: path.join(__dirname, "public"),
        dest: path.join(__dirname, "public"),
        indentedSyntax: false, // true = .sass and false = .scss
        sourceMap: true
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "ojoj",
        resave: false,
        saveUninitialized: true,
        cookie: { sameSite: true }
    })
);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/api/tasks", tasksApiRouter);

module.exports = app;
