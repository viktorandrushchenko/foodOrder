module.exports = (app) => {

    const dish = require('../controller/dish.controller');
    var db = require('../config/db.config.js');
    
    const multer = require('multer');
    const upload = multer({ dest: 'uploads/' });

    
    // Получение всех пользователей
    app.get('/api/dishes', dish.findAll);

    app.get('/api/dish/:id', dish.findById);

    app.post('/api/addDish', dish.create);

    app.post('/api/updateDish/:id', dish.update);

    app.post('/api/deleteDish/:id', dish.delete);
    
    app.get('/api/dish/restaurant_id/:restaurant_id', dish.findByRestaurant);
    
    app.get('/api/dish/name_restaurant_id/:restaurant_id/:name', dish.findByNameAndRestaurant);

    app.post('/api/dish/upload/:id', dish.upload);
    
    app.get('/api/dish/image/:id', dish.getImage);
};