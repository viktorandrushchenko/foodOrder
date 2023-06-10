module.exports = (app) => {

    const dish = require('../controller/dish.controller');
    
    // Получение всех пользователей
    app.get('/api/dishes', dish.findAll);

    app.get('/api/dish/:id', dish.findById);

    app.post('/api/addDish', dish.create);

    app.post('/api/updateDish/:id', dish.update);

    app.post('/api/deleteDish/:id', dish.delete);
    
    app.get('/api/dish/restaurant_id/:restaurant_id', dish.findByRestaurant);
};