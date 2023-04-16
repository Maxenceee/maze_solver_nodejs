var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var Visitors = require('./resources/scripts/visitors');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 *  IP logs
 */

const normalize = function(a) {
	if (a < 10)
		return ("0".concat(a));
	return (a);
}

morgan.token('ip', (req, res) => {
    return (req.get('x-forwarded-for') || '').split(',')[0] || req.socket.remoteAddress;
});

morgan.token('current_time', (req, res) => {
    let t = new Date();
    return "\t"+t.getFullYear()+"-"+normalize(t.getMonth()+1)+"-"+normalize(t.getDate())+" "+normalize(t.getHours())+":"+normalize(t.getMinutes())+":"+normalize(t.getSeconds())
});

morgan.token('server_instance', (req, res) => {
    return "\tOAuth/API"
});

morgan.token('methode', (req, res) => {
    return "\t"+req.method
});

morgan.token('requested_path', (req, res) => {
    return "\t"+req.originalUrl
});

let vi = Visitors.getVisitorsInstance();

app.use(morgan(':ip :current_time :server_instance :methode :requested_path', {stream: vi.accesLogStream}));


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404', {title: "Page introuvable"})
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

module.exports = app;
