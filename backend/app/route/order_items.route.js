module.exports = (app) => {

    const order_items = require('../controller/order_items.controller');
    
    // Получение всех пользователей
    
    app.get('/api/orders_items', order_items.findAll);
    
    app.get('/api/order_item/:id', order_items.findById);

    app.get('/api/order_item/order_id/:order_id', order_items.findByOrder);
};