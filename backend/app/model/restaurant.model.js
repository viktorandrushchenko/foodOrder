module.exports = (sequelize, Sequelize) => {
    var Restaurant = sequelize.define(
        'restaurant', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER, // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(60), // тип данных STRING (в MySQL — VARCHAR), длину указываем явно
                allowNull: false
            },
            adress: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            cuisine: {
                type: Sequelize.STRING(60),
                allowNull: false
            },
        });

    // Определяем связи таблицы university с другими таблицами
    Restaurant.associate = (models) => {
        // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели direction): в файле direction.model.js
        Restaurant.hasMany(models.cart, {
            foreignKey: 'restaurant_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
        Restaurant.hasMany(models.order, {
            foreignKey: 'restaurant_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
        
        Restaurant.hasMany(models.dish, {
            foreignKey: 'restaurant_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Restaurant;
};