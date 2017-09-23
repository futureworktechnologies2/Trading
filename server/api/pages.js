var Page = require('../models/page');

// Pages API
module.exports = function(apiRouter) {

    // get all pages
    apiRouter.get('/pages', function(req, res) {
        Page.find({}, function(err, pages) {
            if (err)
                res.send(err);
            res.json(pages);
        });
    });


    // add a post
    apiRouter.post('/pages', function(req, res) {
        console.log("adding page from api..");
        console.log(req.body);
        var page = new Page();

        page.title = req.body.title;
        page.slug = req.body.slug;
        page.description = req.body.description;
        // page.category = req.body.category;
console.log("check page..");
console.log(page);

        Page.findOne({'slug': req.body.slug}, function(err, pst) {
           console.log(pst);
            if (pst) {
                if (!err && pst.slug === req.body.slug) {
                    res.send("Please make unique your page slug! Its already exist!");
                }
                else 
                {
                    page.save(function(err, page) {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("You have successfully added page");
                        }
                    })
                }
            } else {
                page.save(function(err, page) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("You have successfully added page");
                    }
                })
            }
        });
    });

    // get a single post
    apiRouter.get('/pages/:id', function(req, res) {
        Page.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/get_page', function(req, res) {
        console.log(" in the page single..");
        // console.log(req.body.path);
        Page.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });
    // get a single post
    apiRouter.get('/get_page_app/:slug', function(req, res) {
        console.log(" in the page single..");
        // console.log(req.body.path);
        // Page.findById({'_id': req.body.id}, function(err, user) {
        Page.findOne({'slug': req.params.slug}, function(err, page) {
            if (err)
                res.send(err);

            res.json(page);
        });
    });

//        

    // update a post
    apiRouter.post('/editpage', function(req, res) {
console.log("in the page editpage");
        console.log(req.body);
        // return false;
        Page.findById({'_id': req.body.id}, function(err, page) {
            if (err)
                res.send(err);
            page.title = req.body.title;
            page.category = req.body.category;
            // page.image = "asdf.png";//req.body.image;
            page.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Page updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/delete_page', function(req, res) {
        Page.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Page deleted!'});
        })
    });
};