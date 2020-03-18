var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');

const router = express.Router();

app = express();
//Cargar rutas
var appRoutes = require('./routes/approutes');
app.use(cookieParser());
app.use(session({secret: 'keyboard cat',resave: true,saveUninitialized: true}))
app.use(cors({origin: 'http://localhost:4300'}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', appRoutes);



module.exports = app;