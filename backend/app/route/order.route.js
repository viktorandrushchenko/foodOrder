module.exports = (app) => {

    const order = require('../controller/order.controller');
    
    // Получение всех пользователей
    app.post('/api/openCart/:user_id/:restaurant_id', order.open);
};