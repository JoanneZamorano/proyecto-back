const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
require('./src/utils/auth/index');
const session = require('express-session');
//CLOUDINARY
const cloudinary = require("cloudinary").v2;
const postsRoutes = require('./src/api/posts/posts.routes');
const MongoStore = require('connect-mongo');
const mainRoutes = require('./src/api/main/main.routes');
const userRoutes = require('./src/api/users/user.routes');
const db = require('./src/utils/database/db');
dotenv.config();
db.connect();
//CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT;

const app = express();
// console.log(process.env.CLOUDINARY_API_KEY)



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE"); // permitimos las siguientes operaciones en el servidor
  res.header("Access-Control-Allow-Credentials", "true"); //permitimos que haya credenciales en nuestras peticiones
  res.header("Access-Control-Allow-Headers", "Content-Type"); //definimos el tipo de cabecera que vamos a permitir
  next();
});

app.use(cors({ origin:"http://localhost:3000", credentials: true }))

app.use(session({
  secret: 'ASD12sasdjkq!woiej213_SAd!asdljiasjd',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 120 * 60 * 1000,
  },
  store: MongoStore.create({ mongoUrl: db.DB_URL })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainRoutes);
app.use('/users', userRoutes);

app.use('/post', postsRoutes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});