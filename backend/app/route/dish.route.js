module.exports = (app) => {

    const dish = require('../controller/dish.controller');

    
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

    
    app.post('/api/dish/upload/:id', upload.single('image'), (req, res) => {
        const image = req.file.buffer; // получаем буфер изображения
        const id = req.body.id; // получаем id записи, к которой нужно добавить изображение
      
        // сохраняем изображение в базу данных
        db.query('UPDATE dish SET image = ? WHERE id = ?', [image, id], (err, result) => {
          if (err) throw err;
          res.send('Image uploaded successfully');
        });
      });
};