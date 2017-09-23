var Order = require('../models/order');
var Player = require('../models/player');
var User = require('../models/user');
var Inventory = require('../models/inventory');
var ObjectId = require('mongodb').ObjectID;
// var Category = require('../models/category');

// Stocks API
module.exports = function(apiRouter) {

    // get all orders
    apiRouter.get('/get_orders_app', function(req, res) {
        Order.find({}, function(err, orders) {
            if (err)
                res.json({'message' : "Order not found", 'status' : false, 'data' : ""});
            res.json({'message' : "Orders Listing", 'status' : true, 'data' : orders});
        });
    });

    function validate(req, res) {
    var isValid = true;
    if (isValid) {
        res.send("validated..");
        // next();
    } else {
        res.send("please try again");
    }
    }


    // get all categories
    // apiRouter.get('/getcategories', function(req, res) {
    //     Category.find({}, function(err, categories) {
    //         if (err)
    //             res.send(err);

    //         // console.log(categories);

    //         res.json(categories);
    //     });
    // });

    function tryPlayerTrading( order_id, user_id, side, res)
    {
        // var order = get_order_by_id( id, res);

        // if(order)
        // {
        //     res.send("YES IN THE IFFFF.." + order);
            
        // }
        // else{
        //     res.send("YES IN THE ELSEEEE.." + order);
        // }
// var new_user = '';
// console.log(user_id);
// User.findById({'_id': user_id}, function(err, user, done) {
// // return user;
// done(err, user);
// console.log(user);
// });
// done(err, user);
//console.log(user); //I want to access the result here


        Order.findById({'_id': order_id}, function(err, order) {

            User.findById({'_id': user_id}, function(err, user) {
                console.log("current user info..");
                console.log(user.firstname + " : " + user.firstname);
                    Order.find({}, function(err, orders) {

                    for (var i = 0, len = orders.length; i < len; i++) {
                            // if( order._id == orders[i]._id)

                            // if( '"' + order.user_id + '"' == '"' + orders[i].user_id + '"' )
                            if( String(order.user_id) == String(orders[i].user_id) )
                            {
                                console.log("return from here because this order belongs to the same user..");
                                return false;
                            }

                            // var other_order = orders[i];
                            Order.findById({'_id': orders[i]._id}, function(err, other_order) {

                                var player_worth = other_order.price * other_order.quantity;

                                if( other_order.side == 'SELL')
                                {
                                    var balance = user.wallet - player_worth;
                                    User.findById({'_id': user_id }, function(err, this_user) {
                                        this_user.wallet = this_user.wallet - player_worth;
                                        this_user.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                console.log('This User wallet updated!');
                                            })
                                    });
console.log(user_id + ", " + other_order.player_id);

                                    Inventory.findOne({'user_id': ObjectId(user_id), 'player_id' : ObjectId(other_order.player_id) }, function(err, inventory) {
                                        if (err)
                                            console.log('there is some problem..user_id: ' + user._id + ', player_id:' +  other_order.player_id);

console.log(inventory);

                                        if (inventory == null)
                                        {
console.log("insert inventory..");
                                            //insert inventory
                                            new_inventory = new Inventory();
                                            new_inventory.player_id = other_order.player_id;
                                            new_inventory.user_id = user._id;
                                            new_inventory.price = other_order.price;
                                            new_inventory.quantity = other_order.quantity;

console.log(new_inventory);

                                            new_inventory.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                                console.log("Inventory Inserted..");
                                            })

                                        }
                                        else
                                        {
                                            //update inventory
                                            inventory.quantity = inventory.quantity + other_order.quantity;
                                            inventory.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                            })                                            
                                        }

                                        //update other user
                                        User.findById({'_id': other_order.user_id }, function(err, other_user) {

                                            other_user.wallet = other_user.wallet + player_worth;
                                            other_user.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                            })
                                        //update other user inventory
                                        Inventory.findOne({'user_id': ObjectId(other_order.user_id), 'player_id' : ObjectId(other_order.player_id) }, function(err, other_inventory) {
                                            other_inventory.quantity = other_inventory.quantity - other_order.quantity;
                                            other_inventory.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                            })


                                        });

                                        //add transaction to history
                                        // transaction = new Transaction();
                                        // transaction.seller_id = '';
                                        // transaction.buyer_id = '';
                                        // transaction.player_id = '';
                                        // transaction.price = '';
                                        // transaction.quantity = '';
                                        // transaction.save( function(err){

                                        // });


                                        })


                                    });

                                }
                                else if( other_order.side == 'BUY')
                                {

                                    // var balance = user.wallet + player_worth;
                                    //update user balance
                                    Inventory.findOne({'user_id': ObjectId(user._id), 'player_id' : ObjectId(other_order.player_id) }, function(err, inventory) {

                                        if( inventory == null)
                                            return false;
                                        if(other_order.quantity > inventory.quantity)
                                            return false;
                                        else
                                        {

                                        var balance = user.wallet + player_worth;
                                        //update user
                                        User.findById({'_id': user_id }, function(err, this_user) {

                                            this_user.wallet = this_user.wallet + player_worth;
                                            this_user.save(function(err) {
                                                console.log("This user balance updated..");
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                            })
                                        })

                                        //update this user inventory
                                        Inventory.findOne({'user_id': ObjectId(user._id), 'player_id' : ObjectId(other_order.player_id) }, function(err, this_inventory) {

                                            this_inventory.quantity = this_inventory.quantity - other_order.quantity;
                                            this_inventory.save(function(err){
                                                console.log("This user inventory updated..");
                                            });

                                        });


                                        //update other user
                                        User.findById({'_id': other_order.user_id }, function(err, other_user) {
                                            other_user.wallet = other_user.wallet - player_worth;
                                            other_user.save(function(err) {
                                                console.log("Other user balance updated..");
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                            })

                                       })


                                    //update other user inventory
                                    Inventory.findOne({'user_id': other_order.user_id, 'player_id' : other_order.player_id }, function(err, other_inventory) {
                                        if (err)
                                            console.log('there is some problem..user_id: ' + user._id + ', player_id:' +  other_order.player_id);
                                        if (other_inventory == null)
                                        {
                                            //insert inventory
                                            new_inventory = new Inventory();
                                            new_inventory.player_id = other_order.player_id;
                                            new_inventory.user_id = other_order.user_id;
                                            new_inventory.price = other_ordier.price;
                                            new_inventory.quantity = other_order.quantity;
                                            new_inventory.save(function(err) {
                                                console.log("Other user inventory inserted..");
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                            })

                                        }
                                        else
                                        {
                                            //update inventory
                                            other_inventory.quantity = other_inventory.quantity + other_order.quantity;
                                            other_inventory.save(function(err) {
                                                console.log("Other user inevntory updated..");
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                            })                                            
                                        }
                                    });



                                        //add transaction to history
                                        // transaction = new Transaction();
                                        // transaction.seller_id = '';
                                        // transaction.buyer_id = '';
                                        // transaction.player_id = '';
                                        // transaction.price = '';
                                        // transaction.quantity = '';
                                        // transaction.save( function(err){

                                        // });

                                    }


                                    });

                                
                                }

        // delete the order
        Order.remove({
            _id: other_order._id
        }, function(err, order_delted) {
            if (err)
                res.send(err);
            console.log("Order deleted");
            // console.log(order_delted);
        })
                            

                            });              //single order







                    }



                });

                });

        });
        res.send("done");


    }


    function get_order_by_id( id, res)
    {
        // res.json("get order by id..");
        // res.json("get order by id.." + id);
        Order.findById({'_id': id}, function(err, order) {
            // return order;
            // res.json("get order by id.." + err);
            // res.json("get order by id sfds..");
            res.json(order);
            // return order;
        });

    }
                    

    // add a post
    apiRouter.post('/post_orders_app', function(req, res) {

        console.log("adding orders from api..");

        // validate(req, res);
        // return false;


        var total_cost = ( req.body.price * req.body.quantity );
        var availeble_balance = 10000;


        Player.findById({'_id': req.body.player_id}, function(err, player) {



            if (err)
            {
                res.json({'message' : "Player not exist", 'status' : false, 'data' : ""});
                return false;
            }

            if(req.body.side == 'SELL')
            {
                Inventory.findOne({'user_id' : ObjectId(req.body.user_id), 'player_id' : ObjectId(req.body.player_id) }, function(err, inventory) {


                    // console.log("inventory");
                    // console.log(inventory);
                    // return false;

                    if( inventory == null)
                    {
                        console.log("Player does not exist in your inventory.");
                        // res.json({'message' : "Player does not exist in your inventory.", 'status' : false, 'data' : ""});
                        return false;
                    }
                    else
                    {

                        if( req.body.quantity > inventory.quantity)
                        {
                            console.log("Submitted quantity of stock does not exist or is in use.");
                            // res.json({'message' : "Submitted quantity of stock does not exist or is in use.", 'status' : false, 'data' : ""});
                            return false;
                        }


                        order = new Order();
                        order.player_id = req.body.player_id;
                        order.user_id = req.body.user_id;
                        order.side = req.body.side;
                        order.price = req.body.price;
                        order.quantity = req.body.quantity;

                            order.save(function(err, order) {
                                if (err) {
                                    res.json({'message' : "Order not saved", 'status' : false, 'data' : ""});
                                    return false;
                                } else {
                                    console.log("order saved SELL.");
                                    console.log(order);                                    
                                    // res.json({'message' : "Order saved", 'status' : true, 'data' : order._id});
                                    tryPlayerTrading(order._id, req.body.user_id, order.side, res);
                                    // res.json({'message' : "Order saved", 'status' : true, 'data' : tryPlayerTrading(order._id)});

                                    // tryPlayerTrading(id);




                                    return false;
                                }
                            })

                    }
                    return false;


                })

            }
            else if(req.body.side == 'BUY')
            {

                if( availeble_balance > total_cost)
                {

// res.json(req.body);
// return false;

                    order = new Order();
                    order.player_id = req.body.player_id;
                    order.user_id = req.body.user_id;
                    order.side = req.body.side;
                    order.price = req.body.price;
                    order.quantity = req.body.quantity;


                            order.save(function(err, order) {
                                if (err) {
                                    res.json({'message' : "Order not saved", 'status' : false, 'data' : ""});
                                    return false;
                                } else {
                                    console.log("order saved BUY.");
                                    console.log(order);
                                    // res.json({'message' : "Order saved", 'status' : true, 'data' : order._id});
                                    tryPlayerTrading(order._id, req.body.user_id, res);
                                    // res.json({'message' : "Order saved", 'status' : true, 'data' : tryPlayerTrading(order._id)});

                                    // tryPlayerTrading(id);




                                    return false;
                                }
                            })



                }
            }

            
        });







        // Stock.findOne({'title': req.body.title}, function(err, pst) {
        //    console.log(pst);
        //     if (pst) {
        //         if (!err && pst.title === req.body.title) {
        //             res.send("Please make unique your stock! Its already exist!");
        //         }
        //         else 
        //         {
        //             stock.save(function(err, stock) {
        //                 if (err) {
        //                     res.send(err.message);
        //                 } else {
        //                     res.send("You have successfully added stock");
        //                 }
        //             })
        //         }
        //     } else {
        //         stock.save(function(err, stock) {
        //             if (err) {
        //                 res.send(err.message);
        //             } else {
        //                 res.send("You have successfully added stock");
        //             }
        //         })
        //     }
        // });
    });

