module.exports = (sequelize, Sequelize) => {
    var Dish = sequelize.define(
        'dish', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER, // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(30), // тип данных STRING (в MySQL — VARCHAR), длину указываем явно
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            price: {
                type: Sequelize.Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            restaurant_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        });

    // Определяем связи таблицы university с другими таблицами
    Dish.associate = (models) => {
        // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели direction): в файле direction.model.js
        Dish.belongsTo(models.restaurant, {
            foreignKey: 'restaurant_id'
        });
        Dish.hasMany(models.cart, {
            foreignKey: 'dish_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Dish;
};