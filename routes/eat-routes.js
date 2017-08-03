let db = require('../models');

module.exports = function(app) {

    // get all burgers from your order - both devoured and notDevoured
    app.get('/eat', (req, res) => {
        // first findAll gets all burgers from order that are NOT devoured
        db.Order.findAll({
            'where': {
                'devoured': 0
            },
            // include the Burger model that is associated with each order
            'include': [ db.Burger ]
        }).then(notDevoured => {
            // second findAll gets all burgers from order that ARE devoured
            db.Order.findAll({
                'where': {
                    'devoured': 1,
                },
                'include': [ db.Burger ]
            }).then(devoured => res.render('eat', { notDevoured, devoured }));
        });
    });

    // update a burger from your order (devour a burger)
    app.put('/eat/:orderId?', (req, res) => {
        let orderId = req.params.orderId;

        db.Order.update({
            'devoured': 1
        }, {
            'where': {
                'id': orderId
            }
        }).then(updates => {
            res.redirect('/eat');
        });
    });
}
