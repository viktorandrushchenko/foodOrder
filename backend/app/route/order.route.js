module.exports = (app) => {

    const order = require('../controller/order.controller');
    
    // Получение всех пользователей
    app.post('/api/openCart/:user_id/:restaurant_id', order.open);
    
    app.get('/api/Orders', order.findAll);
    
    app.get('/api/order/:id', order.findById);

    app.get('/api/order/user_id/:user_id', order.findByUser);
    
    app.get('/api/order/restaurant_id/:restaurant_id', order.findByRestaurant);
};