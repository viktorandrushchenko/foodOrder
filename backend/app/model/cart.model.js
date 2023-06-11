module.exports = (sequelize, Sequelize) => {
    var Cart = sequelize.define(
        'cart', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER, // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            user_id: {
                type: Sequelize.INTEGER, // тип данных STRING (в MySQL — VARCHAR), длину указываем явно
                allowNull: false
            },
            dish_id: {
                type: Sequelize.INTEGER, // тип данных STRING (в MySQL — VARCHAR), длину указываем явно
                allowNull: false
            },
            restaurant_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        });

    // Определяем связи таблицы university с другими таблицами
    Cart.associate = (models) => {
        // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели direction): в файле direction.model.js
        Cart.belongsTo(models.restaurant, {
            foreignKey: 'restaurant_id'
        });
        Cart.belongsTo(models.dish, {
            foreignKey: 'dish_id'
        });
        Cart.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    };
    return Cart;
};