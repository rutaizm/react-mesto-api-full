const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const NotFound = require('./utils/NotFound');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const routesUsers = require('./routes/users');
const routesCard = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { validationSignUp, validationSignIn } = require('./middlewares/validation');
const { allowedCors } = require('./utils/allowedCors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors(allowedCors));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validationSignIn, login);
app.post('/signup', validationSignUp, createUser);

app.use(auth);

app.use('/users', routesUsers);
app.use('/cards', routesCard);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
