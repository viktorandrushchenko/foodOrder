var db = require('../config/db.config.js');
var Order = db.order;
var Cart = db.cart;
var Order_items = db.order_items;
var globalFunctions = require('../config/global.functions.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.open = (req, res) => {
    Order.create({
        user_id: req.params.user_id,
        restaurant_id: req.params.restaurant_id,
        time_ordered: Date.now(),
        fulfilled: false,
    }).then(object => {
        var a=object.id;
        Cart.findAll({
            where: {
                user_id: req.params.user_id,
                restaurant_id: req.params.restaurant_id,
            }
        }).then(objects => {
            for (var i=0;i<objects.length; i++) {
                console.log("s");
                Order_items.create({
                    order_id: a,
                    dish_id: objects[i].dish_id,
                    quantity: objects[i].quantity,
                }).then(object => {
                }).catch(err => {
                    globalFunctions.sendError(res, err);
                })
                Cart.destroy({
                    where: {
                        id: objects[i].id,
                    }
                }).then(object => {
                }).catch(err => {
                    globalFunctions.sendError(res, err);
                }) 
            }
            globalFunctions.sendResult(res, object);
        });
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findAll = (req, res) => {
    Order.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req, res) => {
    Order.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findByUser = (req, res) => {
    Order.findAll({
        where: {
            user_id: req.params.user_id,
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findByRestaurant = (req, res) => {
    Order.findAll({
        where: {
            restaurant_id: req.params.restaurant_id,
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};