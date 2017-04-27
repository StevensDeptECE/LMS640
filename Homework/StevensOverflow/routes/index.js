//expecting from database
const Data = require('../data');
//expecting from login
db = Data.database;
const configPassport = require('./passportconfig');
const passport = require('passport');
configPassport(passport);

// uplaod file requirement modules
const path = require('path');
const bp = require('body-parser');
const fs = require('fs');
// const busboy = require('connect-busboy');
// const recursiveGetCommentsFromAnswers = (answers, index, dict) => {
//     if (index >= answers.length) {
//         return
//     }
//     Data.database.getCommentsByAnwersId(answers[index]._id)
//     .then((comments) => {
//         dict[answers[index]._id] = comments;
//         recursiveGetCommentsFromAnswers(answers, index + 1, dict);
//     })
// }

const get_method = (app) => {
    app.get('/', (req, res) => {
        // expecting from database
        // get user setting and prefer
        // in order to display the homepage postlist
        // it will always work even user is undefined
        Data.DefaultSearch(req.user).then(postlist => {
            // console.log(postlist[0]._id);
            res.render('partials/home', {
                postList: postlist,
                user: (req.user) ? req.user : "",
            });
        }).catch(err => {
            res.render('partials/home', {
                user: (req.user) ? req.user : "",
                listerrormessage: err
            })
        });
    });
    app.get('/createhw', (req, res) => {
        res.render('partials/createhw', {
        });
    });
    app.get('/post/:id', (req, res) => {
        let isQuestionOwner = false;
        let isUserAuth = req.isAuthenticated();
        Data.getpostinfo(req.params.id).then(postInfo => {
            if (req.isAuthenticated())
                isQuestionOwner = String(postInfo.post.userid) == String(req.user._id)
            res.render('partials/singlepost', {
                user: (req.user) ? req.user : "",
                post: postInfo.post,
                answer: postInfo.answer,
                isQuestionOwner: isQuestionOwner,
                isUserAuth: isUserAuth,
                isUserNotAuth: !isUserAuth
            });
        }).catch(err => {
            res.render('partials/notfound', {
                user: (req.user) ? req.user : "",
                err: err
            });
        });
    });
    app.get('/test', (req, res) => {
        Data.database.getUsers().then(ur => {
            res.render('partials/allusers', {
                user: (req.user) ? req.user : "",
                userList: ur
            })
        })
    });
    app.get('/posting', (req, res) => {
        console.log('app.get posting called');
        let isUserAuth = req.isAuthenticated();
        res.render('partials/posting', {
            user: (req.user) ? req.user : "",
            isUserAuth: isUserAuth,
            isUserNotAuth: !isUserAuth
        })
    });
    app.get('/login', (req, res) => {
        res.redirect('/');
    });
    app.get('/upload-hw', (req, res) => {
        console.log(req.isAuthenticated());
        Data.DefaultSearch(req.user).then(postlist => {
            // console.log(postlist[0]._id);
            res.render('partials/upload-hw', {
                postList: postlist,
                user: (req.user) ? req.user : "",
            });
        }).catch(err => {
            res.render('partials/upload-hw', {
                user: (req.user) ? req.user : "",
                listerrormessage: err
            })
        });
    });
    app.get('/logout',
        function(req, res) {
            req.logout();
            res.redirect('/');
        });
    app.get('/profile',
        require('connect-ensure-login').ensureLoggedIn(),
        function(req, res) {
            Data.getuserinfo(req.user._id).then(userinfo => {
                res.render('partials/profile_self', {
                    user: req.user,
                    // postList: userinfo.post,
                    // answerList: userinfo.answer
                })
            });
        });
    app.get('/profile/:id', (req, res) => {
        if (req.user && req.params.id == req.user._id) {
            console.log('in route : redirecting to profile')
            res.redirect('/profile');
            return;
        }
        Data.getuserinfo(req.params.id).then(userinfo => {
            console.log('userinfo.user:');
            console.log(userinfo.user);
            console.log('\nuserinfo.post:')
            console.log(userinfo.post);
            console.log('\nuserinfo.answer:')
            console.log(userinfo.answer);
            res.render('partials/profile', {
                user: (req.user) ? req.user : "",
                profileuser: userinfo.user,
                postList: userinfo.post,
                answerList: userinfo.answer
            })
        }).catch(err => {
            res.render('partials/notfound', {
                user: (req.user) ? req.user : "",
                err: err
            })
        });
    })
    app.get('/', (req, res) => {
        // expecting from database
        // get user setting and prefer
        // in order to display the homepage postlist
        // it will always work even user is undefined
        Data.DefaultSearch(req.user).then(postlist => {
            // console.log(postlist[0]._id);
            res.render('partials/home', {
                postList: postlist,
                user: (req.user) ? req.user : "",
                // a: "what the fuck"
            });
        }).catch(err => {
            res.render('partials/home', {
                user: (req.user) ? req.user : "",
                listerrormessage: err
            })
        });
    });
    // when search cliked with a 'post' dropdown tag
    app.get('/search/:searchpost', (req, res) => {
        //excepting searching ULR like :
        // :3000/search?q=java
        // then i got java
        Data.SearchPost(req.query.q).then(postlist => {
            res.render('partials/home', {
                postList: postlist,
                user: (req.user) ? req.user : "",
            });
        }).catch(err => {
            res.render('partials/notfound', {
                user: (req.user) ? req.user : "",
                err: err
            })
        });
    });
    // when search cliked with a 'user' dropdown tag
    // search user ???  not sure
    app.get('/searchuser', (req, res) => {
        //excepting searching ULR like :
        // :3000/search?q=java
        // then i got java
        Data.user.Search(req.query.q).then(userlist => {
            res.render('partials/userlist', {
                list: userlist,
                user: (req.user) ? req.user : "",
            })
        }).catch(err => {
            res.render('partials/home', {
                user: (req.user) ? req.user : "",
                listerrormessage: err
            })
        });
    });
}

