var express = require('express'),
        path = require('path'),
        User = require('./models/user'),
        Post = require('./models/post'),
        Page = require('./models/page'),
        Portfolio = require('./models/portfolio'),
        Category = require('./models/category'),
        Stock = require('./models/stock'),
        Order = require('./models/order'),
        Position = require('./models/position'),
        Clucb = require('./models/club'),
        Inventory = require('./models/inventory'),
        Player = require('./models/player'),
        // bcrypt = require('bcrypt-nodejs'),
        rootPath = path.normalize(__dirname + '/../'),
        apiRouter = express.Router(),
        sm = require('sitemap'),
        router = express.Router();

// var app1 = express();

// app1.get('/', function(req, res) {
//     res.send('It works');
// });
// app1.listen(3000);
// console.log('Listening on port 3000');


// Routes
// router.get('/products', function(req, res) {
//    res.send('api works!');
// });

module.exports = function(app, passport) {
    app.use('/api', apiRouter);
    app.use('/', router);
    // API routes
    require('./api/posts')(apiRouter);
    require('./api/pages')(apiRouter);
    require('./api/users')(apiRouter, passport);
    require('./api/portfolios')(apiRouter);
    require('./api/categories')(apiRouter);
    require('./api/stocks')(apiRouter);
    require('./api/clubs')(apiRouter);
    require('./api/positions')(apiRouter);
    require('./api/players')(apiRouter);
    require('./api/orders')(apiRouter);
    require('./api/inventories')(apiRouter);
    require('./api/api')(apiRouter);

// Routes
// app.use('/api', require('./server/api'));




    // home route
    router.get('/', function(req, res) {
        if (req.isAuthenticated()) {
            console.log(req.user);
            res.render('home/index',{user: req.user});
        } else {
            console.log('You are not an admin');
            res.render('home/index',{user:''});
        }
        
    });
        router.get('/home/myprofile', function(req, res) {
        if (req.isAuthenticated()) {
            res.render('home/home',{user: req.user});
        } else {
            console.log('You are not an admin');
            res.render('home/home',{user:''});
        }       
    });
    // admin route
    router.get('/admin', function(req, res) {
        res.render('admin/login');
    });
//    router.get('/admin/register', function(req, res) {
//        res.render('admin/register');
//    });
    router.get('/admin/dashboard', isAdmin, function(req, res) {
        //  console.log(req.user);
        res.render('admin/dashboard', {user: req.user});
    });
//    router.get('/home',isLogin, function(req, res) {
//        if(req.user){
//            res.render('index', {user: req.user});
//        }else {
//           res.render('index'); 
//        }
//    });

  
    router.get('/admin/users', isAdmin, function(req, res) {
        res.render('admin/users', {user: req.user});
    });
    router.get('/logout', function(request, response) {
        request.logout();
        response.redirect('/admin');
    });
    router.get('/home/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });
    router.get('/admin/register', function(req, res) {
        res.render('admin/register');
    });

    router.post('/register', function(req, res) {

        // passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
        User.register(new User({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err);
                return;
            }
            // log the user in after it is created
            passport.authenticate('local')(req, res, function() {
                console.log('authenticated by passport');
                res.redirect('/admin/dashboard');
            });
        });
    });
    router.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/admin/dashboard');
    });
    ///sitemap
    router.get('/sitemap.xml', function(req, res) {
        Post.find({}, 'paramal', function(err, mongourls)
        {
            //console.log(mongourls);
            var pageUrls = [];
            if (mongourls) {
                for (var i = 0; i < 2; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};

                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://futureworktechnologies.com',
                cacheTime: 600000, // 600 sec - cache purge period 
                urls: pageUrls
            });
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return res.status(500).end();
                }
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        });
    });

    router.get('/sitemap1.xml', function(req, res) {
        Post.find({}, 'paramal', function(err, mongourls)
        {
            //console.log(mongourls);
            var pageUrls = [];
            if (mongourls) {
                for (var i = 0; i < mongourls.length; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};

                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://futureworktechnologies.com',
                cacheTime: 600000, // 600 sec - cache purge period 
                urls: pageUrls
            });
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return res.status(500).end();
                }
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        });
    });

    router.get('/about', function(req, res) {
        res.render('home/about');
    });

    router.get('/contact', function(req, res) {
        res.render('home/contact');
    });

    router.get('/blog', function(req, res) {
        res.render('home/blog');
    });
    router.get('/clients', function(req, res) {
        res.render('home/clients');
    });

    router.get('/careers', function(req, res) {
        res.render('home/careers');
    });

    router.get('/howwework', function(req, res) {
        res.render('home/howwework');
    });

    router.get('/clients', function(req, res) {
        res.render('home/clients');
    });

    router.get('/testimonials', function(req, res) {
        res.render('home/testimonials');
    });

    router.get('/visionandmission', function(req, res) {
        res.render('home/visionandmission');
    });

    router.get('/whyfutureworktechnologies', function(req, res) {
        res.render('home/whyfutureworktechnologies');
    });

    router.get('/privacypolicy', function(req, res) {
        res.render('home/privacypolicy');
    });
    router.get('/termandconditions', function(req, res) {
        res.render('home/termandconditions');
    });
//    router.get('/pages/*', function(req, res) {
//        res.render('home/pages');
//    });

//    router.get('/admin/dashboard', isAdmin, function(req, res) {
//        res.render('admin/dashboard', {user: req.user});
//    });
    router.get('/404', function(req, res) {
        res.render('404');
    });
    router.get('/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[1]}, function(err, post) {
                if (post) {
                    // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl = 'https://test.com/' + post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    app.use(function(req, res, next) {
        res.status(404);
        res.render('404');
        return;
    });
};
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.email === 'admin@gmail.com') {
        console.log('admin here');
        next();
    } else {
        console.log('You are not an admin');
        res.redirect('/admin');
    }
}
function isLogin(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('user here');
        next();
    } else {
        console.log('You are not an admin');
        res.render('/');
    }
}