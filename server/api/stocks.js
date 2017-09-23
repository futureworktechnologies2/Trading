var Stock = require('../models/stock');
var Category = require('../models/category');

// Stocks API
module.exports = function(apiRouter) {

    // get all stocks
    apiRouter.get('/stocks', function(req, res) {
        Stock.find({}, function(err, stocks) {
            if (err)
                res.send(err);
            res.json(stocks);
        });
    });

    // get all categories
    apiRouter.get('/getcategories', function(req, res) {
        Category.find({}, function(err, categories) {
            if (err)
                res.send(err);

            // console.log(categories);

            res.json(categories);
        });
    });

    



    // add a post
    apiRouter.post('/stocks', function(req, res) {
        console.log("adding stock from api..");
        console.log(req.body);
        var stock = new Stock();

        stock.title = req.body.title;
        stock.category = req.body.category;
console.log("check stock..");
console.log(stock);

        Stock.findOne({'title': req.body.title}, function(err, pst) {
           console.log(pst);
            if (pst) {
                if (!err && pst.title === req.body.title) {
                    res.send("Please make unique your stock! Its already exist!");
                }
                else 
                {
                    stock.save(function(err, stock) {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("You have successfully added stock");
                        }
                    })
                }
            } else {
                stock.save(function(err, stock) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("You have successfully added stock");
                    }
                })
            }
        });
    });

    // get a single post
    apiRouter.get('/stocks/:id', function(req, res) {
        Stock.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/parmalcat1', function(req, res) {
        console.log(" in the parmalcat..");
        // console.log(req.body.path);
        Stock.findById({'_id': req.body.path}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

//        

    // update a post
    apiRouter.post('/editstock', function(req, res) {
console.log("in the stock editstock");
        console.log(req.body);
        // return false;
        Stock.findById({'_id': req.body.id}, function(err, stock) {
            if (err)
                res.send(err);
            stock.title = req.body.title;
            stock.category = req.body.category;
            // stock.image = "asdf.png";//req.body.image;
            stock.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Stock updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/delete_stock', function(req, res) {
        Stock.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Stock deleted!'});
        })
    });
};