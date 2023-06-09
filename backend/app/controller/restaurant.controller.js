var db = require('../config/db.config.js');
var Restaurant = db.restaurant;
var globalFunctions = require('../config/global.functions.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    Restaurant.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req, res) => {
    Restaurant.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление абитуриента
exports.create = (req, res) => {
    Restaurant.create({
        name: req.body.name,
        adress: req.body.adress,
        cuisine: req.body.cuisine,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    Restaurant.update({
        name: req.body.name,
        adress: req.body.adress,
        cuisine: req.body.cuisine,
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
    Restaurant.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findByName = (req, res) => {
    Restaurant.findAll({
        where: {
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

exports.findByCuisine = (req, res) => {
    Restaurant.findAll({
        where: {
            cuisine: {
                [Op.like]: req.params.cuisine + '%'
            }
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};