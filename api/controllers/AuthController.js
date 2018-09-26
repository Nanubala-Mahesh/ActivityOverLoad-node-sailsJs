// api/controllers/AuthController.js

var passport = require('passport');

module.exports = {
    //   login function  
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if(err || !user){
                sails.log(`user ${err} has logged in`);
                
                return res.send({message: 'message', user});
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                sails.log(`user ${user.id} has logged in`);

                return res.send({message: 'info.message', user});

            })
        })(req,res);
    },

    // logout function
    logout: function (req, res) {
        req.logout();
        res.send('logout successful');
    },

    // Register function
    register: function (req, res) {
        //   checking validations
        data = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(data).fetch().exec(function (err, user) {
            if (err) {
                return res.negoiate(err);
            }
            // TODO: SEND CONFIRMATION EMAIL TO USER BEFORE LOGIN
            req.login(user, function (err) {
                if (err) {
                    return res.negoiate(err);
                }

                sails.log(`user ${user.id} has logged in`);
                return res.send({
                    message: 'login successful',
                    user
                })

            })
        })
    }

};
//   login: function(req, res) {
//       res.view();
//   },
//   process: function(req, res) {
//       passport.authenticate('local', function(err, user, info) {
        
//         if( (err)||(!user) ) {
//           return res.send({
//               message: 'login failed'
//           });
//           res.send(err);
//         }

//         req.logIn(user, function(err) {
//           console.log('**************', user);
//           console.log('**************', err);
               
//             if(err) res.send(err);
//             return res.send({
//                 message: 'login successful'
//             });
//         });
//       }) (req, res);
//   },

//   logout: function(req, res) {
//       req.logOut();
//       res.send('logout successful');
//   }
// };

// module.exports.blueprints = {
//     actions: true,
//     rest: true,
//     shortcuts: true
// };
