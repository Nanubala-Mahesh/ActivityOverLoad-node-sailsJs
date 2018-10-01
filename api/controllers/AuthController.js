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
		  "id", "email", "mobile", "password", "token"
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

			User.update({id: user.id}).set({token: responseData.token }).then(users => {
				    console.log('update token0000000000000000000', users);
				  }).catch((err)=>{
						console.log('error token0000000000000000000',err);
						
					})

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




