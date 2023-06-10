module.exports = (sequelize, Sequelize) => {
    var Order = sequelize.define(
        'order', // определяем имя таблицы
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
            restaurant_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            time_ordered: {
                type: Sequelize.DATE,
                allowNull: false
            },
            fulfilled: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
        });

    // Определяем связи таблицы university с другими таблицами
    Order.associate = (models) => {
        // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели direction): в файле direction.model.js
        Order.belongsTo(models.restaurant, {
            foreignKey: 'restaurant_id'
        }); 
        Order.belongsTo(models.user, {
            foreignKey: 'user_id'
        }); 
        Order.hasMany(models.order_items, {
            foreignKey: 'order_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Order;
};