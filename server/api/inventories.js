var Inventory = require('../models/inventory');
var Stock = require('../models/stock');
var Category = require('../models/category');
var Player = require('../models/player');
var Order = require('../models/order');
var ObjectId = require('mongodb').ObjectID;

// Inventorys API
module.exports = function(apiRouter) {

    // get all inventories
    apiRouter.get('/inventories', function(req, res) {
        console.log("get inventories..");
        Inventory.aggregate(
        [
            { 
             "$lookup":
             {
                "localField": "user_id",
                "from": "users",
                "foreignField": "_id",
                "as": "user_info"
             }
             },
                {
                    $unwind: "$user_info"
                },
            {    
             "$lookup": 
             {
                "localField": "player_id",
                "from": "players",
                "foreignField": "_id",
                "as": "player_info"
             }
            },
            {
                    $unwind: "$player_info"
                
            }
        ]
            , function(err, inventories) {
            if (err)
                res.send(err);
            console.log("yes get inventories..");
            console.log(inventories);
            res.json(inventories);
        });


        // Inventory.find({}, function(err, inventories) {
        //     if (err)
        //         res.send(err);
        //     console.log(inventories);
        //     res.json(inventories);
        // });

    });
    

    // get all categories
    apiRouter.get('/getplayers', function(req, res) {
        // Player.find({}, function(err, players) {
        Player.aggregate([ { $project : { title : 1 } } ], function(err, players) {
            if (err)
            {                
                res.send(err);
                // console.log(err);
            }

        // Inventory.aggregate([ { $project : { player_id : 1 } } ], function(err, inventory_players) {
        //     if (err)
        //     {
        //         // res.send(err);
        //         console.log(err);
        //     }

        //     console.log(players);
        //     console.log(inventory_players);
        //     console.log(inventory_players[0]);
        //     var i = 0;
        //     for (let player_item of players)
        //     {
        //         for (let inventory_item of inventory_players)
        //         {
        //             if(item._id != inventory_players[i++].player_id)
        //             {
        //                 console.log(item._id + ", " + item.title);
        //             }

        //         }

        //     }
        //     // console.log(players);
        //     // res.json(players);
        // });

            // console.log(players);
            res.json(players);
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
    // get all categories
    apiRouter.get('/getstocks', function(req, res) {
        Stock.find({}, function(err, stocks) {
            if (err)
                res.send(err);
            // console.log(stocks);
            res.json(stocks);
        });
    });    

    apiRouter.get('/get_user_portfolio_app/:id', function(req, res) {
        console.log(req.params.id);
        Inventory.aggregate(
        [

            {    
             "$lookup": 
             {
                "localField": "player_id",
                "from": "players",
                "foreignField": "_id",
                "as": "player_info"
             }
            },
            {
                    $unwind: "$player_info"
                
            },
            {
                "$match" : { 'user_id' : ObjectId(req.params.id) }
            }
        ]
            , function(err, inventories) {
            if (err)
                res.send(err);
            console.log("yes get inventories..");
            // console.log(inventories);
            // res.json(inventories);
            res.json({'message' : "Inventries List", 'status' : true, 'base_url_img' : "http://localhost:3000/admin/uploads/players/", 'data' : inventories});
        });        
        });

        // add a post
        apiRouter.post('/inventories', function(req, res) {
            console.log("adding inventory from api..");
            console.log(req.body);
            var inventory = new Inventory();
            var order = new Order();
            // var ObjectId = mongoose.Types.ObjectId;
            // Auth.getCurrentUser();
            // console.log("get getCurrentUser..");
            // console.log($scope.getCurrentUser._id);
            console.log("yes checking user id..");
            console.log("api inventories..");
            // console.log(req.body);

            // inventory.user_id =  "59957fbc64157305a8b426dd";
            inventory.user_id = req.body.user_id;
            inventory.player_id = req.body.player_id;
            inventory.quantity = req.body.quantity;
            // inventory.buy = req.body.buy;
            // inventory.sell = req.body.sell;
            console.log("check inventory..");
            console.log(inventory);



            order.user_id = req.body.user_id;
            order.player_id = req.body.player_id;
            order.quantity = req.body.quantity;
            order.price = 10;
            order.side = "SELL";
            order.sort_order = 100000;
            order.role = "admin";

            // console.log(inventory.image);


        // Inventory.findOne({'stock_id': req.body.stock_id}, function(err, pst) {
           // console.log(pst);
           //  if (pst) {
           //      if (!err && pst.stock_id === req.body.stock_id) {
           //          res.send("Please make unique your inventory! Its already exist!");
           //      }
           //      else 
           //      {
           //          inventory.save(function(err, inventory) {
           //              if (err) {
           //                  res.send(err.message);
           //              } else {
           //                  res.send("You have successfully added inventory");
           //              }
           //          })
           //      }
           //  } else 
            {
                order.save(function(err, order) {
                    if (err) {
                        res.send(err.message);
                        return false;
                    } else {
                        // res.send("You have successfully added order");
                    }
                })                
                inventory.save(function(err, inventory) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send("You have successfully added inventory");
                    }
                })
            }
        // });  
    });

    // get a single post
    apiRouter.get('/inventories/:id', function(req, res) {
        Inventory.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/get_inventory', function(req, res) {
        Inventory.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

//        

    // update a post
    apiRouter.post('/update_inventory', function(req, res) {
console.log("in the inventory update_inventory");
        console.log(req.body);
//        return false;
        Inventory.findById({'_id': req.body.id}, function(err, inventory) {
            if (err)
                res.send(err);
            inventory.price = req.body.price;
            inventory.quantity = req.body.quantity;
            inventory.player_id = req.body.player_id;
            inventory.user_id = req.body.user_id;
            inventory.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Inventory updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/delete', function(req, res) {
        Inventory.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Inventory deleted!'});
        })
    });
};