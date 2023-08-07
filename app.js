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
const session =require('express-session')

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

// app.use((req, res, next) => {
//   res.set(
//     "Cache-Control",
//     "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
//   );
//   next();
// });

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({  
  name: `daffyduck`,
  secret: 'SDR',  
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // This will only work if you have https enabled!
    maxAge: oneDay  // 1 min
  } 
}));
app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
Handlebars.registerHelper("inc", (value) => {
  return parseInt(value) + 1;
});
Handlebars.registerHelper( "when",function(operand_1, operator, operand_2, options) {
  var operators = {
   'eq': function(l,r) { return l == r; },
   'noteq': function(l,r) { return l != r; },
   'gt': function(l,r) { return Number(l) > Number(r); },
   'or': function(l,r) { return l || r; },
   'and': function(l,r) { return l && r; },
   '%': function(l,r) { return (l % r) === 0; }
  }
  , result = operators[operator](operand_1,operand_2);

  if (result) return options.fn(this);
  else  return options.inverse(this);
});

app.use(
  session({
    secret: 'key', // Replace with a random secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
    maxAge:'one day'
    // Set secure to true if using HTTPS
  })
);
console.log('Trying to conenct to mongodb');
mongoose.connect('mongodb://127.0.0.1:27017/GFI').then(() => {
  console.log('Connected to mongodb');
})
  .catch(console.log);
  // process.env.MONGO_DB ??
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
  // res.render('error');
  res.render('error',{navside:true});
});


module.exports = app;
