var User = require('../models/user');


// var crypto = require('crypto');
// bcrypt = require('bcrypt-nodejs');
nodemailer = require('nodemailer');
smtpTransport = require("nodemailer-smtp-transport");
// async = require('async');

// Users API
module.exports = function(apiRouter,passport) {

    // get all posts
    apiRouter.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
    // add a post
    apiRouter.post('/users', function(req, res) {

        User.register(new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            dob: req.body.dob,
            status: req.body.status,
            role: req.body.role,
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err.message);
                res.send(err.message);
            } else {
                res.send("You have successfully added user");
            }

        });
    });

    
    apiRouter.post('/getuser', function(req, res) {
        //console.log('get getUser api');
        //console.log(req.body.id);

        User.findById({'_id':req.body.id}, function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
      apiRouter.post('/users/home', function(req, res) {

        User.register(new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            status: 0,
            role:"user",
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err.message);
                res.send(err.message);
            } else {
                res.send("You have successfully registered!");
            }

        });
    });

   apiRouter.post('/users/login', function(req, res) {
         passport.authenticate('local')(req, res, function() {
                res.json(req.user);
              //console.log(req.user)
                   // res.send("You have successfully login");
            });
    });
    // get a single post
    apiRouter.post('/edituser', function(req, res) {
        User.findById({'_id': req.body.path}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });
      
    // update a post
    apiRouter.post('/editusrID', function(req, res) {
        //console.log(req.body);
        User.findById({'_id': req.body.id}, function(err, user) {
            if (err)
                res.send(err);
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.dob = req.body.dob;
            user.role = req.body.role;
            user.status = req.body.status;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json('User updated!');
            })

        });
    });

    // delete a user
    apiRouter.post('/deleteuser', function(req, res) {
        User.remove({
            _id: req.body.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({message: 'User deleted!'});
        })
    });



    // get all posts
    apiRouter.get('/get_users_app', function(req, res) {
        User.find({}, function(err, users) {
            if (err)
                res.send(err);
            // res.send({'message' : "You have successfully added user", 'status' : true, 'data' : users });
            res.json({'message' : "Users listing", 'status' : true, 'data' : users });
        });
    });

    // add a post
    apiRouter.post('/user_register_app', function(req, res) {
        User.register(new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            status: req.body.status,
            role: 'user',
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err.message);
                res.send(err.message);
            } else {
                // res.send(user);
                res.send({'message' : "You have successfully added user", 'status' : true, 'data' : user });
            }
        });
    });
    // add a user from facebook
    apiRouter.post('/user_register_fb_app', function(req, res) {


        User.findOne({'email': req.body.email}, function(err, user) {
            if (user) {
                if (!err && user.email === req.body.email) {
                    //update user info
                    User.findById({'_id': user._id}, function(err, user) {
                        if (err)
                            res.send(err);
                        user.firstname = req.body.firstname;
                        user.lastname = "";
                        user.dob = "";
                        user.role = "user";
                        user.status = 1;
                        user.facebook_id = req.body.facebook_id;
                        user.profile_picture = req.body.profile_picture;
                        // user.password = req.body.password;
                        user.save(function(err) {
                            if (err)
                                res.send(err);
                            res.json('User updated!');
                        })
                    });

                }
                // else 
                // {
                //     user.save(function(err, user_info) {
                //         if (err) {
                //             res.send(err.message);
                //         } else {
                //             res.send("You have successfully added position");
                //         }
                //     })
                // }
            } else {
                        User.register(new User({
                            firstname: req.body.firstname,
                            lastname: "",
                            dob: "",
                            status: 1,
                            role: 'user',
                            email: req.body.email
                        }), req.body.password, function(err, user) {
                            if (err) {
                                console.error(err.message);
                                res.send(err.message);
                            } else {
                                // res.send(user);
                                res.send({'message' : "You have successfully added user by fb", 'status' : true, 'data' : user });
                            }
                        });


            }
        });








        // User.register(new User({
        //     firstname: req.body.firstname,
        //     lastname: req.body.lastname,
        //     dob: req.body.dob,
        //     status: req.body.status,
        //     role: 'user',
        //     email: req.body.email
        // }), req.body.password, function(err, user) {
        //     if (err) {
        //         console.error(err.message);
        //         res.send(err.message);
        //     } else {
        //         // res.send(user);
        //         res.send({'message' : "You have successfully added user", 'status' : true, 'data' : user });



        //     }

        // });
    });

    // get all posts
    apiRouter.post('/get_profile_by_id_app', function(req, res) {

        if( req.body.user_id == '')
        {
            res.json({'message' : "Please enter user id", 'status' : false, 'data' : "" });
        }


        User.find({'_id' : req.body.user_id}, function(err, users) {
            if (err)
                res.send(err);
            // res.send({'message' : "You have successfully added user", 'status' : true, 'data' : users });
            res.json({'message' : "Users listing", 'status' : true, 'data' : users });
        });
    });


    apiRouter.post('/post_profile_by_id_app', function(req, res) {

        if( req.body.user_id == '')
        {
            res.json({'message' : "Please enter user id", 'status' : false, 'data' : "" });
        }


        User.findOne({'_id' : req.body.user_id}, function(err, users) {
            if (err)
                res.send(err);
            // res.send({'message' : "You have successfully added user", 'status' : true, 'data' : users });
            res.json({'message' : "Users listing", 'status' : true, 'data' : users });
        });
    });



    // get all posts
    apiRouter.post('/post_update_profile_app', function(req, res) {

console.log(req.body);

        if( req.body.user_id == '')
        {
            res.json({'message' : "Please enter user id", 'status' : false, 'data' : "" });
        }


        User.findById({'_id' : req.body.user_id}, function(err, user) {
            if (err)
                res.send(err);


                console.log(user);


                        user.firstname = "firstname";
                        // user.password = req.body.password;
                        user.save(function(err) {
                            if (err)
                                res.send(err);
                            res.json({'message' : "User updated!", 'status' : true, 'data' : "" });
                        })



            // res.send({'message' : "You have successfully added user", 'status' : true, 'data' : users });
            // res.json({'message' : "Users listing", 'status' : true, 'data' : "fdfd" });
        });
    });
    // get all posts
    apiRouter.get('/post_update_profile_app1', function(req, res) {

        if( req.body.user_id == '')
        {
            res.json({'message' : "Please enter user id", 'status' : false, 'data' : "" });
        }


        User.find({'_id' : req.body.user_id}, function(err, user) {
            if (err)
                res.send(err);


                        user.firstname = req.body.firstname;
                        // user.password = req.body.password;
                        user.save(function(err) {
                            if (err)
                                res.send(err);
                            res.json({'message' : "User updated!", 'status' : true, 'data' : "" });
                        })



            // res.send({'message' : "You have successfully added user", 'status' : true, 'data' : users });
            res.json({'message' : "Users listing", 'status' : true, 'data' : users });
        });
    });

   apiRouter.post('/user_login_app', function(req, res) {
         passport.authenticate('local')(req, res, function() {
            var data = [];
                data  = {

    '_id' : req.user._id,
    'firstname' : req.user.firstname,
    'lastname' : req.user.lastname,
    'dob' : req.user.dob,
    'status' : req.user.status,
    'role' : req.user.role,
    'email' : req.user.email,
    'phone' : req.user.phone,
    'country' : req.user.country,
    'street' : req.user.street,
    'address' : req.user.address,
    'city' : req.user.city,
    'postal_code' : req.user.postal_code,
    'title' : req.user.title,
    'wallet' : req.user.wallet,
    'profile_picture' : req.user.profile_picture,


                            };
                    res.json({'message' : "User logged in", 'status' : true, 'data' : data });
                   // res.send("You have successfully login");
            });
    }); 


