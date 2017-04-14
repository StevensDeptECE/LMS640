


function validateUserLoginForm()
{
    var returnresult = false;
    jQuery(function($) {
        try {
            var email = $("#username").val();
            var password = $("#password").val();

            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");

            if (!email) throw "Must provide email.";
            if(!password || /^\s*$/.test(password) || 0 === password.length) throw "Must provide password.";
            returnresult = true;
        }catch (e) {
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            $("#userCheck").hide();
            returnresult = false;
        }
    });

    return returnresult;
}
