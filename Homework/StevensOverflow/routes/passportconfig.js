const UserData = require('../data');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


constructorMethod = (passport) => {

    passport.use(new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'email',
            passwordField: 'password'
        },
        function(req, email, password, done) {
            // TODO: need to handle the 401 problem when passwork or email is not right.
            // ref: http://stackoverflow.com/questions/27817024/how-to-handle-passport-authentication-response-and-show-it-to-the-user
            console.log(req.body);
            let type = req.body['login-submit'].split(' ')[3];

            UserData.database.getUserByEmail(email, type).then(user => {
                    console.log('password = ' + user.password);
                    if (user.password === password)
                        return done(null, user);
                    else {
                        console.log('found user by this email, but wrong password');
                        return done(null, false,{message: 'incorrect user password'});
                    }
                })
                .catch(err => {
                    console.log('in passport config, cannt find this email, err:');
                    console.log(err);
                    return done(null, false, {message: 'incorrect user email'});
                });
        }
    ));


    passport.serializeUser(function(user, cb) {
        console.log(user.name);
        cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {
        UserData.database.getUserById(id).then(res => {
            cb(null, res);
        }).catch(err => {
            cb(err, null);
        });
    });

}


module.exports = constructorMethod;