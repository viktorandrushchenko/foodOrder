var db = require('../config/db.config.js');
var User = db.user;
// регистрация пользователя с предварительной проверкой существования логина
exports.checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Пользователь с данным логином существует"
            });
            return;
        }
        // если пользователя с переданным логином не существует, то переходим к следующему этапу регистрации
        next();
    });
};