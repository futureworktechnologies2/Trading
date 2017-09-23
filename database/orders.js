db.getCollection('orders').find({'side' : "SELL"})

// db.getCollection('orders').find({})

db.getCollection('orders').find({"role" : {$ne : "admin"}})

/* 1 */
{
    "_id" : ObjectId("59bd09cf5a519fa9a36d1b35"),
    "quantity" : 999,
    "price" : 15,
    "side" : "SELL",
    "user_id" : ObjectId("59957fbc64157305a8b426dd"),
    "player_id" : ObjectId("59b767aa9bdbe80900f6a677"),
    "updated_at" : ISODate("2017-09-23T06:39:04.402Z"),
    "created_at" : ISODate("2017-09-16T11:20:47.788Z"),
    "__v" : 0,
    "sort_order" : 1000,
    "role" : "admin"
}

/* 2 */
{
    "_id" : ObjectId("59c4e9b94fe81d12cc160a4c"),
    "side" : "SELL",
    "price" : 10,
    "quantity" : 4480,
    "player_id" : ObjectId("59b7668f9bdbe80900f6a675"),
    "user_id" : ObjectId("59957fbc64157305a8b426dd"),
    "updated_at" : ISODate("2017-09-23T11:05:36.600Z"),
    "created_at" : ISODate("2017-09-22T10:45:13.228Z"),
    "sort_order" : 100000,
    "role" : "admin",
    "__v" : 0
}

/* 3 */
{
    "_id" : ObjectId("59c3641b5a519fa9a3a40c8d"),
    "quantity" : 830,
    "price" : 15,
    "side" : "BUY",
    "user_id" : ObjectId("59957fbc64157305a8b426dd"),
    "player_id" : ObjectId("59b7668f9bdbe80900f6a675"),
    "updated_at" : ISODate("2017-09-23T06:53:31.910Z"),
    "created_at" : ISODate("2017-09-16T11:20:47.788Z"),
    "__v" : 0,
    "sort_order" : 1000,
    "role" : "admin"
}

/* 4 */
{
    "_id" : ObjectId("59c4e3a82acefb0cd8d0550a"),
    "side" : "SELL",
    "price" : 10,
    "quantity" : 1550,
    "player_id" : ObjectId("59b6273d7f82a60a14c9386e"),
    "user_id" : ObjectId("59957fbc64157305a8b426dd"),
    "updated_at" : ISODate("2017-09-22T10:19:20.592Z"),
    "created_at" : ISODate("2017-09-22T10:19:20.576Z"),
    "sort_order" : 100000,
    "role" : "admin",
    "__v" : 0
}