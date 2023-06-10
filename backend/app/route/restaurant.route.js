module.exports = (app) => {

    const restaurant = require('../controller/restaurant.controller');
    
    // Получение всех пользователей
    app.get('/api/restaurants', restaurant.findAll);

    app.get('/api/restaurant/:id', restaurant.findById);

    app.post('/api/addRestaurant', restaurant.create);

    app.post('/api/updateRestaurant', restaurant.update);

    app.post('/api/deleteRestaurant', restaurant.delete);
};