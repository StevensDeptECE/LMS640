const uuid = require('node-uuid');
const bcrypt = require("bcrypt-nodejs");
const db = require('./database');

exports.DefaultSearch = function(user) {

    console.log('DefaultSearch called, i will give you the recent 15 post');

    let reslist = [];
    return new Promise((res, rej) => {
        db.getPosts().then(ps => {
            let len = ps.length;
            reslist = ps.slice(-15, len);
            if (!reslist)
                res([]);
            let getusername_promises = [];
            reslist.forEach(function(element, index) {
                getusername_promises.push(db.getUserById(element.userId));
            });
            return Promise.all(getusername_promises);

        }).then(users => {
            reslist.forEach(function(element, index) {
                element.username = users[index].name;
                // statements
            });
            res(reslist);
        }).catch(err => {
            rej(err);
        })

    });
};

exports.generateScheme = function(origin) {
    let result = {
        post: {
            _id: origin.post._id,
            title: origin.post.title,
            vote: origin.post.vote,
            body: origin.post.body,
            date: origin.post.createDate,
            notAccepted: !origin.post.isAccepted,
            username: origin.post.user.name, // here should be a user name instead of userId
            userpoints: origin.post.user.points,
            userid: origin.post.user._id, // add user id here  by lei
            usericon: origin.post.user.icon
        },
        answer: []
    }

    origin.answer.forEach(function(element, index) {
        result.answer.push({
            usericon: element.user.icon,
            accepted: element.isAccepted,
            _id: element._id,
            title: element.title,
            username: element.user.name,
            userid: element.user._id, // add user id here  by lei
            userpoints: element.user.points,
            vote: element.vote,
            date: element.createDate,
            body: element.body,
            comments: []
        })

        element.comments.forEach(function(oneComment, index) {
            result.answer[result.answer.length - 1].comments
                .push({
                    body: oneComment.commentBody,
                    username: oneComment.user.name,
                    userid: oneComment.user._id
                })
        });
    });
    // console.log(result);
    return result;
}

exports.getpostinfo = function(id) {
    console.log('getpostinfo called, id: ' + id);

    let single_post_result = {}

    return new Promise((resolve, reject) => {
        db.getPostById(id)
            .then((post) => {
                single_post_result.post = post;
                return db.getUserById(post.userId)
            })
            .then((user) => {
                single_post_result.post.user = user
                return db.getAnswersByPostId(single_post_result.post._id)
            })
            .then(answers => {
                let answerUsersPromises = [];
                single_post_result.answer = answers;
                // //console.log('answers: ', answers);

                answers.forEach(function(element, index) {
                    answerUsersPromises.push(db.getUserById(element.userId))
                });
                return Promise.all(answerUsersPromises)
            })
            .then((answerUsers) => {
                let commentsPromises = [];
                single_post_result.answer.forEach(function(element, index) {
                    element.user = answerUsers[index];
                    commentsPromises.push(db.getCommentsByAnwersId(element._id));
                });
                return Promise.all(commentsPromises);
            })
            .then(comments => {
                let allCommentsUsers = []; // 1 - D array
                // //console.log('$comments: ', comments);
                comments.forEach(function(element, index) {
                    single_post_result.answer[index].comments = comments[index];
                    element.forEach(function(element, index) {
                        allCommentsUsers.push(db.getUserById(element.userId));
                    });
                });

                return Promise.all(allCommentsUsers);
                // single_post_result is done
                // be aware of answers and answer, no s !!!!
            })
            .then((allCommentsUsers) => {
                //console.log('$allCommentsUsers, ', allCommentsUsers);
                single_post_result.answer.forEach(function(answer, index) {
                    answer.comments.forEach(function(comment, index) {
                        // search for corresponding user for this comment
                        // console.log(comment)
                        allCommentsUsers.forEach(function(user, index) {
                            // console.log(user);
                            //console.log('####')
                            // console.log(comment.userId);
                            // console.log(user._id);
                            if (`${user._id}` == `${comment.userId}`) {
                                // console.log('$$$$$')
                                comment.user = user;
                            }
                        });
                    });
                });
                resolve(this.generateScheme(single_post_result));
            })
            .catch(err => {
                console.log('err when getpostinfo:');
                console.log(err);
                reject(err);
            })
    });
}

exports.signupcheck= function (email, type) {
    console.log('signupcheck called');
    return db.getUserByEmail(email, type).then(() => {
        console.log('check: existing')
        return Promise.reject("Duplicated Email");
    }).catch(() => {
        console.log('check: no existing')
        return Promise.resolve("haha");
    });
}

exports.edituser= function (id, body) {

    return new Promise((resolve, reject) => {
        db.getUserByEmail(body.email)
            .then(() => {
                reject("Email exists");
            }).catch((res) => {
                console.log(res);
                db.updateUser(id, "name", body.name)
                    .then(user => {
                        return db.updateUser(id, "email", body.email)
                    })
                    .then((user) => {
                        return db.updateUser(id, "pasword", body.password);
                    })
                    .then(user => {
                        resolve("success");
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
    })
}

exports.getuserinfo = function(id) {

    return new Promise((res, rej) => {

        let result = {};

        db.getUserById(id)
            .then(user => {
                // result.user = user;
                res(user)
                // return db.getPostsByUserId(id)
            })
            // .then(posts => {
            //     result.post = posts;
            //     return db.getAnswersByUserId(id)
            // })
            // .then(ans => {
            //     result.answer = ans;
            //     res(result);
            // })
            .catch(err => {
                rej(err);
            })

    });
}

exports.SearchPost = function(query) {
    console.log('in data SearchPost called');

    let reslist = [];
    return new Promise((res, rej) => {
        db.getPosts().then(ps => {
            reslist = ps.filter(x => x.title.search(query) >= 0);
            if (!reslist)
                rej("Not post found");
            let getusername_promises = [];
            reslist.forEach(function(element, index) {
                getusername_promises.push(db.getUserById(element.userId));
            });
            return Promise.all(getusername_promises);

        }).then(users => {
            reslist.forEach(function(element, index) {
                element.username = users[index].name;
                // statements
            });
            res(reslist);
        }).catch(err => {
            rej(err);
        })

    });
}

exports.database = require('./database.js');
module.exports = exports;

let single_post_result_sample = {
    post: {
        title: 'post title',
        vote: 123,
        body: 'post  body,post  body,post  body',
        username: 'Lei Duan',
        userpoints: 3456,
        usericon: "http//:ss",
        date: '11/03/1989'
    },
    answer: [{
        title: "ahahah",
        _id: 3456,
        accepted: true,
        username: 'Lei Diuan',
        userpoints: 4,
        vote: 12312,
        date: '11/03/1989',
        body: 'ans bodyans bodyans bodyans body',
        comments: [{
                body: 'lei lei is gpood',
                username: 'lei'
            }, {
                body: 'heihei',
                username: 'name_123'
            }

        ]

    }, {
        tile: "as",
        _id: 678,
        accepted: false,
        username: 4,
        userpoints: 43,
        vote: 2,
        date: 'ahh',
        body: 'b5678765678909765789',
        comments: [{
                body: 'ffa',
                username: 'faasa'
            }, {
                body: 'fda',
                username: 'dsfa'
            }

        ]
    }]
}