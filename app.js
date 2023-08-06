const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs=require('express-handlebars')
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const { default: mongoose } = require('mongoose');
const upload = require('./utils/multer')
const cloudinary = require('./utils/cloudinary')
const Handlebars = require("handlebars");
const app = express();
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layout/',
  partialsDir: __dirname + '/views/partials'
}))


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
Handlebars.registerHelper("inc", (value) => {
  return parseInt(value) + 1;
});

console.log('Trying to conenct to mongodb');
mongoose.connect(process.env.MONGO_DB ?? 'mongodb://127.0.0.1:27017/GFI').then(() => {
  console.log('Connected to mongodb');
})
  .catch(console.log);

  mongoose.set('strictQuery', false);
  const PORT = (process.env.PORT || '3000');
  app.listen(PORT,()=>{
    console.log(" Connected " + PORT)
  })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
