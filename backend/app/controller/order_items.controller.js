var db = require('../config/db.config.js');
var Order = db.order;
var Cart = db.cart;
var Order_items = db.order_items;
var globalFunctions = require('../config/global.functions.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    Order_items.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req, res) => {
    Order_items.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findByOrder = (req, res) => {
    Order_items.findAll({
        where: {
            order_id: req.params.order_id,
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};