var Category = require('../models/category');
// var multer  = require('multer');
// var mkdirp = require('mkdirp');
var copyFile = require('quickly-copy-file');
var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs');


// Categorys API
module.exports = function(apiRouter) {

    // get all categories
    apiRouter.get('/categories', function(req, res) {
        Category.find({}, function(err, categories) {
            if (err)
                res.send(err);
            res.json(categories);
        });
    });




  apiRouter.post('/categories1', function(req, res) {

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {

      var file = files.file[0];
      var contentType = file.headers['content-type'];
      var extension = file.path.substring(file.path.lastIndexOf('.'));
      // var destPath = '/' + user.id + '/profile' + '/' + uuid.v4() + extension;
      var destPath = 'uploads/' + uuid.v4() + extension;

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
                Category.findById({'_id': fields._id}, function(err, category) {
                    if (err)
                        res.send(err);
                    category.image = destPath;
                    category.save(function(err) {
                        if (err)
                            res.send(err);
                        res.json("You have successfully added category");
                    })
                    
                });
          // return destPath;
          console.log('File was copied!');
        });

        Category.findById({'_id': fields._id}, function(err, category) {
            if (err)
                res.send(err);
            category.image = 'destPath';
            category.save(function(err) {
                if (err)
                    res.send(err);
                res.json("You have successfully added category");
            })
            
        });
      return false;

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




    apiRouter.post('/categories', function(req, res) {
        console.log("adding category from api..");
        console.log("yes in the categories1..");
        var category = new Category();
        console.log(category);
        console.log(req.body);
        console.log(req.files);
        console.log("yessss..");

//     var form = new multiparty.Form();
//     form.parse(req, function(err, fields, files) {



// console.log("files");
// console.log(err);
// console.log(fields);
// console.log(files);
// // return false;

//       var file = files.file[0];
//       var contentType = file.headers['content-type'];
//       var extension = file.path.substring(file.path.lastIndexOf('.'));
//       // var destPath = '/' + user.id + '/profile' + '/' + uuid.v4() + extension;
//       var destPath = 'uploads/' + uuid.v4() + extension;

//       var headers = {
//         'x-amz-acl': 'public-read',
//         'Content-Length': file.size,
//         'Content-Type': contentType
//       };



//       console.log(file.path);
//       console.log(destPath);

// // copyFile('original.js', 'copy.js', function(error) {
// copyFile(file.path, destPath, function(error) {
//   if (error)
//   {
//     console.log("error in file uploading..");
//     console.error(error);
//   }
//   console.log('File was copied!')
// });
// // return false;

//       // var uploader = s3Client.upload(file.path, destPath, headers);
//       // uploader.on('error', function(err) {
//       //   //TODO handle this
//       // });
//       // uploader.on('end', function(url) {
//       //   //TODO do something with the url
//       //   console.log('file opened:', url);
//       // });
//     });



//         // var category = new Category();


// console.log("api categories..");
// console.log(req.files);



        category.title = req.body.title;
        category.description = req.body.description;
        category.image = "destPath";
        // category.image = 'image_name.jpg';
console.log("check category..");
console.log(category);
// console.log(category.image);



        Category.findOne({'title': req.body.title}, function(err, pst) {
           console.log(pst);
            if (pst) {
                if (!err && pst.title === req.body.title) {
                    res.send("Please make unique your category! Its already exist!");
                }
                else 
                {
                    category.save(function(err, category) {
                        console.log("category");
                        console.log(category);
                        if (err) {
                            res.send(err.message);
                        } else {
                            res.send("You have successfully added category");
                        }
                    })
                }
            } else {
                category.save(function(err, category) {
                    if (err) {
                        res.send(err.message);
                    } else {
                        res.send(category._id);
                        // res.send("You have successfully added category");
                    }
                })
            }
        });
    });


    // add a post
    apiRouter.post('/categories11111111', function(req, res) {
        console.log("adding category from api..");
        // console.log(req);
        // return false;

// apiRouter.postImage = function(req, res)
{
    var form = new multiparty.Form();

// console.log("form");
// console.log(form);
// return false;


    form.parse(req, function(err, fields, files) {

console.log("files");
console.log(err);
console.log(fields);
console.log(files);
return false;
        var file = files.file[0];
        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
        // uuid is for generating unique filenames. 
        var fileName = uuid.v4() + extension;
        var destPath = 'path/to/where/you/want/to/store/your/files/' + fileName;

        // Server side file type checker.
        if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
            fs.unlink(tmpPath);
            return res.status(400).send('Unsupported file type.');
        }

        fs.rename(tmpPath, destPath, function(err) {
            if (err) {
                return res.status(400).send('Image is not saved:');
            }
            return res.json(destPath);
        });
    });
};




console.log("api upload categories..");
console.log(req.body);
return false;




// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     //var code = JSON.parse(req.body.model).empCode;
//     var dest = 'public/uploads/';
//     mkdirp(dest, function (err) {
//         if (err) cb(err, dest);
//         else cb(null, dest);
//     });
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now()+'-'+file.originalname);
//   }
// });

// var upload = multer({ storage: storage });







        category.title = req.body.title;
        category.description = req.body.description;
        // category.image = req.body.image.name;
        // category.image = 'image_name.jpg';
// console.log("check category..");
// console.log(category);
// console.log(category.image);



        // Category.findOne({'title': req.body.title}, function(err, pst) {
        //    console.log(pst);
        //     if (pst) {
        //         if (!err && pst.title === req.body.title) {
        //             res.send("Please make unique your category! Its already exist!");
        //         }
        //         else 
        //         {
        //             category.save(function(err, category) {
        //                 if (err) {
        //                     res.send(err.message);
        //                 } else {
        //                     res.send("You have successfully added category");
        //                 }
        //             })
        //         }
        //     } else {
        //         category.save(function(err, category) {
        //             if (err) {
        //                 res.send(err.message);
        //             } else {
        //                 res.send("You have successfully added category");
        //             }
        //         })
        //     }
        // });


});    

    // get a single post
    apiRouter.get('/categories/:id', function(req, res) {
        Category.findById(req.params.id, function(err, post) {
            if (err)
                res.send(err);

            res.json(post);
        });
    });
    // get a single post
    apiRouter.post('/parmalcat', function(req, res) {
        Category.findById({'_id': req.body.path}, function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

//        

    // update a post
    apiRouter.post('/editparmalcat', function(req, res) {
console.log("in the category editparmalcat");
        console.log(req.body);
        return false;
        Category.findById({'_id': req.body.id}, function(err, category) {
            if (err)
                res.send(err);
            category.title = req.body.title;
            category.description = req.body.description;
            // category.image = "asdf.png";//req.body.image;
            category.save(function(err) {
                if (err)
                    res.send(err);
                res.json('Category updated!');
            })
            
        });
    });
    // delete a post
    apiRouter.post('/delete_category', function(req, res) {

console.log("deleting the category.." + req.body.id);




        Category.remove({
            _id: req.body.id
        }, function(err, post) {
            if (err)
                res.send(err);
            res.json({message: 'Category deleted!'});
        })
    });
};