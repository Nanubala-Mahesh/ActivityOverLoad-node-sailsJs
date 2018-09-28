// api/controllers/AuthController.js

// var passport = require('passport');

var _ = require('lodash');



module.exports = {
	//   register function  
	
	register: function (req, res) {
		sails.log("******************", req.body);
		if (req.body.password !== req.body.confirmPassword) {
		  return ResponseService.json(401, res, "Password doesn't match")
		}
	
		var allowedParameters = [
		  "id", "email", "mobile", "password"
		]
		var data = _.pick(req.body, allowedParameters);
		console.log('data', data);
		
		User.create(data).fetch()
		.then(function (user) {
			console.log('then user in register', user);
			
			var responseData = {
				user: user,
				token: JwtService.issue({id: user.id})
			}
			return ResponseService.json(200, res, "User created successfully", responseData)
		})
		.catch(function (error) {
			console.log('catch error in register', error);
				if (error.invalidAttributes){
					return ResponseService.json(400, res, "User could not be created", error.Errors)
				}
		  })
	},
	


	login: function (req, res) {
		var email = req.param('email');
		var password = req.param('password');

		verifyParams(res, email, password)

		User.findOne({email: email})
		.then(function (user) {
			if (!user) {
				console.log('if !user in then ');
				
				return invalidEmailOrPassword(res);
			}
			signInUser(req, res, password, user)
		})
		.catch(function (err) {
			console.log('if err in catch ', err, res);
			return invalidEmailOrPassword(res);
		})
	},
};


function signInUser(req, res, password, user) {
  User.comparePassword(password, user).then(
	function (valid) {
	  if (!valid) {
		console.log('if !valid method');
		return this.invalidEmailOrPassword();
	  } else {
		var responseData = {
		  user: user,
		  token: generateToken(user.id)
		}
		return ResponseService.json(200, res, "Successfully signed in", responseData)
	  }
	}
  ).catch(function (err) {
	return ResponseService.json(403, res, "Forbidden")
  })
};


function invalidEmailOrPassword(res){
	console.log('invalidEmailOrPassword', res);
	
  return ResponseService.json(401, res, "Invalid email or password")
};

function verifyParams(res, email, password){
  if (!email || !password) {
	return ResponseService.json(401, res, "Email and password required")
  }
};


function generateToken(user_id) {
  return JwtService.issue({id: user_id})
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


	// login function
	// login: function (req, res) {
	//     //   checking validations
	//     data = {
	//         email: req.body.email,
	//         password: req.body.password
	//     }

	//     User.create(data).fetch().exec(function (err, user) {
	//         if (err) {
	//             return res.negoiate(err);
	//         }
	//         req.login(user, function (err) {
	//             if (err) {
	//                 return res.negoiate(err);
	//             }

	//             sails.log(`user ${user.id} has logged in`);
	//             return res.send({
	//                 message: 'login successful',
	//                 user
	//             })

	//         })
	//     })
	// },

	// login: function(req, res) {
	//     passport.authenticate('local', function(err, user, info) {
	//         if(err || !user){
	//             sails.log(`user ${err} has logged in`);
				
	//             return res.send({message: 'message', user});
	//         }
	//         req.logIn(user, function(err) {
	//             if (err) res.send(err);
	//             sails.log(`user ${user.id} has logged in`);

	//             return res.send({message: 'info.message', user});

	//         })
	//     })(req,res);
	// },

	// // logout function
	// logout: function (req, res) {
	//     req.logout();
	//     res.send('logout successful');
	// },

