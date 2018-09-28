var jwt = require('jsonwebtoken');
var jwtSecret = sails.config.secrets.jwtSecret;


console.log('jwtService file jwtSecret', jwtSecret);

module.exports = {
  issue: function (payload) {
    console.log( 'jwtService file  method issue', payload );
    token = jwt.sign(payload, jwtSecret, {expiresIn: 180 * 60})
    return token
  },

  verify: function (token, callback) {
    console.log('jwtService file  method verify', token);
    
    return jwt.verify(token, jwtSecret, callback);
  }
}
