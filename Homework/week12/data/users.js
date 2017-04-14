
const bcrypt = require("bcrypt-nodejs");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');


let exportedMethods = {
    getUserByID(id) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });
    },
    getUserByEmail(email) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ email: email }).then((user) => {
                if (!user) throw "User not found";
                return user;
            });
        });
    },
    addUser(requestBody) {
        var question;
        if(requestBody.securityQuestion == 2) {
            question = "Mother's maiden name?";
        }
        if(requestBody.securityQuestion == 1) {
            question = "City you were born in?";
        }
        return users().then((usersCollection) => {
            let newUser = {
                _id: uuid.v4(),
                email: requestBody.email,
                password: bcrypt.hashSync(requestBody.password),
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                gender: requestBody.gender,
                phoneNumber: requestBody.phoneNumber,
                address: requestBody.address,
                city: requestBody.city,
                state: requestBody.state,
                zipCode: requestBody.zipCode,
                imagePath: requestBody.image,
                security: question,
                answer: requestBody.securityAnswer
            };
            return usersCollection.findOne({ email: requestBody.email }).then((user) => {
                if (user) throw "Email already exists.";
                //return user;
                else {
                    return usersCollection.insertOne(newUser).then((newUserInformation) => {
                        return newUserInformation.insertedId;
                    }).then((newId) => {
                        return this.getUserByID(newId);
                    });
                }
            });
        });
    },
    //This method is used in the passport authentication strategy. cb - callback
    getUserByEmailPassport(email, cb) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ email: email }).then((user) => {
                if (!user) return cb(null, null);;
                return cb(null, user);;
            });
        });
    },

    //This method is used in the passport authentication deserializing. cb - callback
    getUserByIDPassport(id, cb) {
        return users().then((usersCollection) => {
            return usersCollection.findOne({ _id: id }).then((user) => {
                if (!user) cb(new Error('User ' + id + ' does not exist'));
                return cb(null, user);
            });
        });
    },

    updateUser(password, email) {
        return users().then((usersCollection) => {
            let updateUser = {
                password : bcrypt.hashSync(password)
            }
            let updateCommand = {
                $set: updateUser
            };

            return usersCollection.updateOne({ email: email }, updateCommand).then(() => {
                return this.getUserByEmail(email);
            });
        });
    },

    updateAllUserDetails(requestBody) {
        return users().then((usersCollection) => {
            let updateUser = {
                password: bcrypt.hashSync(requestBody.password),
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                gender: requestBody.gender,
                phoneNumber: requestBody.phoneNumber,
                address: requestBody.address,
                city: requestBody.city,
                state: requestBody.state,
                zipCode: requestBody.zipCode,
                security: requestBody.security,
                answer: requestBody.answer
            }
            let updateCommand = {
                $set: updateUser
            };
            return usersCollection.updateOne({ email: requestBody.email }, updateCommand).then(() => {
                return this.getUserByEmail(requestBody.email);
            });
        });
    },

    updateUserPic(requestBody) {
        return users().then((usersCollection) => {
            let updateUser = {
                imagePath: requestBody.image
            }
            let updateCommand = {
                $set: updateUser
            };
            return usersCollection.updateOne({ _id: requestBody.userid }, updateCommand).then(() => {
                return this.getUserByID(requestBody.userid);
            });
        });
    }

}

module.exports = exportedMethods;
