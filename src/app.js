require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./auth/auth');
const errorHandler = require('./error/error');
const corsOptions = require('./cors/cors');

const { NODE_ENV } = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.send('Ready to rock and roll!');
});

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors(corsOptions));
app.use(helmet());

app.use(auth);

app.use(errorHandler);
  

module.exports = app;
