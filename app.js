const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const graphqlHttp = require('express-graphql');
const { buildSchema} = require('graphql')
require('dotenv').config();

import schema from "./graphql/schema"

const auth = require('./routes/auth');
const offer = require('./routes/offer');

mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
  })
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch(error => {
    console.error(error);
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.PUBLIC_DOMAIN],
  }),
);
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//creamos los modelos de las queris que vamos a generar, query es la busqueda y mutation el crud, 
// le decimos que enviamos y que va a devolver, en el caso de rootmutation devuelve el tring que le enviamos
app.use('/graphql', graphqlHttp({
  graphiql:true,
  schema:schema      
})
);
// app.use('/auth', auth);
// app.use('/offer', offer);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || '500';
    res.status(statusError).json(err);
  }
});

module.exports = app;
