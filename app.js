const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const connectDb = require('./config/db');
const routes = require('./routes/index');
const auth = require('./routes/auth');
const passport = require('passport');
const session = require('express-session');

//Load config
dotenv.config({ path: './config/config.env' });

connectDb();

const PORT = process.env.PORT || 3000;

const app = express();

//Logging
if (process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
}

//Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

//Passport config
require('./config/passport')(passport);
app.use(passport.initialize())
app.use(passport.session())

//Handlebars
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

//Static folders
app.use(express.static(path.join(__dirname + '/public')))

//Routes
app.use('/', routes)
app.use('/auth', auth)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
