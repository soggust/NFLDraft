var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: false},
  email: {type: String, lowercase: true, trim: true, unique: true, required: true},
  passwordHash: String,
  salt: String,
  profilePic: String,
  joined: String
});

UserSchema.methods.setPassword = function(password){
   this.salt = crypto.randomBytes(16).toString("hex");
   this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
};

UserSchema.methods.checkPassword = function(password){
   var passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
   return (passwordHash === this.passwordHash);
};

// console.log("above createToken()");
UserSchema.methods.createToken = function(){
   return jwt.sign({
      _id: this._id,
      email: this.email,
      profilePic: this.profilePic,
      username: this.username,
      joined: String
   }, "ThisIsASecretCode");
};


mongoose.model('User', UserSchema);
