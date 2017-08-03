module.exports = function(sequelize, DataTypes) {
    let Burger = sequelize.define('Burger', {
        'name': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': {
                'len': [1,255]
            }
        },
        'description': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': {
                'len': [1, 255]
            }
        }
    });

    return Burger;
}
