const express = require('express'),
    app = express(),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    configureRoutes = require('./routes'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    exphbs = require('express-handlebars'),
    Handlebars = require('handlebars');

const busboy = require('connect-busboy');
app.use(busboy());

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

//-------------------------- set up express for password --------------------------
// Most middleware (like cookieParser) is no longer bundled with Express and must be installed separately
// Expresss session must be provide before passport session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //http://stackoverflow.com/questions/11277779/passportjs-deserializeuser-never-called
    cookie: {
        secure: false // true for https
    }
}))

app.use(flash()); // passport need this method to use flush (express doesn't have this method for build int after 3.x)
app.use(cookieParser()); // password need to user cookie to maintain a session

//-------------------------- static page --------------------------
app.use('/public', express.static(__dirname + '/public'));

//-------------------------- body parser --------------------------
// parse application/x-www-form-urlencoded
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }))

//-------------------------- setup for handle bars --------------------------
app.use(rewriteUnsupportedBrowserMethods);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configureRoutes(app);

app.listen(8080, 'localhost', () => {
    console.log('server running on http://localhost:3000');
});


// const app = require("express")();

// const static = require("express").static(__dirname + '/public');

// const exphbs = require('express-handlebars');
// const Handlebars = require('handlebars');
// const handlebarsInstance = exphbs.create({
//     defaultLayout: 'main',
//     // Specify helpers which are only registered on this instance.
//     helpers: {
//         asJSON: (obj, spacing) => {
//             if (typeof spacing === "number")
//                 return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

//             return new Handlebars.SafeString(JSON.stringify(obj));
//         }
//     },
//     partialsDir: [
//         'views/scriptspartial/'
//     ]
// });

// const configRoutes = require("./routes");

// const rewriteUnsupportedBrowserMethods = (req, res, next) => {
//     // If the user posts to the server with a property called _method, rewrite the request's method
//     // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
//     // rewritten in this middleware to a PUT route
//     if (req.body && req.body._method) {
//         req.method = req.body._method;
//         delete req.body._method;
//     }

//     // let the next middleware run:
//     next();
// };


// // ---------- for debug only ----------
// app.use(function(req, res, next) {
          
//         next();
//     })



// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: false // true for https
//     }
// }));

// app.use(require('connect-flash')());
// app.use(require('cookie-parser')());


// app.use("/public", static);

// app.use(require("body-parser").json());
// app.use(require("body-parser").urlencoded({
//     extended: true
// }));

// app.use(rewriteUnsupportedBrowserMethods);

// app.engine('handlebars', handlebarsInstance.engine);
// app.set('view engine', 'handlebars');




// configRoutes(app);

// app.listen(3000, () => {
//     console.log("We've now got a server!");
//     console.log("Your routes will be running on http://localhost:3000");
// });
