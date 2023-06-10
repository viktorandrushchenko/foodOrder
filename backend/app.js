var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js'); // подключение настроек базы данных

db.sequelize.sync({force: false});

app.listen(3000);

var user = require('./app/route/user.route.js');
user(app);

var restaurant = require('./app/route/restaurant.route.js');
restaurant(app);

var dish = require('./app/route/dish.route.js');
dish(app);

var auth = require('./app/route/auth.route.js');
auth(app);