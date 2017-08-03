module.exports = function(sequelize, DataTypes) {
    let Order = sequelize.define('Order', {
        'devoured': {
            'type': DataTypes.BOOLEAN,
            'defaultValue': false,
        }
    });

    Order.associate = function(models) {
        Order.belongsTo(models.Burger, {
            'foreignKey': {
                'allowNull': false
            },
            'onDelete': "cascade"
        });
    }

    return Order;
}
