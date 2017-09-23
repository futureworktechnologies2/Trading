var Position = require('../models/position');
var Category = require('../models/category');

// Positions API
module.exports = function(apiRouter) {

    // get all positions
    apiRouter.get('/positions', function(req, res) {
        Position.find({}, function(err, positions) {
            if (err)
                res.send(err);
            res.json(positions);
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
    apiRouter.post('/positions', function(req, res) {
        console.log("adding position from api..");
        console.log(req.body);
        var position = new Position();

        position.title = req.body.title;
        // position.category = req.body.category;
console.log("check position..");
console.log(position);

        Position.findOne({'title': req.body.title}, function(err, pst) {
           console.log(pst);
            if (pst) {
                if (!err && pst.title === req.body.title) {
                    res.send("Please make unique your position! Its already exist!");
                }
                else 
                {
                    position.save(function(err, position) {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("You have successfully added position");
                        }
                    })
                }
            } else {
                position.save(function(err, position) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("You have successfully added position");
                    }
                })
            }
        });
    });

    // get a single post
    apiRouter.get('/positions/:id', function(req, res) {
        Position.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/get_position', function(req, res) {
        console.log(" in the position single..");
        // console.log(req.body.path);
        Position.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

//        

    // update a post
    apiRouter.post('/editposition', function(req, res) {
console.log("in the position editposition");
        console.log(req.body);
        // return false;
        Position.findById({'_id': req.body.id}, function(err, position) {
            if (err)
                res.send(err);
            position.title = req.body.title;
            position.category = req.body.category;
            // position.image = "asdf.png";//req.body.image;
            position.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Position updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/delete_position', function(req, res) {
        Position.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Position deleted!'});
        })
    });
};