// config/passport.js

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt-nodejs');


// Serialize User
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

// Deserailize ther user
passport.deserializeUser(function (id, cb) {
    User.findOne({id}).exec(function(err,user){
        cb(err, user);
    });
});

// Local 
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(username, password, cb){
        
        User.findOne({email: username}).populate('tasks').exec(function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false, {message: 'email not found'})
            }
            bcrypt.compare(password, user.password, function(err, res) {
            if (!res) {
                return cb(null, false, {message: 'Invalid password'})
            }
            return cb(null, user, {message: 'Login Successful'});
        })
    });
}));


// passport.use(new LocalStrategy({
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         function(email, password, done) {
//           User.findOne({ email: email }).exec(function(err, user) {
//             if(err) { return done(err); }
//             if(!user) { return done(null, false, { message: 'Unknown user ' + email }); }
//             bcrypt.compare(password, user.password, function(_err, res) {
//                 if(!res) return done(null, false, {message: 'Invalid Password'});
//                 return done(null, user);
//             });
//           });
//         }
//     ));




// module.exports = {
//     http: {
//         customMiddleware: function(app) {
//             console.log('Express middleware for passport');
//             app.use( passport.initialize() );
//             app.use( passport.session() );
//         }
//     }
// };