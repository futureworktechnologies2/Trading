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

    function tryPlayerTradingSell( order_id, user_id, side, res)
    {

    Order.findById({'_id': order_id}, function(err, order) {
    var quantity_remains = order.quantity;

    User.findById({'_id': user_id}, function(err, user) {
        console.log("current user info..");
        console.log(user.firstname + " : " + user.firstname);
            Order.find({'side' : 'SELL', 'player_id': ObjectId(order.player_id)}, function(err, orders) {


console.log("total orders");
console.log(orders);
// return false;
    // for (var i = 0, len = orders.length; i < len; i++) {
    for (let item of orders) {
            // if( order._id == item._id)
            if( String(order.user_id) != String(item.user_id) )
            {
            // var other_order = item;
            Order.findById({'_id': item._id}, function(err, other_order) {
            
            console.log("quantity_remains");
            console.log(quantity_remains);

                if( quantity_remains > 0 && other_order.quantity > 0) //check if requested quantty become zero
                {

                if(order.quantity > other_order.quantity)
                {
                    var player_quantity = other_order.quantity;
                }
                else if(order.quantity < other_order.quantity)
                {
                    var player_quantity = order.quantity;
                }
                if(other_order.quantity == order.quantity)
                {
                    var player_quantity = other_order.quantity;
                }

                {


                    var player_worth = other_order.price * player_quantity;

                    console.log('player_worth: ' + player_worth);
                    // var player_worth = other_order.price * other_order.quantity;
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
                                // new_inventory.quantity = other_order.quantity;
                                new_inventory.quantity = player_quantity;

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
                                inventory.quantity = inventory.quantity + player_quantity;
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
                                other_inventory.quantity = other_inventory.quantity - player_quantity;
                                other_inventory.save(function(err) {
                                    // if (err)
                                    //     res.send(err);
                                    // res.json('User updated!');
                                })


                            });

                            if(other_order.quantity > player_quantity )
                            {
                                // update the order quantity
                                Order.findOne({'user_id': ObjectId(other_order.user_id)}, function(err, update_other_order) {
                                    if(update_other_order != null)
                                    {
                                        console.log("IFFF..");
                                        console.log(update_other_order);
                                        quantity_remains = update_other_order.quantity - player_quantity;
                                        update_other_order.quantity = update_other_order.quantity - player_quantity;
                                        update_other_order.save(function(err){
                                            console.log("quantity updated for the requested order 1..");
                                            console.log(update_other_order);
                                        });
                                    }
                                });
                                // update the this order order quantity
                                console.log("player_quantity : " + player_quantity + ", order.quantity : " + order.quantity);

                                if(player_quantity == order.quantity)
                                {
                                    console.log("yes order deleted..");
                                    // delete the order
                                    Order.remove({
                                        'user_id': ObjectId(user_id)
                                    }, function(err, order_delted) {
                                        if (err)
                                            res.send(err);
                                        console.log("Order deleted");
                                        // console.log(order_delted);
                                    });
                                }
                                else
                                {
                                    Order.findOne({'user_id': ObjectId(user_id)}, function(err, update_order) {
                                        if(update_order != null)
                                        {
                                            // quantity_remains = update_order.quantity - player_quantity;
                                            update_order.quantity = update_order.quantity - player_quantity;
                                            update_order.save(function(err){
                                                console.log("quantity updated for the requested order 2..");
                                                console.log(update_order);
                                            });
                                        }
                                    });
                                }

                            }
                            else
                            {
                                // delete the order
                                Order.remove({
                                    _id: other_order._id
                                }, function(err, order_delted) {
                                    if (err)
                                        res.send(err);
                                    console.log("Order deleted");
                                    // console.log(order_delted);
                                });

                                // update the order quantity
                                Order.findById({'user_id': ObjectId(user_id)}, function(err, update_order) {
                                    if(update_order != null)
                                    {
                                        quantity_remains = update_order.quantity - player_quantity
                                        update_order.quantity = update_order.quantity - player_quantity;
                                        update_order.save(function(err){
                                            console.log("quantity updated for the requested order 3..");
                                            console.log(update_order);
                                        });
                                    }
                                });
                            }

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

                        // delete the order
                        // Order.remove({
                        //     _id: other_order._id
                        // }, function(err, order_delted) {
                        //     if (err)
                        //         res.send(err);
                        //     console.log("Order deleted");
                        //     // console.log(order_delted);
                        // })

                }   //check if selling quantity is equal to buying quantity
            }   //check if requested quantity is zero
            

            });              //single order
        }   //checking if the order is from the same user
    }

                });

                });

        });
        // res.send("done");

    }
    function tryPlayerTradingBuy( order_id, user_id, side, res)
    {
        Order.findById({'_id': order_id}, function(err, order) {
            var quantity_remains = order.quantity;
            User.findById({'_id': user_id}, function(err, user) {
                console.log("current user info..");
                console.log(user.firstname + " : " + user.firstname);
                    Order.find( {'side' : 'BUY', 'player_id': ObjectId(order.player_id) }, function(err, orders) {

// console.log("orders");
// console.log(orders);
// return false;


                    // for (var i = 0, len = orders.length; i < len; i++) {
                    for (let item of orders) {

// console.log("item" + item);
// console.log(item);
// console.log(orders[0][i]);
// return false;

                            // if( order._id == item._id)


                            // if( '"' + order.user_id + '"' == '"' + item.user_id + '"' )
                            if( String(order.user_id) != String(item.user_id) )
                            {
                                // console.log("return from here because this order belongs to the same user..");
                                // return false;


// console.log("counter : " + i + ", " + item._id  + ", " + item.user_id);
// return false;
// console.log("item");
// console.log(item);
// var other_order = item;
                            // var other_order = item;

                            Order.findById({'_id': item._id}, function(err, other_order) {



// console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n");
// console.log("other_order:" + i);
// console.log(other_order);
// console.log("other_order");
// console.log(other_order);

console.log(other_order.user_id + ", " + other_order.player_id + ", " + other_order.quantity);
console.log("==================================================");

// return false;

                            if( quantity_remains > 0 && other_order.quantity > 0) //check if requested quantty become zero
                            {

                            if(quantity_remains > other_order.quantity)
                            {
                                var player_quantity = other_order.quantity;
                            }
                            else if(quantity_remains < other_order.quantity)
                            {
                                var player_quantity = quantity_remains;
                            }
                            if(other_order.quantity == quantity_remains)
                            {
                                var player_quantity = other_order.quantity;
                            }

                                var player_worth = other_order.price * player_quantity;
                                // console.log('player-worth : ' + player_worth);
                                    // var balance = user.wallet + player_worth;
                                    //update this user balance
                                    User.findById({'_id': user_id }, function(err, this_user) {
                                        this_user.wallet = this_user.wallet + player_worth;
                                        this_user.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // console.log('This User wallet updated!');
                                            })
                                    });
                                    //update other user balance
                                    User.findById({'_id': other_order.user_id }, function(err, other_user) {
                                        other_user.wallet = other_user.wallet - player_worth;
                                        other_user.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // console.log('Other User wallet updated!');
                                            })
                                    });

                                    //update this user inventory
                                    Inventory.findOne({'user_id': ObjectId(user_id), 'player_id' : ObjectId(order.player_id) }, function(err, inventory) {
                                        if (err)
                                            console.log('there is some problem..user_id: ' + user._id + ', player_id:' +  other_order.player_id);
                                            // inventory.quantity = inventory.quantity - quantity_remains;
                                            // quantity_remains = quantity_remains - player_quantity;
                                            inventory.quantity = inventory.quantity - player_quantity;
                                            console.log(user_id + ", " + inventory.quantity + " , " + player_quantity);
                                            inventory.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                                console.log("This User Inventory Updated..");
                                            })
                                    });


                                    //update other user inventory
                                   Inventory.findOne({'user_id': ObjectId(other_order.user_id), 'player_id' : ObjectId(other_order.player_id) }, function(err, other_inventory) {
                                        if (err)
                                            console.log('there is some problem..user_id: ' + other_order._id + ', player_id:' +  other_order.player_id);
                                            // console.log(other_inventory);

                                    console.log("other_order.user_id : " + other_order.user_id + ", other_order.player_id : " + other_order.player_id);

                                        if (other_inventory == null)
                                        {
                                            console.log("insert inventory..");
                                            new_inventory = new Inventory();
                                            new_inventory.player_id = other_order.player_id;
                                            new_inventory.user_id = user._id;
                                            new_inventory.price = other_order.price;
                                            // new_inventory.quantity = quantity_remains;
                                            new_inventory.quantity = player_quantity;
                                            // console.log(new_inventory);
                                            console.log(other_order.user_id + " : " + other_order.player_id + " : " + user._id + " player_quantity : " + player_quantity);
                                            new_inventory.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                                console.log("Other User Inventory Inserted..");
                                            })

                                        }
                                        else
                                        {
                                            other_inventory.quantity = other_inventory.quantity + player_quantity;
                                                console.log(other_order.user_id + " : " + other_order.player_id + ", " + other_inventory.quantity + " + " + player_quantity);
                                            other_inventory.save(function(err) {
                                                // if (err)
                                                //     res.send(err);
                                                // res.json('User updated!');
                                                console.log("Other User Inventory Updated..");
                                            })
                                        }
                                    });

// update orders
console.log("update orders other_order");
console.log(other_order);
console.log("player_quantity : " + player_quantity);
console.log("quantity_remains : " + quantity_remains);

// if(player_quantity > other_order.quantity)
if(quantity_remains > player_quantity)
{
console.log(quantity_remains  + ">" +  player_quantity);
    //delete the other order
    Order.remove({ 'side' : 'BUY', 'user_id': ObjectId(other_order.user_id), 'player_id': ObjectId(other_order.player_id) }, function(err, this_deleted) {
        if (err) { console.log(err); }
        console.log("Order deleted" + other_order.user_id + ", " + other_order.player_id);
        // console.log(this_deleted);
    });

    //update this order
    Order.findOne({ 'side' : 'SELL', 'user_id': ObjectId(user_id), 'player_id': ObjectId(order.player_id)}, function(err, this_update) {
        if(this_update != null)
        {

console.log("\nthis_update\n");
console.log(this_update);
console.log("\n");
console.log(this_update.quantity  + "-" +  other_order.quantity);

            // quantity_remains = this_update.quantity - other_order.quantity;
            // quantity_remains = this_update.quantity - player_quantity;
            this_update.quantity = this_update.quantity - other_order.quantity;
            this_update.save(function(err){

                //console.log("quantity updated for the requested order 3..");
                //console.log(this_update);
            });
        }
    });
quantity_remains = quantity_remains - player_quantity;
}
else if(quantity_remains < player_quantity)
{
console.log(quantity_remains  + "<" +  player_quantity);    
    //update other order
    Order.findOne({ 'side' : 'BUY', 'user_id': ObjectId(other_order.user_id), 'player_id': ObjectId(other_order.player_id) }, function(err, other_update) {
        if(other_update != null)
        {
            // quantity_remains = 0;
            other_update.quantity = other_update.quantity - player_quantity;
            other_update.save(function(err){
                //console.log("quantity updated for the requested order 3..");
                //console.log(other_update);
            });
        }
    });

    //delete this order
    Order.remove({ 'side' : 'SELL', 'user_id': ObjectId(user_id), 'player_id': ObjectId(order.player_id) }, function(err, this_deleted) {
        if (err) { console.log(err); }
        //console.log("Order deleted");
        // console.log(this_deleted);
    });
quantity_remains = 0;    
}
else if(quantity_remains = player_quantity)
{
console.log(player_quantity + "=" + player_quantity);
quantity_remains = 0;

    Order.findOne({ 'side' : 'BUY', 'user_id': ObjectId(other_order.user_id), 'player_id': ObjectId(other_order.player_id) }, function(err, other_update) {
        if(other_update != null)
        {
            // quantity_remains = 0;
            other_update.quantity = other_update.quantity - player_quantity;
            other_update.save(function(err){
                //console.log("quantity updated for the requested order 3..");
                //console.log(other_update);
            });
        }
    });
    //delete this order
    Order.remove({ 'side' : 'SELL', 'user_id': ObjectId(user_id), 'player_id': ObjectId(order.player_id) }, function(err, this_deleted) {
        if (err) { console.log(err); }
        //console.log("Order deleted");
        // console.log(this_deleted);
    });    

    //delete other order
    // Order.remove({ 'user_id': ObjectId(other_order.user_id), 'player_id': ObjectId(other_order.player_id) }, function(err, other_deleted) {
    //     if (err) { console.log(err); }
    //     //console.log("Order deleted");
    //     // console.log(other_deleted);
    // });    

    //delete this order
    // Order.remove({ 'user_id': ObjectId(user_id), 'player_id': ObjectId(order.player_id) }, function(err, this_deleted) {
    //     if (err) { console.log(err); }
    //     //console.log("Order deleted");
    //     // console.log(this_deleted);
    // });    
}



/*


                                                        if(other_order.quantity > player_quantity )
                                                        {
                                                        console.log("update orders IFFFF.." + quantity_remains + ", " + player_quantity + "other_order.player_id:" + other_order.user_id + "other_order.player_id" +  other_order.player_id);                                                            
                                                            // update the order quantity
                                                            Order.findOne({'user_id': ObjectId(other_order.user_id), 'player_id': ObjectId(other_order.player_id)}, function(err, update_other_order) {
                                                                console.log("update_other_order");                               
                                                                console.log(update_other_order);                                
                                                                if(update_other_order != null)
                                                                {
                                                                    update_other_order.quantity = update_other_order.quantity - player_quantity;
                                                                    // quantity_remains = 0;
                                                                    update_other_order.save(function(err){
                                                                        console.log("SELL quantity updated for the requested order 1..");
                                                                        console.log(update_other_order);
                                                                    });
                                                                }
                                                            });

                                                            // console.log(player_quantity + "==" +  order.quantity + "rq:" + quantity_remains );

                                                            if(player_quantity == order.quantity)
                                                            {
                                                                console.log("yes order deleted..");
                                                                // delete the order
                                                                Order.remove({
                                                                    'user_id': ObjectId(user_id)
                                                                }, function(err, order_delted) {
                                                                    if (err)
                                                                        res.send(err);
                                                                    //console.log("Order deleted");
                                                                    // console.log(order_delted);
                                                                });
                                                            }
                                                            else
                                                            {
                                                                Order.findOne({'user_id': ObjectId(user_id), 'player_id': ObjectId(order.player_id)}, function(err, update_order) {
                                                                    if(update_order != null)
                                                                    {
                                                                        // quantity_remains = update_order.quantity - player_quantity;
                                                                        update_order.quantity = update_order.quantity - player_quantity;
                                                                        update_order.save(function(err){
                                                                            //console.log("quantity updated for the requested order 2..");
                                                                            //console.log(update_order);
                                                                        });
                                                                    }
                                                                });
                                                            }

                                                        }
                                                        else
                                                        {
                                                        console.log("update orders ELSEEEE.." + player_quantity);                                                            
                                                            // quantity_remains = quantity_remains - other_order.quantity;
                                                            // delete the order
                                                            Order.remove({
                                                                _id: other_order._id
                                                            }, function(err, order_delted) {
                                                                if (err)
                                                                    res.send(err);
                                                                //console.log("Order deleted");
                                                                // console.log(order_delted);
                                                            });

                                                            // update the order quantity
                                                            Order.findOne({'user_id': ObjectId(user_id), 'player_id': ObjectId(order.player_id)}, function(err, update_order) {


console.log("update_order" + user_id);
console.log(update_order);

                                                                if(update_order != null)
                                                                {
                                                                    quantity_remains = update_order.quantity - player_quantity
                                                                    update_order.quantity = update_order.quantity - player_quantity;
                                                                    update_order.save(function(err){
                                                                        //console.log("quantity updated for the requested order 3..");
                                                                        //console.log(update_order);
                                                                    });
                                                                }
                                                            });
                                                        }




*/

        // quantity_remains = quantity_remains - player_quantity;
        // console.log("quantity_remains : " + quantity_remains);
        // delete the order
        // Order.remove({
        //     _id: other_order._id
        // }, function(err, order_delted) {
        //     if (err)
        //         res.send(err);
        //     console.log("Order deleted");
        //     // console.log(order_delted);
        // })
                            }   //check if requested quantity become zero

                            });              //single order
                    }       //checking if the order is from the same user

                    }



                }).sort( { created_at: -1 } );

                });

        });
        // res.send("done");
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
                res.json({'message' : "There is some problem.", 'status' : false, 'data' : err});
                return false;
            }
            if (player == null)
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



                        Order.aggregate(
// [
//     { $match: {
//        'side' : 'SELL', 'user_id': ObjectId(req.body.user_id), 'player_id' : ObjectId(req.body.player_id)
//      }
//     },
//    {
//      $project: {
//        quizTotal: { $sum: { $sum : ["$price"] }},
//        labTotal: { $sum: "$quantity" }
//      }
//    }
// ],                                       
           [
            { $match: {
               'side' : 'SELL', 'user_id': ObjectId(req.body.user_id), 'player_id' : ObjectId(req.body.player_id)
             }
            },                                       
             {
               $group:
                 {
                   _id: { 'side' : 'SELL', 'user_id': ObjectId(req.body.user_id), 'player_id' : ObjectId(req.body.player_id) },
                   total_quantity: { $sum: { $sum : ["$quantity"] }},
                   count: { $sum: 1 }
                 }
             }
           ],


            // {'side' : 'SELL', 'user_id': ObjectId(user._id), 'player_id' : ObjectId(other_order.player_id) }, 
            function(err, get_player_in_use) {

            console.log("get_player_in_use");
            if(get_player_in_use[0] != null)
            {
                console.log(get_player_in_use);
                console.log(get_player_in_use[0].total_quantity);
                var quantity_in_use = get_player_in_use[0].total_quantity + req.body.quantity;
            }
            else
            {
                var quantity_in_use = req.body.quantity;
            }


            if(quantity_in_use < inventory.quantity)
            {
                order = new Order();
                order.player_id = req.body.player_id;
                order.user_id = req.body.user_id;
                order.side = req.body.side;
                order.price = req.body.price;
                order.quantity = req.body.quantity;


            Order.findOne({'role': {$ne: "admin"} }, function(err, get_max_order) {
            order.sort_order = ( get_max_order.sort_order + 1 );

                order.save(function(err, order) {
                    if (err) {
                        res.json({'message' : "Order not saved", 'status' : false, 'data' : ""});
                        return false;
                    } else {
                        console.log("order saved SELL.");
                        console.log(order);                                    
                        // res.json({'message' : "Order saved", 'status' : true, 'data' : order._id});
                        tryPlayerTradingBuy(order._id, req.body.user_id, order.side, res);
                        res.json({'message' : "Order saved", 'status' : true, 'data' : ""});
                        // tryPlayerTrading(id);
                        return false;
                    }
                })
            }).sort({sort_order:-1})
            }
            else
            {
                res.json({'message' : "Submitted quantity of stock does not exist or is in use.", 'status' : false, 'data' : ""});
            }
        })


                        // if( req.body.quantity > inventory.quantity)
                        // {
                        //     console.log("Submitted quantity of stock does not exist or is in use.");
                        //     // res.json({'message' : "Submitted quantity of stock does not exist or is in use.", 'status' : false, 'data' : ""});
                        //     return false;
                        // }
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


                        console.log(order);

// db.getCollection('orders').find({role: {$ne: "admin"}}).sort({sort_order:+1}).limit(1)
                    Order.findOne({'role': {$ne: "admin"} }, function(err, get_max_order) {


console.log(order);
console.log(get_max_order);

                        order.sort_order = ( get_max_order.sort_order + 1 );


                            order.save(function(err, order) {
                                if (err) {
                                    res.json({'message' : "Order not saved", 'status' : false, 'data' : err});
                                    return false;
                                } else {
                                    console.log("order saved BUY.");
                                    console.log(order);
                                    // res.json({'message' : "Order saved", 'status' : true, 'data' : order._id});
                                    tryPlayerTradingSell(order._id, req.body.user_id, order.side, res);
                                    // console.log(res);
                                        res.json({'message' : "Your order is submitted", 'status' : true, 'data' : ''});
                                    // User.findById({'_id': req.body.user_id}, function(err, user_data) {
                                    //     res.json({'message' : "Your order is submitted", 'status' : true, 'data' : user_data.wallet});
                                    // });
                                    // res.json({'message' : "Order saved", 'status' : true, 'data' : tryPlayerTrading(order._id)});

                                    // return false;
                                }
                            })
                        }).sort({sort_order:-1})



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