const post_method = (app) => {

    console.log('post_method');
    app.post('/voteUp', (req, res) => {
        console.log('voting up on router');
        console.log(req.body);
        let id = req.body.id;
        let num = req.body.num;
        db.updatePost(id, "vote", num)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log('failed to upvote for question: ', id);
                console.log(err);
                return db.updateAnswer(id, "vote", num);
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log('failed to upvote for answer: ', id);
                console.log(err);
            })
    })
    app.post('/voteDown', (req, res) => {
        console.log('voting down on router');
        console.log(req.body);
        let id = req.body.id;
        let num = req.body.num;
        db.updatePost(id, "vote", num)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log('failed to downvote for question: ', id);
                console.log(err);
                return db.updateAnswer(id, "vote", num);
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log('failed to downvote for answer: ', id);
                console.log(err);
            })
    })
    app.post('/acceptAnswer', (req, res) => {
            if (req.isAuthenticated()) {
                let acceptId = req.body.acceptId;
                console.log(acceptId);
                // verify user: check if the current user is question owner
                Data.database.getAnswerById(acceptId)
                    .then(answer => {
                        return Data.database.getPostById(answer.postId)
                    })
                    .then(post => {
                        console.log('getting post: ', post);
                        if (String(post.userId) == String(req.user._id)) {
                            return Promise.all([Data.database.updateAnswer(acceptId, "isAccepted", true), Data.database.updatePost(post._id, "isAccepted", true)])
                        } else {
                            return Promise.reject("accepting failed");
                        }
                    })
                    .then(result => {
                        console.log('accepted result: ', result);
                        res.status(200).send({
                            accepted: true
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(200).send({
                            accepted: false
                        })
                    })
            } else {
                res.status(200).send({
                    accepted: false
                })
            }
        })
        //post method to create a new post(quesiton)
    app.post('/posting', (req, res) => {
        console.log('in route post posting callde');
        req.body.createDate = new Date();
        req.body.updateDate = new Date();
        Data.database.createPost(req.body, req.user._id).then(newpost => {
            console.log('createPost successed');
            res.redirect('/post/' + newpost._id);
        }).catch(err => {
            console.log('createPost falied, err:');
            console.log(err);
            res.render('partials/posting', {
                message: err
            });
        });
    });
    //the single post page
    app.post('/login',
        passport.authenticate('local'), (req, res) => {
            // console.log(req);
            res.redirect('/profile');
        }
    );
    app.post('/signup', (req, res) => {
        console.log(req.body.type);
        // res.send("received");
        let type = req.body.type;
        Data.signupcheck(req.body.email, type).then(() => {
            console.log("in route /signup")
            Data.database.createUser(req.body, type).then(user => {
                console.log("createUser successed:"); //e.g.  sign up successed, usrname: pasword:
                console.log(user);
                /* refer from
                http://code.runnable.com/VKHrGJKvwo55gHL7/express-passport-js-login-and-register-for-node-js-and-hello-world
                */
                passport.authenticate('local')(req, res, function() {
                    res.json({
                        "status": "success"
                    });
                });
            }).catch(err => {
                console.log('\n in route createUser falied:');
                console.log(err.errmsg.toString());
                res.json({
                    "status": err.errmsg
                });
            });
        }).catch(err => {
            res.json({
                "status": err
            });
        })
    });

    //post method to create a new anster,
    //no single page for answer, the form is on the bottom
    app.post('/answering', (req, res) => {
        console.log('in route answering post called');
        // the postid that this comment belongs to is included in the req.body
        console.log('req.user._id is ');
        console.log(req.body);
        console.log(req.user._id);
        req.body.createDate = new Date();
        req.body.updateDate = new Date();
        Data.database.createAnswer(req.body, req.user._id, req.body.postid).then(ans => {
            console.log('in route ans success, ans:');
            console.log(ans);
            // answer successed, go to the new answer location of the same post page
            res.status(200).send({
                    result: true
                })
                // res.redirect('/post/' + req.body.postid);
        }).catch(err => {
            // answer falied, stay on the post page
            res.status(200).send({
                result: false
            });
            // res.redirect('/post/' + req.body.postid);
        });
    });
    app.post('/editprofile', (req, res) => {
        Data.edituser(req.user._id, req.body).then(info => {
            res.json({
                "status": info
            });
        }).catch(err => {
            console.log('in editprofile route : err:');
            console.log(err);
            res.json({
                "status": "falied",
                msg: err
            })
        });
    });
    //post method to create a new comment,
    //no single page for comment, the form is inside the postpage
    app.post('/commenting', (req, res) => {
        if (!req.isAuthenticated()) {
            res.render('back', {
                loginerrormessage: 'Please login'
            });
        } else {
            console.log('in route post commenting')
                // the answer that this comment belongs to is included in the req.body
                // the post id that the answer belongs to is included in the req.body too
            let newComment = {
                commentBody: req.body.body,
                createDate: new Date(),
                updateDate: new Date()
            }
            Data.database.createComment(newComment, req.user._id, req.body.answerid).then(() => {
                console.log('createComment success');
                // comment successed, go to the new comment location of the same post page
                res.redirect('back');
            }).catch(err => {
                console.log('err when createComment err:')
                console.log(err);
                // comment falied, stay on the post page
                res.redirect('back');
            });
        }
    });

    app.post('/upload-hw', (req, res) => {

        let bb = req.busboy;
        req.pipe(req.busboy);
        let fileType = "CPP";

        bb.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
            // console.log('Field [' + fieldname + ']: value: ' + (val));
            if (fieldname === 'project-type')
                fileType = val;
        });

        bb.on('file', function(fieldname, file, filename) {
            console.log('uploading file');
            var fstream = fs.createWriteStream(path.join(__dirname, "..", "data", fileType, filename));
            file.pipe(fstream);
            fstream.on('close', function() {
                // res.redirect('/upload-hw');
                console.log('upload file complete');
                // res.json({status: 'success'});
            });
        });
        bb.on('finish', function() {
            res.render('partials/upload-hw', {
            });
        })
    })
}

const constructorMethod = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    get_method(app);
    post_method(app);
    //http://stackoverflow.com/questions/26859349/can-you-authenticate-with-passport-without-redirecting
    // app.post('/login',
    //     passport.authenticate('local'),
    //     function(req, res) {
    //         // If this function gets called, authentication was successful.
    //         // `req.user` contains the authenticated user.
    //         res.json({"status":"success","user":req.user});
    //     });
    //form page for creating a new post(quesiton)
    app.use("*", (req, res) => {
        console.log('error : 404');
        res.sendStatus(404);
    });
};
module.exports = constructorMethod;