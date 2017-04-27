const mongoose = require('mongoose');
const xss = require('xss');

mongoose.connect('mongodb://localhost/canvas');

var GraderSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
    },
    password: String,
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    icon: {
        type: String,
        lowercase: true,
    },
    homeworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
});
var Grader = mongoose.model('Grader', GraderSchema);

var StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
    },
    password: String,
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    icon: {
        type: String,
        lowercase: true,
    },
    homeworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    }],
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    // answers: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Answer'
    // }],
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    // }]
});
var Student = mongoose.model('Student', StudentSchema);

var CourseSchema = new mongoose.Schema({

    courseId: String,
    // postId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post'
    // },

    description: String,
    grader: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grader'
    }],

    // attachments: String,
    // isAccepted: Boolean,
    // vote: {
    //     type: Number,
    //     default: 0
    // },
    // createDate: Date,
    // updateDate: Date,
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    homeworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework',
    }]
});
var Course = mongoose.model('Course', CourseSchema);

var HomeworkSchema = new mongoose.Schema({
    hwId: String,
    description: String,
    isGraded: {
        type: Boolean,
        default: false
    },
    grade: {
        type: Number,
        default: 0
    },
    attachments: String,
    projectType: String,
    createDate: Date,
    updateDate: Date,
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    grader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grader'
    }
});
var Homework = mongoose.model('Homework', HomeworkSchema);

