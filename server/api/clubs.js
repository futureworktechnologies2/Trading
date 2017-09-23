var Club = require('../models/club');
var Category = require('../models/category');

// Clubs API
module.exports = function(apiRouter) {

    // get all clubs
    apiRouter.get('/clubs', function(req, res) {
        Club.find({}, function(err, clubs) {
            if (err)
                res.send(err);
            res.json(clubs);
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
    apiRouter.post('/clubs', function(req, res) {
        console.log("adding club from api..");
        console.log(req.body);
        var club = new Club();
        club.title = req.body.title;
console.log("check club..");
console.log(club);

        Club.findOne({'title': req.body.title}, function(err, pst) {
           console.log(pst);
            if (pst) {
                if (!err && pst.title === req.body.title) {
                    res.send("Please make unique your club! Its already exist!");
                }
                else 
                {
                    club.save(function(err, club) {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("You have successfully added club");
                        }
                    })
                }
            } else {
                club.save(function(err, club) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("You have successfully added club");
                    }
                })
            }
        });
    });

    // get a single post
    apiRouter.get('/clubs/:id', function(req, res) {
        Club.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/get_club', function(req, res) {
        console.log(" in the get_club..");
        console.log(req.body.id);
        Club.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

//        

    // update a post
    apiRouter.post('/editclub', function(req, res) {
console.log("in the club editclub");
        console.log(req.body);
        // return false;
        Club.findById({'_id': req.body.id}, function(err, club) {
            if (err)
                res.send(err);
            club.title = req.body.title;
            club.category = req.body.category;
            // club.image = "asdf.png";//req.body.image;
            club.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Club updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/delete_club', function(req, res) {
        Club.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Club deleted!'});
        })
    });
};