const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDb = require('./config/db');
const routes = require('./routes/index');

//load config
dotenv.config({ path: './config/config.env' });

connectDb();

const PORT = process.env.PORT || 3000;

const app = express();

//Logging
if (process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
}

//Handlebars
const handlebars = exphbs.create({ extname: '.hbs' });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

//Routes
app.use('/', routes)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
