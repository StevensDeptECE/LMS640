
function validateSignupForm()
{
    var returnresult = false;
    var phoneValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var zipValidation = /^\d{5}$|^\d{5}-\d{4}$/;
    var passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    jQuery(function($) {

        try {
            var email = $("#email").val();
            var password = $("#password").val();
            var cnfpassword = $("#cnfpassword").val();
            var phoneNumber = $("#phoneNumber").val();
            var lastName = $("#lastName").val();
            var firstName = $("#firstName").val();
            var city = $("#city").val();
            var address = $("#address").val();
            var state = $("#state").val();
            var zipCode = $("#zipCode").val();
            var verifyText = $("#textVerify").val();
            var gender;
            var securityQues = $('#securityQuestion :selected').text();
            var securityAns = $('#securityAnswer').val();

            if (document.getElementById('mgender').checked) {
                gender = document.getElementById('mgender').value;
            }
            else {
                gender = document.getElementById('fgender').value;
            }

            var errorContainer = document.getElementById("error-container");
            var errorContainer1 = document.getElementById("error-container1");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            var errorTextElement1 = errorContainer1.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");
            errorContainer1.classList.add("hidden");
            var errorMessage = "";
            var errorCheck = false; //if true -> we have errors on the page.

            $( "#fnameerror" ).empty();
            $( "#lnameerror" ).empty();
            $( "#emailerror" ).empty();
            $( "#passworderror" ).empty();
            $( "#cnfpassworderror" ).empty();
            $( "#phoneerror" ).empty();
            $( "#addresserror" ).empty();
            $("#passwordValiderror").empty();
            if (!firstName) {
                errorCheck = true;
                document.getElementById('fnameerror').innerHTML="*Please provide the firstName*";
            }
            if (!lastName) {
                errorCheck = true;
                document.getElementById('lnameerror').innerHTML="*Please provide the lastName*";
            }
            if (!email) {
                errorCheck = true;
                document.getElementById('emailerror').innerHTML="*Please provide the email. ex: abc@stevens.edu *";
            }
            if (!password) {
                errorCheck = true;
                document.getElementById('passworderror').innerHTML="*Please provide the password*";
            }
            if (!cnfpassword) {
                errorCheck = true;
                document.getElementById('cnfpassworderror').innerHTML="*Please confirm password*";
            }
            if (!phoneNumber|| phoneNumber==undefined || !phoneNumber.match(phoneValidation) || phoneNumber.length<10) {
                errorCheck = true;
                document.getElementById('phoneerror').innerHTML="*Please provide a valid contact number*";
            }

            if (!address || !city || !state || !zipCode) {
                errorCheck = true;
                document.getElementById('addresserror').innerHTML="*Please provide all the address field values*";
            }
            else if (!zipCode.match(zipValidation)){
                errorCheck = true;
                document.getElementById('addresserror').innerHTML="*Zipcode invalid*";
            }
            if (password && !password.match(passwordValidation)) {
                errorCheck = true;
                document.getElementById("passwordValiderror").innerHTML="*Please provide a Password containing at least 8 characters, 1 number, 1 upper and 1 lowercase*";
            }

             if (errorCheck) {
                console.log("Error");
                errorContainer1.classList.remove("hidden");
                return false;
            }

            // Email format and domain verification
            var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.match(emailformat))
            {
                var domain = email.split("@")[1];
                if ($.inArray(domain, ['stevens.edu']) == -1) {
                    // InValid domain
                    throw "Please provide a valid Stevens email.";
                }
            }
            else
            {
                throw "Please provide a valid email format. ex. abc@stevens.edu";
            }

            if (password != cnfpassword) {
                throw "Password confirmation failed.";
            }
            if (verifyText != $("#codeValue").val()) {
                throw "Verification failed. Please enter the correct code.";
            }
            if (!securityAns) {
                throw "Security answer required.";
            }
            returnresult = true;
        }catch (e) {
            console.log(e);
            var message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            returnresult = false;
        }
    });

    return returnresult;
}


