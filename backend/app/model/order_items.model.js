module.exports = (sequelize, Sequelize) => {
    var Order_items = sequelize.define(
        'order_items', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER, // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            order_id: {
                type: Sequelize.INTEGER, // тип данных STRING (в MySQL — VARCHAR), длину указываем явно
                allowNull: false
            },
            dish_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        });

    // Определяем связи таблицы university с другими таблицами
    Order_items.associate = (models) => {
        // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели direction): в файле direction.model.js
        Order_items.belongsTo(models.order, {
            foreignKey: 'order_id'
        }); 
        Order_items.belongsTo(models.dish, {
            foreignKey: 'dish_id'
        }); 
    };
    return Order_items;
};