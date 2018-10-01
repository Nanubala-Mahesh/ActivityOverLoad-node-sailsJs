/**
 * UserProfile.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    avatar: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    address:{
      type: 'text'
    },

    user:{
      model: "User"
    }

  }

};



// access_key_id: API KEY

// secret_Access_key: ACCESS KEY

// bucket name: sailsdb