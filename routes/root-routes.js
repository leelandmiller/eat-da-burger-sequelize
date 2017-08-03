let db = require('../models');

module.exports = function(app) {
    // gets all da burgers on the menu
    app.get('/', (req, res) => {
        db.Burger.findAll().then(burgers => {
            db.Order.findAll({
                'where': {
                    'devoured': 0
                },
                'include': [ db.Burger ]
            }).then(orders => {
                res.render('index', { burgers, orders });
            });
        });
    });

    // posts a new burger to orders
    app.post('/order/:burgerId', (req, res) => {
        db.Order.create({
            'devoured': 0,
            'BurgerId': req.params.burgerId
        }).then(() => res.redirect('/'));
    });

    // posts a new burger to the menu
    app.post('/new', (req, res) => {
        db.Burger.create(req.body).then(() => res.redirect('/'));
    });

    // removes a burger from the menu - OR - removes a burger from the order
    app.delete('/:table/:id', function(req, res) {
        let table = req.params.table;

        if (table === 'orders') {
            db.Order.destroy({
                'where': {
                    'id': req.params.id
                }
            }).then(() => res.redirect('/eat'));
        } else if (table === 'burgers') {
            db.Burger.destroy({
                'where': {
                    'id': req.params.id
                }
            }).then(() => res.redirect('/'));
        }
    });
}
