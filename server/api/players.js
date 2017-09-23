var Player = require('../models/player');
var Category = require('../models/category');
var Country= require('../models/country');
var Position = require('../models/position');
var Club = require('../models/club');
var User = require('../models/user');
var copyFile = require('quickly-copy-file');
var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs');

// Players API
module.exports = function(apiRouter) {

    // get all players
    apiRouter.get('/players', function(req, res) {
        Player.find({}, function(err, players) {
            if (err)
                res.send(err);
            res.json(players);
        });
    });
    

    // get all posts
    apiRouter.get('/get_countries_app', function(req, res) {
        Country.find({}, function(err, countries) {
            if (err)
                res.json({'message' : "Countries listing", 'status' : false, 'data' : ""});
//            res.send(err);
            res.json({'message' : "Countries listing", 'status' : true, 'data' : countries});
        });
    });
    

    // get all countries
    apiRouter.get('/getcountries', function(req, res) {
        Country.find({}, function(err, countries) {
            if (err)
                res.send(err);
            console.log("yes here is the country list : ");
             console.log(countries);
            res.json(countries);
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
    // get all positions
    apiRouter.get('/getpositions', function(req, res) {
        Position.find({}, function(err, positions) {
            if (err)
                res.send(err);
            res.json(positions);
        });
    });
    // get all clubs
    apiRouter.get('/getclubs', function(req, res) {
        Club.find({}, function(err, clubs) {
            if (err)
                res.send(err);
            res.json(clubs);
        });
    });

    

  apiRouter.post('/upload_player_image', function(req, res) {
    
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
    console.log(fields);

      var file = files.file[0];
      var contentType = file.headers['content-type'];
      var extension = file.path.substring(file.path.lastIndexOf('.'));
      // var destPath = '/' + user.id + '/profile' + '/' + uuid.v4() + extension;
      // var destPath = 'uploads/players/' + uuid.v4() + extension;
      var imageName = uuid.v4() + extension;
      var destPath = fields.upload_dir + imageName;

console.log("destPath");
console.log(destPath);


      var headers = {
        'x-amz-acl': 'public-read',
        'Content-Length': file.size,
        'Content-Type': contentType
      };

        copyFile(file.path, destPath, function(error) {
          if (error)
          {
            console.log("error in file uploading..");
            console.error(error);
          }
                Player.findById({'_id': fields._id}, function(err, player) {
                    if (err)
                        res.send(err);
                    player.player_image = imageName;
                    player.save(function(err) {
                        if (err)
                            res.send(err);

                        if(fields.action == 'update')
                        res.json("You have successfully updated player");
                        else                        
                        res.json("You have successfully added player");
                    })
                    
                });
          // return destPath;
          console.log('File was copied!');
        });

console.log("player id : ");
console.log(fields._id);


        Player.findById({'_id': fields._id}, function(err, player) {
            if (err)
                res.send(err);

            console.log(imageName);
            player.player_image = imageName;
            player.save(function(err) {
                if (err)
                    res.send(err);


                console.log("yes image saved..");
                if(fields.action == 'update')
                res.send("You have successfully updated player");
                else
                res.send("You have successfully update added player");
            })
            
        });
        console.log("outside yes image saved..");
      // return false;

      // var uploader = s3Client.upload(file.path, destPath, headers);
      // uploader.on('error', function(err) {
      //   //TODO handle this
      // });
      // uploader.on('end', function(url) {
      //   //TODO do something with the url
      //   console.log('file opened:', url);
      // });
    });
  });

    // add a post
    apiRouter.post('/players', function(req, res) {
        console.log("adding player from api..");
        console.log(req.body);
        var player = new Player();

        player.title = req.body.title;
        player.club = req.body.club;
        player.position = req.body.position;
        player.position_side = req.body.position_side;
        player.birth_date = req.body.birth_date;
        player.birth_place = req.body.birth_place;
        player.preferred_foot = req.body.preferred_foot;
        player.weight = req.body.weight;
        player.height = req.body.height;
        player.shirt_number = req.body.shirt_number;
        player.country = req.body.country;
        player.category = req.body.category;
        player.buy = req.body.buy;
        player.sell = req.body.sell;


console.log("check player..");
console.log(player);



                player.save(function(err, player) {
                if (err) {
                        res.send(err.message);
                    } else {
                        // res.send("You have successfully added player");
                        res.send(player._id);
                    }
                })


        // Player.findOne({'title': req.body.title}, function(err, pst) {
        //    console.log(pst);
        //     if (pst) {
        //         if (!err && pst.title === req.body.title) {
        //             res.send("Please make unique your player! Its already exist!");
        //         }
        //         else 
        //         {
        //             player.save(function(err, player) {
        //                 if (err) {
        //                     res.send(err.message);
        //                 } else {
        //                     // res.send("You have successfully added player");
        //                     res.send(player._id);
        //                 }
        //             })
        //         }
        //     } else {
        //         player.save(function(err, player) {
        //         if (err) {
        //                 res.send(err.message);
        //             } else {
        //                 // res.send("You have successfully added player");
        //                 res.send(player._id);
        //             }
        //         })
        //     }
        // });
    });

    // get a single post
    apiRouter.get('/players/:id', function(req, res) {
        Player.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/get_player', function(req, res) {
        Player.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

//        

    // update a post
    apiRouter.post('/editplayer', function(req, res) {
console.log("in the player editplayer");
        console.log(req.body);
        // return false;
        Player.findById({'_id': req.body.id}, function(err, player) {
            if (err)
                res.send(err);
            player.title = req.body.title;
            player.club = req.body.club;
            player.position = req.body.position;
            player.position_side = req.body.position_side;
            player.birth_date = req.body.birth_date;
            player.birth_place = req.body.birth_place;
            player.preferred_foot = req.body.preferred_foot;
            player.height = req.body.height;
            player.weight = req.body.weight;
            player.shirt_number = req.body.shirt_number;
            player.country = req.body.country;            
            player.category = req.body.category;
            player.buy = req.body.buy;
            player.sell = req.body.sell;


console.log(req.body);

            // player.image = "asdf.png";//req.body.image;
            player.save(function(err) {
                if (err)
                {                    
                    // res.send(err);
                    console.log(err);
                    return false;
                }
                // res.send(player._id);
                res.json(player._id);
                // res.json('Player updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/delete_player', function(req, res) {
        Player.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Player deleted!'});
        })
    });


    // get all trending players
    apiRouter.get('/get_trending_players_app/:id', function(req, res) {

        if(req.params.id == '')
        {
            res.json({'message' : "No User found", 'status' : false, 'data' : "" });
            return false;
        }

        User.find({'_id' : req.params.id}, function(err, user_info) {
            if (err)
            {
                // res.send(err);
                res.json({'message' : "Error", 'status' : false, 'data' : err});
                return false;
            }

                Player.find({}, function(err, trending_players) {
                Player.find({}, function(err, yesterday_wining_players) {
                    res.json({'message' : "Trending Players", 'status' : true, 'data' : { 'user_info' : user_info, 'user_inventory' : user_inventory, 'trending_players' : trending_players, 'yesterday_wining_players' : yesterday_wining_players } });
                    });
                });


        });
    });


    // get all yesterday wining players
    apiRouter.get('/get_wining_players_app', function(req, res) {
        Player.find({}, function(err, players) {
            if (err)
                res.send(err);
            res.json({'message' : "Trending Players", 'status' : true, 'data' : players });
        });
    });

    // get a single player
    apiRouter.get('/get_player_app/:id', function(req, res) {
        Player.findById(req.params.id, function(err, player) {
            if (err)
            {
                res.json({'message' : "Error", 'status' : false, 'data' : "" });
                return false;
            }

            res.json({'message' : "Player Deatils", 'status' : true, 'data' : player });
        });
    });



};