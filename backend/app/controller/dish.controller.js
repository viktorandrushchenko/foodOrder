var db = require('../config/db.config.js');
var Dish = db.dish;
var globalFunctions = require('../config/global.functions.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.findAll = (req, res) => {
    Dish.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req, res) => {
    Dish.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление абитуриента
exports.create = (req, res) => {
    Dish.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        restaurant_id: req.body.restaurant_id,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    Dish.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        restaurant_id: req.body.restaurant_id,
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.delete = (req, res) => {
    Dish.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findByRestaurant = (req, res) => {
    Dish.findAll({
        where: {
            restaurant_id: req.params.restaurant_id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findByNameAndRestaurant = (req, res) => {
    Dish.findAll({
        where: {
            restaurant_id: req.params.restaurant_id,
            name: {
                [Op.like]: req.params.name + '%'
            }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};