// Update profile validation
function validateUserUpdateForm()
{

    var returnresult = false;
    var phoneValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var zipValidation = /^\d{5}$|^\d{5}-\d{4}$/;
    var passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    jQuery(function($) {

        try {
            var email = $("#email").val();
            var password = $("#password").val();
            var cnfpassword = $("#cnfpassword").val();
            var phoneNumber= $("#phoneNumber").val();
            var lastName = $("#lastName").val();
            var firstName = $("#firstName").val();
            var city = $("#city").val();
            var address = $("#address").val();
            var state = $("#state").val();
            var zipCode = $("#zipCode").val();
            var gender;
            var securityQues = $('#securityQuestion :selected').text();
            console.log(securityQues);
            var securityAns = $('#securityAnswer').val();

            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");

            var errorContainer1 = document.getElementById("error-container1");
            var errorTextElement1 = errorContainer1.getElementsByClassName("text-goes-here")[0];
            errorContainer1.classList.add("hidden");

            var errorMessage = "";
            var errorCheck = false; //if true -> we have errors on the page.

            $( "#fnameerror" ).empty();
            $( "#lnameerror" ).empty();
            $( "#emailerror" ).empty();
            $( "#passworderror" ).empty();
            $( "#cnfpassworderror" ).empty();
            $( "#phoneerror" ).empty();
            $( "#addresserror" ).empty();

            if (!firstName) {
                errorCheck = true;
                document.getElementById('fnameerror').innerHTML="*Please provide the firstName*";
            }
            if (!lastName) {
                errorCheck = true;
                document.getElementById('lnameerror').innerHTML="*Please provide the lastName*";
            }
            if (!email) {
                errorCheck = true;
                document.getElementById('emailerror').innerHTML="*Please provide the email. ex: abc@stevens.edu *";
            }
            if (!password) {
                errorCheck = true;
                document.getElementById('passworderror').innerHTML="*Please provide the password*";
            }
            if (!cnfpassword) {
                errorCheck = true;
                document.getElementById('cnfpassworderror').innerHTML="*Please confirm password*";
            }
            if (!phoneNumber|| phoneNumber==undefined || !phoneNumber.match(phoneValidation) || phoneNumber.length<10) {
                errorCheck = true;
                document.getElementById('phoneerror').innerHTML="*Please provide a valid contact number*";
            }
            if (!address || !city || !state || !zipCode) {
                errorCheck = true;
                document.getElementById('addresserror').innerHTML="*Please provide all the address field values*";
            }
            else if (!zipCode.match(zipValidation)){
                errorCheck = true;
                document.getElementById('addresserror').innerHTML="*Zipcode invalid*";
            }
            if (!password.match(passwordValidation)) {
                errorCheck = true;
                document.getElementById('passworderror').innerHTML="*Please provide a Password containing at least 8 characters, 1 number, 1 upper and 1 lowercase*";
            }

            if (errorCheck) {
                console.log("Error");
                errorContainer1.classList.remove("hidden");
                return false;
            }

            // Email and domain verification
            var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.match(emailformat))
            {
                var domain = email.split("@")[1];
                if ($.inArray(domain, ['stevens.edu']) == -1) {
                    // InValid domain
                    throw "Please provide a valid Stevens email.";
                }
            }
            else
            {
                throw "Please provide a valid email format. ex. abc@stevens.edu";
            }

            if (password != cnfpassword) {
                throw "Password confirmation failed.";
            }
            if (!securityAns) {
                throw "Security answer required.";
            }
            var securityQuestion ="";
            if (securityQues == '1') securityQuestion ="City you were born in?";
            else securityQuestion = "Mother's maiden name?";
            if (email) {
                var requestConfig = {
                    method: "POST",
                    url: "/updateUser",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        address: address,
                        city: city,
                        state: state,
                        zipCode: zipCode,
                        security:securityQues,
                        answer: securityAns
                    })
                };

                $.ajax(requestConfig).then(function (responseMessage) {
                    console.log(responseMessage);
                    if (responseMessage.error){
                        errorTextElement.textContent = responseMessage.message;
                        errorContainer.classList.remove("hidden");
                    }else if (responseMessage.success){
                        window.location="http://localhost:3000/login/";
                    }
                });
            }
            returnresult = true;
        }catch (e) {
            var message = typeof e === "string" ? e : e.message;
            console.log(e);
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
            returnresult = false;
        }
    });

    return returnresult;
}
