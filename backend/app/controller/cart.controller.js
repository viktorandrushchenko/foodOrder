var db = require('../config/db.config.js');
var Cart = db.cart;
var globalFunctions = require('../config/global.functions.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.findAll = (req, res) => {
    Cart.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req, res) => {
    Cart.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findByRestaurantUser = (req, res) => {
    Cart.findAll({
        where: {
            restaurant_id: req.params.restaurant_id,
            user_id: req.params.user_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.add = (req, res) => {
    Cart.findAll({
        where: {
            dish_id: req.body.dish_id,
            user_id: req.body.user_id
        }
    }).then(objects => {
        if (objects.length === 0){
            Cart.create({
                user_id: req.body.user_id,
                dish_id: req.body.dish_id,
                restaurant_id: req.body.restaurant_id,
                quantity: req.body.quantity,
            }).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            });
        }else{
            Cart.update({
                quantity: parseInt(req.body.quantity) + parseInt(objects[0].quantity),
                },
                {
                    where: {
                        id: objects[0].id
                    }
                }
            ).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        }
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
    
};

exports.sub = (req, res) => {
    Cart.findAll({
        where: {
            dish_id: req.body.dish_id,
            user_id: req.body.user_id
        }
    }).then(objects => {
        if (objects.length != 0){
            if (parseInt(objects[0].quantity) - parseInt(req.body.quantity) > 0) {       
            Cart.update({
                quantity: parseInt(objects[0].quantity) - parseInt(req.body.quantity),
                },
                {
                    where: {
                        id: objects[0].id
                    }
                }
            ).then(object => {
                globalFunctions.sendResult(res, object);
            }).catch(err => {
                globalFunctions.sendError(res, err);
            })
        }else{
            Cart.destroy({
                where: {
                    id: objects[0].id
                }
            }).then(() => {
                globalFunctions.sendResult(res, 'Запись удалена');
            }).catch(err => {
                globalFunctions.sendError(res, err);
            });
        }
    }
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
    
};