//     // get a single post
//     apiRouter.get('/stocks/:id', function(req, res) {
//         Stock.findById(req.params.id, function(err, post) {
//             if (err)
//                 res.send(err);

//             res.json(post);
//         });
//     });
//     // get a single post
//     apiRouter.post('/parmalcat1', function(req, res) {
//         console.log(" in the parmalcat..");
//         // console.log(req.body.path);
//         Stock.findById({'_id': req.body.path}, function(err, user) {
//             if (err)
//                 res.send(err);

//             res.json(user);
//         });
//     });

// //        

//     // update a post
//     apiRouter.post('/editstock', function(req, res) {
// console.log("in the stock editstock");
//         console.log(req.body);
//         // return false;
//         Stock.findById({'_id': req.body.id}, function(err, stock) {
//             if (err)
//                 res.send(err);
//             stock.title = req.body.title;
//             stock.category = req.body.category;
//             // stock.image = "asdf.png";//req.body.image;
//             stock.save(function(err) {
//                 if (err)
//                     res.send(err);
//                 res.json('Stock updated!');
//             })
            
//         });
//     });
//     // delete a post
//     apiRouter.post('/delete_stock', function(req, res) {
//         Stock.remove({
//             _id: req.body.id
//         }, function(err, post) {
//             if (err)
//                 res.send(err);
//             res.json({message: 'Stock deleted!'});
//         })
//     });
};