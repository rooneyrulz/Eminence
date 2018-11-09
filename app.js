const express = require("express");
const path = require("path");
const morgan = require("morgan");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const validator = require("express-validator");
const favicon = require("express-favicon");
const passport = require("passport");

const app = express();

//Require Database Connection
let DBConnection = require('./api/config/database');

//Morgan Middleware
app.use(morgan('dev'));

//Setup Express-Favicon Middleware
app.use(favicon(path.resolve(__dirname, 'public/icons/node.svg')));

//Setup Tamplate Engine
app.set('views', path.resolve(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

//Setup Public Folders
app.use(express.static(path.resolve(__dirname, 'node_modules')));
app.use(express.static(path.resolve(__dirname, 'public')));

//Express Body-Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Express Cookie-Parser Middleware
app.use(cookieParser());

//Express Session Middleware
app.use(session({
   secret: 'keybord cat',
   resave: true,
   saveUninitialized: true,
   cookie: { secure: false }
}));

//Express Flash Middleware
app.use(flash());

//Express Custom Messages Middleware
app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   next();
});

//Express Validator Middleware
app.use(validator({
   errorFormatter: (param, msg, value) => {
       var namespace = param.split('.'),
           root = namespace.shift(),
           formParam = root;

       while (namespace.length) {
           formParam += '[' + namespace.shift() + ']';
       }
       return {
           param: formParam,
           msg: msg,
           value: value
       };
   }
}));

//Require Passport
require('./api/config/passport')(passport);

//Express Passport Middlewares Initializing & Session
app.use(passport.initialize());
app.use(passport.session());

//Setup Local User
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//Route for Index
let indexRoute = require('./api/routes/index');
app.use('/home', indexRoute);

//Route for Register
let registerRoute = require('./api/routes/register');
app.use('/user', registerRoute);

//Route for Login Page
let loginRoute = require('./api/routes/login');
app.use('/user', loginRoute);

//Route for Getstarted
let getstartedRoute = require('./api/routes/getstarted');
app.use('/eminence', getstartedRoute);

//Route for About
let aboutRoute = require('./api/routes/about');
app.use('/about', aboutRoute);

//Setup a Port
app.set('port', ( process.env.PORT || 7000));

app.listen(app.get('port'), () => console.log(`server started on the port ${app.get('port')}!!`));