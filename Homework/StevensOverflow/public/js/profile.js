(function($, location) {
    // Let"s start writing AJAX calls!


    console.log("location.hash is ");
    console.log(location.hash)

    window.onhashchange = (function() {
        load(location["hash"]);
        /* body... */
    })
    var tag1 = $("#tag1");
    var tag2 = $("#tag2");
    var tag3 = $("#tag3");
    var tag4 = $("#tag4");
    var body1 = $("#tag1content");
    var body2 = $("#tag2content");
    var body3 = $("#tag3content");
    var body4 = $("#tag4content");
    var edit_formAlert = $("#edit-form-alert");

    var body = $("#bodycontainer");
    console.log('body is ');
    console.log(body);

    body.css('margin-top', '40px');

    load(location["hash"]);

    $("#edit-profile-form").submit(e => {
        e.preventDefault();
        var name = $("#edit-name").val();
        var email = $("#edit-email").val();
        var password = $("#edit-password").val();
        var confirmpassword = $("#edit-confirm-password").val();
        if (!name) {
            edit_formAlert.text('You must provide a username');
            edit_formAlert.removeClass('hidden');
            return;
        }
        if (!email) {
            edit_formAlert.text('You must provide a email');
            edit_formAlert.removeClass('hidden');
            return;
        }
        if (!password) {
            edit_formAlert.text('You must provide a password');
            edit_formAlert.removeClass('hidden');
            return;
        }
        if (confirmpassword !== password) {
            edit_formAlert.text('Confrim Password does not match');
            edit_formAlert.removeClass('hidden');
            return;
        }

        if (name && email && password) {
            var requestConfig = {
                method: "POST",
                url: "/editprofile",
                contentType: 'application/json',
                data: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                })
            };

            $.ajax(requestConfig).then(function(responseMessage) {
                console.log('using ajax in submit');
                if (responseMessage.status === "success") {
                    //jump to new note after add note successed
                    console.log('in front js, edit successed, goingto jump');
                    window.location.href = '/profile#edit';
                } else {
                    console.log('in front js: signup failed')
                    console.log(responseMessage.status);
                    edit_formAlert.text(responseMessage.status);
                    edit_formAlert.removeClass('hidden');
                }
            })
        }

    });









    function load(arg) {
        switch (arg) {
            case "#profile":
                hiddenall();
                body1.removeClass("hidden");
                tag1.addClass("active");

                // statements_1
                break;
            case "#edit":

                hiddenall();
                body2.removeClass("hidden");
                tag2.addClass("active");

                // statements_1
                break;
            case "#question":

                hiddenall();
                body3.removeClass("hidden");
                tag3.addClass("active");

                // statements_1
                break;
            case "#answer":

                hiddenall();
                body4.removeClass("hidden");
                tag4.addClass("active");

                // statements_1
                break;
            default:
                // statements_def
                break;
        }
        // body... 
    }

    function hiddenall() {
        body1.addClass("hidden");
        body2.addClass("hidden");
        body3.addClass("hidden");
        body4.addClass("hidden");
        tag1.removeClass("active");
        tag2.removeClass("active");
        tag3.removeClass("active");
        tag4.removeClass("active");
        /* body... */
    }


})(window.jQuery, window.location);