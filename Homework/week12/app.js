
const bcrypt = require("bcrypt-nodejs");
const bodyParser = require("body-parser");
const configRoutes = require("./routes");
const data = require("./data");
const exphbs = require('express-handlebars');
const express = require("express");
const flash = require('connect-flash');
const fs = require('fs');
const Handlebars = require('handlebars');
const multer  =   require('multer');
const passport = require("passport");
const session = require('express-session');
const static = express.static(__dirname + '/public');
const Strategy = require("passport-local").Strategy;
const upload = multer({ dest: './public/profilePictures/' });
const userData = data.users;
const uuid = require('node-uuid');


// Before asking Passport to authenticate a request, the strategy used by an application must be configured.
// Strategies, and their configuration, are supplied via the use() function.
passport.use('login', new Strategy({
    passReqToCallback : true
    },
    function(req, email, password, done) {
        // check in mongo if a user with username exists or not
        userData.getUserByEmailPassport(email,
            function(err, user) {
                // In case of any error, return using the done method
                if (err){
                    console.log("ERROR in passport use.");
                    return done(err);
                }
                // Username does not exist, log error & redirect back
                if (!user){
                    console.log('User Not Found with username '+email);
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }
                // User exists but wrong password, log the error
                if (!isPasswordValid(user, password)){
                    console.log('Invalid Password');
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
                req.session.user = user;
                // User and password both match, return user from
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));

/*
 In order to support login sessions, Passport will serialize and deserialize
 user instances to and from the session.
 */
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    userData.getUserByIDPassport(id, function(err, user) {
        done(err, user);
    });
});

var isPasswordValid = function(user, password){
    return bcrypt.compareSync(password, user.password);
}

const app = express();
app.use(flash());
app.use(bodyParser.json());

/*
 * Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
 * Multer adds a body object and a file or files object to the request object.
 */
app.post("/signup",upload.single('userPic'),function (req, res, next){
    if (req.file){
        var tmp_path = req.file.path;
        var imageId = uuid.v4();
        var target_path = 'public/profilePictures/' + imageId;
        req.body.image = target_path;

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() {console.log("File Uploaded Successfully"); });
        src.on('error', function(err) { res.json({error: true,message:err}); });
    }
    else {
        var target_path = 'public/images/defaultProfilePic.jpg';
        req.body.image = target_path;
    }
    next();
});

app.post("/updateUserProfilePic",upload.single('userPic'),function (req, res, next){
    if(req.file){
        var tmp_path = req.file.path;
        var imageId = uuid.v4();
        var target_path = 'public/profilePictures/' + imageId;
        req.body.image = target_path;

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() {console.log("File Uploaded Successfully"); });
        src.on('error', function(err) { res.json({error: true, message: err}); });
    }
    else {
        var target_path = 'public/images/defaultProfilePic.jpg';
        req.body.image = target_path;
    }
    next();
});


app.post("/products/editProduct",upload.single('productImage'),function (req, res, next){
    if(req.file){
        var tmp_path = req.file.path;
        var imageId = uuid.v4();
        var target_path = 'public/productImages/' + imageId;
        req.body.image = target_path;

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() {console.log("Product Image Updated Successfully"); });
        src.on('error', function(err) { res.json({error: true,message:err}); });
    }
    else {
        var target_path = 'public/images/defaultProductPic.jpg';
        req.body.image = target_path;
    }
    next();
});

app.post("/sell/sellProduct",upload.single('productImage'),function (req, res, next){
    if(req.file){
        var tmp_path = req.file.path;
        var imageId = uuid.v4();
        var target_path = 'public/productImages/' + imageId;
        req.body.image = target_path;

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() {console.log("Product Image Uploaded Successfully"); });
        src.on('error', function(err) { res.json({error: true,message:err}); });
    }
    else {
        var target_path = 'public/images/defaultProductPic.jpg';
        req.body.image = target_path;
    }
    next();
});

const handlebarsInstance = exphbs.create({
        defaultLayout: 'main',
        // Specify helpers which are only registered on this instance.
        helpers: {
            asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
            }
        },
        partialsDir: [
            'views/partials/'
        ]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    // let the next middleware run:
    next();
};

app.use("/public", static);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a TradeLink application server!");
    console.log("Your routes will be running on http://localhost:3000");
});
