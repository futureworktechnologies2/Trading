// Dependencies
var express = require('express');
var router = express.Router();
console.log("yes I am in the api..");

/*// Routes
router.get('/products', function(req, res) {
   res.send('api works!');
});

// Return router
module.exports = router;*/

// var Category = require('../models/api');
// Models
var Product = require('../models/product');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');

// Return router
module.exports = router;

// Categorys API
module.exports = function(apiRouter) {

    // get all categories
    apiRouter.get('/products', function(req, res) {

console.log(req.body );
// console.log(JSON.stringify(req) );
// res.send(res.json(req));
// console.log('hello');
return false;


        // res.send(res.json(req) );
        // res.send('api works!');
        // Category.find({}, function(err, categories) {
        //     if (err)
        //         res.send(err);
        //     res.json(categories);
        // });
    });
};