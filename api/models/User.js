/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');


module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      // protected: true,
      minLength: 6,
      columnName: "encryptedPassword"
    },
    mobile: {
      type: 'number',
      required: true 
    },
    token: {
      type: 'string'
    },
    

    // user has one userprofile

    UserProfile: {
      model: "UserProfile"
    },
    
    // user has many tasks
    
    tasks: {
      collection: 'Task',
      via: 'users'
    }

  },

  // override default toJSON
    
  json: function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if(err) {
            console.log(err);
            return cb(err);
          } else {
            user.password = hash;
            console.log('bcrypt hash', hash);
            return cb(null, user);
          }
        });
    });
  }

};

