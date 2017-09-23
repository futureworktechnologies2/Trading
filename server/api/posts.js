var Post = require('../models/post');

// Posts API
module.exports = function(apiRouter) {

    // get all posts
    apiRouter.get('/posts', function(req, res) {
        Post.find({}, function(err, posts) {
            if (err)
                res.send(err);

            res.json(posts);
        });
    });



    // add a post
    apiRouter.post('/posts', function(req, res) {
        console.log("adding post from api..");
        // console.log(req.body);
        var post = new Post();
        post.title = req.body.title;
        post.description = req.body.description;
        post.category = req.body.category;
        post.image = "asdf.png";
        post.paramal = req.body.paramal;
        post.metadescription = req.body.metadescription;
        post.metakeywords = req.body.metakeywords;
        Post.findOne({'paramal': req.body.paramal}, function(err, pst) {
           // console.log(pst)
            if (pst) {
                if (!err && pst.paramal === req.body.paramal) {
                    res.send("Please make unique your permalink! Its already exist!");
                } else {
                    post.save(function(err, post) {
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("You have successfully added post");
                        }
                    })
                }
            } else {
                post.save(function(err, post) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("You have successfully added post");
                    }
                })
            }
        });
    });

    // get a single post
    apiRouter.get('/posts/:id', function(req, res) {
        Post.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/parmal', function(req, res) {

console.log("get single post data");
return false;


        Post.findOne({'paramal': req.body.path}, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/parmalcatAAAAAAA', function(req, res) {

console.log("get single post data");
return false;


        Post.findOne({'paramal': req.body.path}, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
//        

    // update a post
    apiRouter.post('/editparmal', function(req, res) {
console.log("in the post editparmal");
        //console.log(req.body);
        Post.findById({'_id': req.body.id}, function(err, post) {
            if (err)
                res.send(err);            
            post.title = req.body.title;
            post.description = req.body.description;
            post.image = "asdf.png";//req.body.image;
            post.paramal = req.body.paramal;
            post.metadescription = req.body.metadescription;
            post.metakeywords = req.body.metakeywords;    
            post.category = req.body.category;            
            post.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Post updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/delete', function(req, res) {

console.log("deleting the category from post api..");

        Post.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Post deleted!'});
        })
    });
};