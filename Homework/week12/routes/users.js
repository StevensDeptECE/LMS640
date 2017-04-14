
const data = require("../data");
const express = require('express');
var fs = require('fs');
const path = require('path');
const passport = require("passport");
const router = express.Router();
const userData = data.users;
const productData = data.products;
var xss = require('xss');


router.get("/", function (request, response) {
    if (request.session.passport && request.session.passport.user){
        response.redirect("/myprofile");
    }
    else
        response.redirect("/login");
});

router.get("/successfulSignup", function(request, response) {
    response.render("user/successSignupScreen", {partial:"home-scripts"});
});

router.get("/login", function (request, response) {
    if (request.session.passport && request.session.passport.user){
        response.redirect("/myprofile");
    }
    else
        response.render("user/loginform", {partial:"userlogin-scripts", message: request.flash('message')});
});

router.get("/myprofile", function(request, response) {
    if (request.user === undefined) response.redirect('/login');
    else response.render('user/myprofile', { user: request.user, partial:"mainscreen-scripts" });
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/myprofile',
    failureRedirect: '/login',
    failureFlash : true
}));

router.get('/logout', function(request, response){
    request.logout();
    response.redirect('/login');
});

router.get("/signup", function (request, response) {
    if (request.session.passport && request.session.passport.user)
        response.redirect("/myprofile");
    else
        response.render("user/signupform",  {partial:"mainscreen-scripts"});

});

router.post("/signup", function (request, response) {
    var requestData = request.body;
    userData.addUser(request.body)
        .then((newUser) => {
            response.redirect("/successfulSignup");
        }).catch((e) => {
            console.log(e);
            response.render("user/signupform",{error: e,partial:"mainscreen-scripts",firstName: xss(requestData.firstName), lastName: xss(requestData.lastName), gender: requestData.gender, email:xss(requestData.email),password:requestData.password, phoneNumber:xss(requestData.phoneNumber),address:xss(requestData.address),city:xss(requestData.city),state:xss(requestData.state),zipCode:xss(requestData.zipCode)});
        });
});

router.post("/login", function (request, response) {
    console.log("Post Method for login form.")
});

router.get("/about", function (request, response) {
    response.render("aboutPage", {partial:"userlogin-scripts", user:request.user});
});

router.get("/forgotpassword", function (request, response) {
    response.render("user/forgotpassword", {partial:"userlogin-scripts"});
});

router.post("/forgotpassword", function (request, response) {
    userData.getUserByEmail(request.body.username).then((user)=>{
        response.render("user/securityQuestion", {partial:"security-scripts", user: user});
    }).catch(() => {
        response.render("user/forgotpassword", {partial:"userlogin-scripts", message:"Email not registered."});
    });
});

router.post("/checkSecurity", function (request, response) {
    // Update user in DB
    userData.updateUser(request.body.cnfpassword, request.body.email).then((user)=>{
        response.redirect("/login");
    }).catch(() => {
        response.json({ error: true, message:"User not updated!"});
    });
});

router.get("/updateProfile", function (request, response) {
    if (request.session.passport && request.session.passport.user) {
        userData.getUserByID(request.session.passport.user).then((user)=>{
            response.render("user/updateProfile", {partial:"mainscreen-scripts", user: user});
        }).catch(() => {
            response.json({ error: true, message:"User not updated!"});
        });
    }
    else
        response.redirect("/login");
});

router.post("/updateUser", function (request, response) {
    // Update user in DB
    userData.updateAllUserDetails(request.body).then((user)=>{
        response.json({ success: true, message: user});
    }).catch(() => {
        response.json({ error: true, message:"User not updated!"});
    });
});

//Update user profile picture
router.post("/updateUserProfilePic", function (request, response) {
    userData.updateUserPic(request.body).then((user)=>{
        response.redirect("/myprofile");
    }).catch(() => {
        response.redirect("/myprofile");
    });
});

module.exports = router;
