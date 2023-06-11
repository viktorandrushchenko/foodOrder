module.exports = (app) => {

    const cart = require('../controller/cart.controller');
    
    // Получение всех пользователей
    app.get('/api/carts', cart.findAll);

    app.get('/api/cart/:id', cart.findById);

    app.get('/api/cart/RestaurantUser/:user_id/:restaurant_id', cart.findByRestaurantUser);
    
    app.post('/api/addCart', cart.add);
    
    app.post('/api/subCart', cart.sub);

};