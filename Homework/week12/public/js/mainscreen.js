
(function ($) {
    var phoneValidation=/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gm;
    var signupform = $("#signupform");
    signupform.submit(function (event) {
        event.preventDefault();
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
            var verifyText = $("#textVerify").val();
            var gender;

            if (document.getElementById('mgender').checked) {
                gender = document.getElementById('mgender').value;
            }
            else {
                gender = document.getElementById('fgender').value;
            }
            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];
            errorContainer.classList.add("hidden");
            var errorMessage = "";
            var errorCheck = false; //if true -> we have errors on the page.
            if (!email) errorMessage = "Please provide the email.\n";
            if (!password) errorMessage = errorMessage+"Please provide the password.\n";
            if (!cnfpassword) errorMessage = errorMessage+"Please confirm password.\n";
            if (!firstName) errorMessage = errorMessage+"Please provide the firstName.\n";
            if (!lastName) errorMessage = errorMessage+"Please provide the lastName.\n";
            if (!phoneNumber || phoneNumber==undefined || !phoneNumber.match(phoneNumber) || phoneNumber.length<10)
                    errorMessage = errorMessage+"Please provide a valid contact number.\n";
            if (!address || !city || !state || !zipCode)
                errorMessage = errorMessage+"Please provide all the address field values.\n";
            if (password.length <8 || password.length > 15) errorMessage = errorMessage+"Please provide a Password containing atleast 8 characters and maximum of 15 characters.\n"
            /*if (!address) errorMessage = errorMessage+"Please provide the address.\n";
            if (!city) errorMessage = errorMessage+"Please provide the city.\n";
            if (!lastName) errorMessage = errorMessage+"Please provide the lastName.\n";
*/
            //console.log($("#codeValue").val());
            //console.log(profilePic);
            //console.log(verifyText == $("#codeValue").val());
            if(errorMessage != "") {
                console.log("Error");
                throw errorMessage;
            }
            if(password != cnfpassword) {
                throw "Password confirmation failed.";
            }
            if(verifyText != $("#codeValue").val()) {
                throw "Verification failed. Please enter the correct code.";
            }
            //console.log(emailElement.val());
            if (email) {
                //console.log("requestCOnfig setup");
                var requestConfig = {
                    method: "POST",
                    url: "/signup",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        gender: gender,
                        phoneNumber: phoneNumber,
                        address: address,
                        city: city,
                        state: state,
                        zipCode: zipCode
                    })
                };

                $.ajax(requestConfig).then(function (responseMessage) {
                     //console.log(responseMessage);
                    if(responseMessage.error){
                        //console.log(responseMessage.error);
                        errorTextElement.textContent = responseMessage.message;
                        errorContainer.classList.remove("hidden");
                    }else if(responseMessage.success){
                        //console.log(responseMessage.message._id);
                        //window.location="http://localhost:3000/myprofile/"+responseMessage.message._id;
                        window.location="http://localhost:3000/successfulSignup/";
                    }
                    //window.open("/notes/"+responseMessage.message.id, "_self");
                    //write the data to the document of the newWindow
                    //newWindow.document.write(responseMessage);
                });
            }
        }catch (e) {
            var message = typeof e === "string" ? e : e.message;
            console.log(e);
            errorTextElement.textContent = e;
            errorContainer.classList.remove("hidden");
        }

    });
    /*var imgData=null;
    var reader;
    function readURL(input) {
        if (input.files && input.files[0]) {
            reader = new FileReader();

            reader.onload = function (e) {
                $('#imageHome').attr('src', e.target.result);

            }

            imgData=$('#imageHome').attr('src');
            reader.readAsDataURL(input.files[0]);

        }
    }

    $("#profilePicId").change(function(){
        readURL(this);
    });*/

})(window.jQuery);
