const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const NotFound = require('./utils/NotFound');
const { errorHandler } = require('./middlewares/errorHandler');

const routesUsers = require('./routes/users');
const routesCard = require('./routes/cards');
const { login, createUser, logout } = require('./controllers/users');
const { validationSignUp, validationSignIn } = require('./middlewares/validation');
// const { allowedCors } = require('./utils/allowedCors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'http://rutaizm15.nomoredomains.sbs/',
    'https://rutaizm15.nomoredomains.sbs/',
    'http://api.rutaizm15.nomoredomains.sbs/',
    'https://api.rutaizm15.nomoredomains.sbs/',
    'https://locahost:3000',
    'http://locahost:3000',
  ],
  credentials: true,
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validationSignIn, login);
app.post('/signup', validationSignUp, createUser);
app.get('/signout', logout);

app.use(auth);

app.use('/users', routesUsers);
app.use('/cards', routesCard);

app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
