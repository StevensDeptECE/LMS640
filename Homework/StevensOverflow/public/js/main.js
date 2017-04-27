$(function() {

    // $('#loginBtn').modal('show');
    var loginbtn = $("#loginBtn");
    var userbtn = $("#userbtn");
    var loginmode = $("#loginModal");
    var searchbtn = $("#searchbtn");
    var signup_formAlert = $("#signup-form-alert")

    // -- sign up form --\\
    var sign_up_username = $("#signup-username");
    var sign_up_email = $("#signup-email");
    var sign_up_password = $("#signup-password");


    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('.register-submit').click(function(event) {
        event.preventDefault();
        let reqType = event.currentTarget.id;
        console.log(reqType);

        var sign_up_username = $("#signup-username").val();
        var sign_up_email = $("#signup-email").val();
        var sign_up_password = $("#signup-password").val();
        var confirm_password = $("#confirm-password").val();
        if (!sign_up_username) {
            signup_formAlert.text('You must provide a username');
            signup_formAlert.removeClass('hidden');
            return;
        }
        if (!sign_up_email) {
            signup_formAlert.text('You must provide a email');
            signup_formAlert.removeClass('hidden');
            return;
        }
        if (!sign_up_password) {
            signup_formAlert.text('You must provide a password');
            signup_formAlert.removeClass('hidden');
            return;
        }
        if (confirm_password !== sign_up_password) {
            signup_formAlert.text('Confrim Password does not match');
            signup_formAlert.removeClass('hidden');
            return;
        }

        if (sign_up_username && sign_up_email && sign_up_password) {
            var requestConfig = {
                method: "POST",
                url: "/signup",
                contentType: 'application/json',
                data: JSON.stringify({
                    id: "",
                    name: sign_up_username,
                    email: sign_up_email,
                    password: sign_up_password,
                    type: reqType,
                }),
            };

            $.ajax(requestConfig).then(function(responseMessage) {
                console.log('using ajax in submit');
                if (responseMessage.status === "success") {
                    //jump to new note after add note successed
                    console.log('in front js, sigup successed, goingto jump');
                    window.location.href = '/profile';
                } else {
                    console.log('in front js: signup failed')
                    console.log(responseMessage);
                    console.log(responseMessage.status);
                    signup_formAlert.text(responseMessage.status);
                    signup_formAlert.removeClass('hidden');
                }
            })
        }
    })

    $("#register-form").submit(function(event) {
        event.preventDefault();
        console.log(event);
    });

    userbtn.click(function() {
        console.log('userbtn clicked');
        window.location.href = '/profile';
        /* body... */
    });
    searchbtn.click(function() {
        console.log('searchbtn clicked');
        var link = '/searchpost?q=' + $("#searchbox").val();;
        console.log("going to jump to" + link);
        window.location.href = link;
        /* body... */
    });
    $(".clickable-row").click(function() {
        window.location.href = $(this).data("href");
    });

    console.log('userbtn.val() is ' + userbtn.val());
    if (userbtn.val().length > 0) {
        console.log('in front, userbtn length >0');
        // loginbtn.addClass("hidden");
        userbtn.removeClass("hidden");
    } else {
        console.log('in front, userbtn length does not>0');
        loginbtn.removeClass('hidden');
    }

    $('.login-submit').click(function(event) {
        event.preventDefault();
        let reqType = event.currentTarget.id.split('-')[1];
        console.log(reqType);

        let email = $("#username").val();
        let pass = $('#password').val();


        // var sign_up_username = $("#signup-username").val();
        // var sign_up_email = $("#signup-email").val();
        // var sign_up_password = $("#signup-password").val();
        // var confirm_password = $("#confirm-password").val();
        if (!email) {
            // login_formAlert.text('You must provide a email');
            // login_formAlert.removeClass('hidden');
            return;
        }
        if (!pass) {
            // login_formAlert.text('You must provide a password');
            // login_formAlert.removeClass('hidden');
            return;
        }

        if (email && pass) {
            var requestConfig = {
                method: "POST",
                url: "/login",
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,
                    password: pass,
                    type: reqType,
                }),
            };

            $.ajax(requestConfig).then(function(responseMessage) {
                console.log('using ajax in submit');
                if (responseMessage.status === "success") {
                    //jump to new note after add note successed
                    console.log('in front js, login successed, going to jump');
                    window.location.href = '/profile';
                } else {
                    console.log('in front js: login failed')
                    console.log(responseMessage);
                    // console.log(responseMessage.status);
                    // signup_formAlert.text(responseMessage.status);
                    // signup_formAlert.removeClass('hidden');
                }
            })
        }
    })

    // $("#register-form").submit(function(event) {
    //     event.preventDefault();
    //     console.log(event);
    // });

    // userbtn.click(function() {
    //     console.log('userbtn clicked');
    //     window.location.href = '/profile';
    //     /* body... */
    // });
    // searchbtn.click(function() {
    //     console.log('searchbtn clicked');
    //     var link = '/searchpost?q=' + $("#searchbox").val();;
    //     console.log("going to jump to" + link);
    //     window.location.href = link;
    //     /* body... */
    // });
    // $(".clickable-row").click(function() {
    //     window.location.href = $(this).data("href");
    // });

    // console.log('userbtn.val() is ' + userbtn.val());
    // if (userbtn.val().length > 0) {
    //     console.log('in front, userbtn length >0');
    //     // loginbtn.addClass("hidden");
    //     userbtn.removeClass("hidden");
    // } else {
    //     console.log('in front, userbtn length does not>0');
    //     loginbtn.removeClass('hidden');
    // }
});

let queTitle = $('#queTitle');

$('#byTitle').click(function(event) {
    queTitle.text('Question title');
});

$('#byContent').click(function(event) {
    queTitle.text('Question content');
    
});

$('#byName').click(function(event) {
    queTitle.text('Username');
    
});

$('#byEmail').click(function(event) {
    queTitle.text('Useremail');

});