module.exports = {
    createHomework: function(hw) {
        return new Promise((resolve, reject) => {
            let homework = new Homework(hw);
            homework.save(function(err, homew) {
                if (err) {
                    reject(err);
                }
                resolve(homew);
            })          
        })
    },
    createUser: function(userObject, type, callback) {
        console.log('createUser called');
        return new Promise((resolve, reject) => {
            if (type === "grader") {
                var grader = new Grader(userObject);
                grader.save(function(err, user) {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                });
            } else {
                var student = new Student(userObject);
                student.save(function(err, user) {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                });
            }
        })
    },
    getUsers: function(type, callback) {
        console.log("get users called " + type);
        return new Promise((resolve, reject) => {
            if (type) {
                if (type === "grader") {
                    Grader.find(function(err, users) {
                        console.log('find grader')
                        if (err) {
                            reject(err);
                        }
                        resolve(users);
                    })    
                } else {
                    Student.find(function(err, users) {
                        console.log('find student');
                        if (err) {
                            reject(err);
                        }
                        resolve(users);
                    })
                }
            } 
            else {
                Grader.find(function(err, users) {
                    console.log('find grader')
                    if (err) {
                        Student.find(function(err, users) {
                            console.log('find student');
                            if (err) {
                                reject(err);
                            }
                            resolve(users);
                        })
                    } else 
                        resolve(users);
                }) 
            }
        })
    },

    deleteUser: function(id, callback) {
        return new Promise((resolve, reject) => {
            User.findById(id, function(err, user) {
                if (err) {
                    reject(err)
                }
                user.remove();
                resolve("Removed")
            })
        })
    },
    updateUser: function(id, field, value, callback) {
        return new Promise((resolve, reject) => {

            a = {};
            a[field] = value;
            User.update({
                _id: id
            }, {
                $set: a
            }, function(err, us) {
                if (err) {
                    reject(err)
                }
                resolve(us)
            });
        })

    },
    getUserById: function(id, callback) {
        return new Promise((resolve, reject) => {
            Grader.findById(id, function(err, us) {
                if (err) {
                    reject(err)
                }
                console.log(us);
                resolve(us)
            })
        })
    },
    getUserByEmail: function(email, type, callback) {
        console.log("getUserByEmail called")
        return new Promise((resolve, reject) => {
            this.getUsers(type).then(usr => {
                let user_found = usr.filter(x => x.email === email).shift();
                if (!user_found)
                    reject("Not user found by this email");
                else {
                    console.log(`usr found: ${email}`)
                    resolve(user_found);
                }
            })
        })
    },
    getPosts: function(callback) {
        console.log('in database getPosts called');

        return new Promise((resolve, reject) => {

            Post.find(function(err, posts) {
                if (err) {
                    reject(err);
                }
                resolve(posts);
            });
        })
    },
    createPost: function(postObject, userId, callback) {
        console.log('createPost called');
        postObject.body = xss(postObject.body);
        return new Promise((resolve, reject) => {
            var post = new Post(postObject);
            this.getUserById(userId)
                .then((us) => {
                    post.userId = us;
                    post.save(function(err, post) {
                        if (err) {
                            reject(err);
                        }
                        us.posts.push(post);
                        us.save();
                        resolve(post);
                    });
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
    deletePost: function(id, callback) {
        return new Promise((resolve, reject) => {

            Post.findById(id, function(err, post) {
                if (err) {
                    reject(err)
                }
                post.remove();
                resolve("Removed")
            })
        })
    },
    updatePost: function(id, field, value, callback) {
        return new Promise((resolve, reject) => {

            a = {};
            a[field] = value;
            Post.update({
                _id: id
            }, {
                $set: a
            }, function(err, post) {
                if (err) {
                    reject(err)
                }
                resolve(post)
            });
        })
    },
    getPostById: function(id, callback) {
        return new Promise((resolve, reject) => {

            Post.findById(id, function(err, post) {
                if (err) {
                    reject(err)
                }
                resolve(post)
            })
        })
    },

    getAnswers: function(callback) {
        return new Promise((resolve, reject) => {

            Answer.find(function(err, answers) {
                if (err) {
                    reject(err);
                }
                resolve(answers);
            });
        })
    },
    createAnswer: function(postObject, userId, postId, callback) {
        postObject.body = xss(postObject.body);
        return new Promise((resolve, reject) => {
            var answer = new Answer(postObject);
            this.getUserById(userId).then(us => {
                answer.userId = us;
                console.log("Hola")
                Post.findById(postId, function(err, post) {
                    if (err) {
                        reject(err)
                    }
                    answer.postId = post;
                    answer.save(function(err, answer) {
                        if (err) {
                            reject(err);
                        }
                        us.answers.push(answer);
                        post.answers.push(answer);
                        us.save();
                        post.save();
                        resolve(answer);
                    });
                });
            });
        })
    },
    deleteAnswer: function(id, callback) {
        return new Promise((resolve, reject) => {

            Answer.findById(id, function(err, answer) {
                if (err) {
                    reject(err)
                }
                answer.remove();
                resolve("Removed")
            })
        })
    },
    updateAnswer: function(id, field, value, callback) {
        return new Promise((resolve, reject) => {

            a = {};
            a[field] = value;
            Answer.update({
                _id: id
            }, {
                $set: a
            }, function(err, answer) {
                if (err) {
                    reject(err)
                }
                resolve(answer)
            });
        })
    },
    getAnswerById: function(id, callback) {
        return new Promise((resolve, reject) => {
            Answer.findById(id, function(err, answer) {
                if (err) {
                    reject(err)
                }
                resolve(answer)
            })
        })
    },

    getComments: function(callback) {
        return new Promise((resolve, reject) => {

            Comment.find(function(err, comments) {
                if (err) {
                    reject(err);
                }
                resolve(comments);
            });
        })
    },
    createComment: function(postObject, userId, answerId, callback) {
        console.log('creating comment')
        postObject.commentBody = xss(postObject.commentBody);
        return new Promise((resolve, reject) => {

            var comment = new Comment(postObject);
            this.getUserById(userId)
            .then(us => {

                console.log(us);
                if (!us) {
                    reject("User not found");
                }
                comment.userId = us;
                console.log(answerId);
                Answer.findById(answerId, function(err, answer) {
                    comment.answerId = answer;
                    comment.save(function(err, comment) {
                        if (err) {
                            reject(err);
                        }
                        us.comments.push(answer);
                        us.save();
                        answer.comments.push(comment);
                        answer.save();
                        resolve(answer);
                    });
                })
            })
        })
    },
    deleteComment: function(id, callback) {
        return new Promise((resolve, reject) => {

            Comment.findById(id, function(err, comment) {
                if (err) {
                    reject(err);
                }
                comment.remove();
                resolve("Removed")
            })
        })
    },
    updateComment: function(id, field, value, callback) {
        return new Promise((resolve, reject) => {

            a = {};
            a[field] = value;
            Comment.update({
                _id: id
            }, {
                $set: a
            }, function(err, comment) {
                if (err) {
                    reject(err)
                }
                resolve(comment)
            });
        })
    },
    getCommentById: function(id, callback) {
        return new Promise((resolve, reject) => {

            Comment.findById(id, function(err, comment) {
                if (err) {
                    reject(err)
                }
                resolve(comment)
            })
        })
    },

    getCommentsByUserId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Comment.find({
                userId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    },
    getCommentsByAnwersId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Comment.find({
                answerId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    },
    getPostsByUserId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Post.find({
                userId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    },
    getAnswersByUserId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Answer.find({
                userId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    },
    getAnswersByPostId: function(id, callback) {
        return new Promise((resolve, reject) => {

            Answer.find({
                postId: id
            }, function(err, us) {
                if (err) {
                    reject("An error has ocurred")
                }
                resolve(us)
            })
        })
    }
};