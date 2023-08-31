const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("express-handlebars");
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const { default: mongoose } = require("mongoose");
const upload = require("./utils/multer");
const cloudinary = require("./utils/cloudinary");
const Handlebars = require("handlebars");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(
  cors({
    credentials: true,
  })
);

// app.use('/external', createProxyMiddleware({
//   target: 'https://script.google.com/macros/library/d/1S8fMAIybFOXniwPcmRHsF7EM9a-gukpmpPOPlixBcRm84BITHUH2UYqy/2',
//   changeOrigin: true, // Add this option for changing the origin
// }));

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials",
  })
);

Handlebars.registerHelper("inc", (value) => {
  return parseInt(value) + 1;
});
Handlebars.registerHelper(
  "when",
  function (operand_1, operator, operand_2, options) {
    var operators = {
        eq: function (l, r) {
          return l == r;
        },
        noteq: function (l, r) {
          return l != r;
        },
        gt: function (l, r) {
          return Number(l) > Number(r);
        },
        or: function (l, r) {
          return l || r;
        },
        and: function (l, r) {
          return l && r;
        },
        "%": function (l, r) {
          return l % r === 0;
        },
      },
      result = operators[operator](operand_1, operand_2);

    if (result) return options.fn(this);
    else return options.inverse(this);
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
mongoose.set("strictQuery", false);
console.log("Trying to conenct to mongodb");
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(console.log);

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(session({
//   name: `daffyduck`,
//   secret: 'SDR',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: oneDay
//   }
// }));
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);

app.use("/", indexRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(" Connected " + PORT);
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
//   res.render('error',{navside:true});
// });

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error", { navside: true });
});

module.exports = app;