apiRouter.post('/user_refer_app', function(req, res) {
 

   var smtpTransport = nodemailer.createTransport('SMTP',{
   service: 'Gmail',
   secureConnection : false,
   port: 465,
   auth : {
      user: 'rakhi@avainfotech.com',
      pass: 'future@123'
   }
  });
      var mailOptions = {
        from: 'Trading <mahaksingh@avainfotech.com>',
        to: req.body.email,
        subject: 'Treding App',
        text: 'You are receiving this because you have refered by your friend'
      };
      smtpTransport.sendMail(mailOptions, function(err) {


    // console.log('info', 'An e-mail has been sent to ' + req.body.email + ' with further instructions.');
    // console.log(err);
    console.log(mailOptions);
    res.json({'message' : 'An e-mail has been sent to ' + req.body.email + ' with further instructions.', 'status' : true });

 
        // done(err, 'done');
      });

});


apiRouter.post('/post_change_password_app', function(req, res) {


        if (req.body.password !== req.body.confirm) {
            res.json({'message' : "Password and confirm password do not match.", 'status' : false, 'data' : "" });
           
         }else{



// var cursor = User.find({ 
//   _id: req.body.user_id
// });

// console.log(cursor);
// return false;


            User.findById({'_id': req.body.user_id }, {'hash': true, 'salt': true}, function(err, user) {
            // User.aggregate(
            //     {
            //      $match: { _id : req.body.user_id },
            //      $project : { firstname : 1 },
            //      // [ $match: { _id: req.body.user_id } ]
            //     }, function(err, user) {
                // user new User({'_id' : req.body.user_id});


console.log(user);
// return false;





                console.log(req.body.old_password);


                validate_password = user.comparePassword(req.body.old_password, user.hash, user.salt);
                if( !validate_password)
                {
                    console.log("Invalid password..");
                }
                else
                {
                    console.log("Valid password..");
                }
res.json({'message' : "Password has been changed.", 'status' : true, 'data' : "" });
                return false;

                user.setPassword(req.body.password, function() {
                    user.save(function(err) {
                        res.json({'message' : "Password has been changed.", 'status' : true, 'data' : "" });

                        });
                    });
                });
          }

});
apiRouter.post('/post_user_subscribe_app', function(req, res) {
            User.findById({'_id': req.body.user_id }, function(err, user) {
                    user.notification_sms = req.body.notification_sms;
                    user.notification_phone = req.body.notification_phone;
                    user.notification_email = req.body.notification_email;
                    user.notification_post = req.body.notification_post;

                    user.save(function(err) {
                        res.json({'message' : "Notifications updated.", 'status' : true, 'data' : "" });

                        });
                });
});

apiRouter.post('/post_user_wallet_app', function(req, res) {
            User.findById({'_id': req.body.user_id }, function(err, user) {
                    user.wallet = req.body.wallet;
                    user.save(function(err) {
                        res.json({'message' : "Wallet updated.", 'status' : true, 'data' : "" });

                        });
                });
});




};