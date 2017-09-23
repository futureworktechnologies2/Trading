// var mongoose = require('mongoose'),
var restful = require('node-restful');
var mongoose = restful.mongoose;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({
  firstname: { type: String},
	lastname: { type: String},
        status: { type: String},
        role: { type: String},
        dob: { type: String},
  email: {
    type: String, 
    required: '{PATH} is required!'
  },
  // salt: { type: String},
  // hash: { type: String},
  phone: { type: String},
  country: { type: String},
  title: { type: String},
  address: { type: String},
  street: { type: String},
  city: { type: String},
  postal_code: { type: String},
  profile_picture: { type: String, default : 'http://localhost:3000/admin/uploads/players/player.png'},
  wallet: { type: Number, default : 0},

        resetPasswordToken: { type: String},
        resetPasswordExpires: { type: String},
        created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field
User.plugin(passportLocalMongoose, { usernameField: 'email' });

User.methods.comparePassword = function(old_password, hash, salt){

// console.log("hash");
// console.log(hash);



// console.log("salt1");
// var salt1 = bcrypt.genSaltSync(25);
// console.log(salt1);
// console.log("salt2");
// console.log(salt);
// console.log("aaaaaaaa");
// Hash the password with the salt
// var hash2 = bcrypt.hashSync(old_password, salt);
// console.log("hash2");
// console.log(hash2);


        //hash password of document that use this schema
//     bcrypt.hash(old_password, salt, null, function (err, hashed) {
//         if (err) {
//             console.log("ERR");
//             console.log(err);
//         } else {
//           console.log("HASHED");
//             console.log(hashed);
//         }
//     });
// console.log("aaaaaaaa");






// bcrypt.compare(old_password, hash, function(err, doesMatch){
//   if (doesMatch){
//      console.log("log him in");
//   }else{
//      console.log("go away");
//   }
//  });



// var user = this;
// console.log("user1");
// console.log(user);
// console.log("user2");


                // var old_hash = bcrypt.hashSync(old_password);
                // console.log("old_hash");
                // console.log(old_hash);
                // return bcrypt.compareSync("1234567", '551a59ca8e24010b1cbee9f7ee15bdaf864127ff0a324c8b290589badc7d7741ede1e37cadfe96f4d0aca7ee48ac48f282df324403134e61551c429fa14310c0bfbf7c61e2e03abd0986df4a51fdb1dcc3074244e7fb94d505fcb645eede0a3b2c4b0c99b139784b255e54f3c14a9b3148b7910b6d3d4b95a23d2b47636393db828b50e2d55b54dd55e6aecf628bdb51ebfc6dbd0431a373f972c3f31df7ee41294f2189c8a1e9565b66639b855694ace59874dcbec983d3bd0d2d4d610574650341465251210d0b17e5c7e1bc64999b8e779ffcf4d310d0116df91a0b8ad82e8f31b0d2b5d60c622539cf94bbd4a22add2e7c594727bb77382e4ef20524fb54a585c0b133e5ef4049bd6ea104a6cdabd08418a4572a768937df3dc7d6c64a52e414d4d8f01d9a82d303b53375e22018adf580ab1e2bdf44cc038de8977bdbfa9e43bea8ce5136f4edab202cbcd3f758cade8f33c07836d53cc281db51a79eae8b15b69a225028dccd36bd34e67a34fe542f1bd43256eb8d4aa5d08121fed5a08916414e7df5d003811ab64c7ee0f71e76fc4b082edd103f870cae4a5de1a5ba76dc0bf4eb07656ee682e813d95e117b350171d62629177b309b093e6beb0f313503929be50ed5c810740163550a38cac88602ac1b8a2b4e98e4b51cadf2e0921fa8d29ee47e4e898fb7ce0f75547adefa8f55ca5536a72adc123d1ba9cd6841');
                // return true;



//console.log(user.password + password);
// return bcrypt.compareSync(password, user.password);
}



User.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});


module.exports = restful.model('User', User);

// // Dependencies
// var restful = require('node-restful');
// var mongoose = restful.mongoose;

// // Schema
// var productSchema = new mongoose.Schema({
//     name: String,
//     sku: String,
//     price: Number
// });

// // Return model
// module.exports = restful.model('Products', productSchema);










