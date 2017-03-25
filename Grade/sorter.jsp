<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>HTML 5, CSS 3, jQuery Log-in & Registration</title>
<link href='http://fonts.googleapis.com/css?family=Varela+Round|Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
$(document).ready(function() {
    $("#loginLink").click(function( event ){
           event.preventDefault();
           $(".overlay").fadeToggle("fast");
     });
     
    $(".overlayLink").click(function(event){
        event.preventDefault();
        var action = $(this).attr('data-action');
         
        $("#loginTarget").load("ajax/" + action);
         
        $(".overlay").fadeToggle("fast");
    });
     
    $(".close").click(function(){
        $(".overlay").fadeToggle("fast");
    });
     
    $(document).keyup(function(e) {
        if(e.keyCode == 27 && $(".overlay").css("display") != "none" ) { 
            event.preventDefault();
            $(".overlay").fadeToggle("fast");
        }
    });
});
</script>
<style>
/*
*    RESET
*/
*{
    box-sizing: border-box;
    margin: 0;
    outline: none;
    padding: 0;
}
 
*:after,
*:before {
    box-sizing: border-box;
}
 
/*
*    GLOBAL
*/
html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
}
 
body {
    background-color: #f3f3f3;
    color: rgb(165,165,165);
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
    font-weight: 400;
}
 
a.close {
    background-color: rgb(204,204,204);
    border-radius: 50%;
    color: rgb(255,255,255);
    display: block;
    font-family: 'Varela Round', sans-serif;
    font-size: .8em;
    padding: .2em .5em;
    position: absolute;
    top: 1.25rem;
    transition: all 400ms ease;
    right: 1.25rem;
}
     
    a.close:hover {
        background-color: #1bc5b3;
        cursor: pointer;
    }
 
/*
*    LOG-IN BOX
*/
div.overlay {
    background-color: rgba(0,0,0,.25);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
}
 
    div.overlay > div.login-wrapper {
        align-self: center;
        background-color: rgba(0,0,0,.25);
        border-radius: 2px;
        padding: 6px;
        width: 450px;
    }
     
        div.overlay > div.login-wrapper > div.login-content {
            background-color: rgb(255,255,255);
            border-radius: 2px;
            padding: 24px;    
            position: relative;
        }
         
            div.overlay > div.login-wrapper > div.login-content > h3 {
                color: rgb(0,0,0);
                font-family: 'Varela Round', sans-serif;
                font-size: 1.8em;
                margin: 0 0 1.25em;
                padding: 0;
            }
/*
*    FORM
*/
form label {
    color: rgb(0,0,0);
    display: block;
    font-family: 'Varela Round', sans-serif;
    font-size: 1.25em;
    margin: .75em 0;    
}
 
    form input[type="text"],
    form input[type="email"],
    form input[type="number"],
    form input[type="search"],
    form input[type="password"],
    form textarea {
        background-color: rgb(255,255,255);
        border: 1px solid rgb( 186, 186, 186 );
        border-radius: 1px;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
        display: block;
        font-size: .65em;
        margin: 6px 0 12px 0;
        padding: .8em .55em;    
        text-shadow: 0 1px 1px rgba(255, 255, 255, 1);
        transition: all 400ms ease;
        width: 90%;
    }
     
    form input[type="text"]:focus,
    form input[type="email"]:focus,
    form input[type="number"]:focus,
    form input[type="search"]:focus,
    form input[type="password"]:focus,
    form textarea:focus,
    form select:focus { 
        border-color: #4195fc;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 8px #4195fc;
    }
     
        form input[type="text"]:invalid:focus,
        form input[type="email"]:invalid:focus,
        form input[type="number"]:invalid:focus,
        form input[type="search"]:invalid:focus,
        form input[type="password"]:invalid:focus,
        form textarea:invalid:focus,
        form select:invalid:focus { 
            border-color: rgb(248,66,66);
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 8px rgb(248,66,66);
        }
     
form button {
    background-color: #50c1e9;
    border: 1px solid rgba(0,0,0,.1);
    color: rgb(255,255,255);
    font-family: 'Varela Round', sans-serif;
    font-size: .85em;
    padding: .55em .9em;
    transition: all 400ms ease;    
}
 
    form button:hover {
        background-color: #1bc5b3;
        cursor: pointer;
    }
</style>
</head>
 
<body>
<div class="test"></div>
<p>Here's some content.</p>
<a href="login.php" id="loginLink">Login</a>
<ul>
    <li><a href="login.php" class="overlayLink" data-action="login-form.html">Log-in</a></li>
    <li><a href="register.php" class="overlayLink" data-action="registration-form.html">Register</a></li>
</ul>
<div class="overlay" style="display: none;">
    <div class="login-wrapper">
        <div class="login-content" id="loginTarget">
            <a class="close">x</a>
            <h3>Sign in</h3>
            <form method="post" action="login.php">
                <label for="username">
                    Username:
                    <input type="text" name="username" id="username" placeholder="Username must be between 8 and 20 characters" pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$" required />
                </label>
                <label for="password">
                    Password:
                    <input type="password" name="password" id="password" placeholder="Password must contain 1 uppercase, lowercase and number" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required />
                </label>
                <button type="submit">Sign in</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>