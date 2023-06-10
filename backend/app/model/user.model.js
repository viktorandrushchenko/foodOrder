module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user', // определяем имя таблицы
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
            email: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            role: {
                type: Sequelize.ENUM,
                values: ['Пользователь', 'Администратор'],
                allowNull: false
            },
        });

    // Определяем связи таблицы university с другими таблицами
    User.associate = (models) => {
        // Определение связи один-ко-многим с таблицей direction. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны модели direction): в файле direction.model.js
        User.hasMany(models.order, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
        User.hasMany(models.cart, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };

    User.findAll()
        .then(objects => {
            if (objects.length === 0){
                User.create({
                    name: 'admin',
                    email: 'admin',
                    password: "$2a$10$XmJkVaW14XTUG7CtSMjh/eBChTaaSKr/5sFXqISgpbRNmm2XcM1U6",
                    role: 2
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
    return User;
};