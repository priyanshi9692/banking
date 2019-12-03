var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var dashboardRouter=require('./routes/dashboard');
var adminDashboardRouter = require('./routes/admin_dashboard')
var transactionRouter=require('./routes/transaction');
var session = require('client-sessions');
var accountRouter = require('./routes/accounts');
var adminDelete = require('./routes/admin_delacct')

var app = express();
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup',signupRouter);
app.use('/login',signinRouter);
app.use('/', dashboardRouter);
app.use('/admin', adminDashboardRouter);
app.use('/del', adminDelete);


//Transaction related apis
app.use('/', transactionRouter);

app.use(accountRouter);
const port = 5000;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
