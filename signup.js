const createUserUrl = "http://localhost:3000/api/user/signup";
const loginUrl = "login.html";

enableSubmitBtn = function() {
    loading = false;
    document.getElementById("signupbtn").removeAttribute("disabled");
}

disableSubmitBtn = function() {
    loading = true;
    document.getElementById("signupbtn").setAttribute("disabled", true);
}

hideError = function() {
    document.getElementById("errorMessage").innerText = "";
    document.getElementById("errorContainer").classList.add("hide");
    document.getElementById("errorContainer").classList.remove("success");
}

showError = function(error) {
    document.getElementById("errorMessage").innerText = error || "Error";
    document.getElementById("errorContainer").classList.remove("hide");
    document.getElementById("errorContainer").classList.remove("success");
}

showSuccess = function() {
    document.getElementById("errorMessage").innerText = "User created successfully!";
    document.getElementById("errorContainer").classList.add("success");
    document.getElementById("errorContainer").classList.remove("hide");

    setTimeout(() => {
        enableSubmitBtn();
        window.location.href = loginUrl;
    }, 1000);
}

var nav = function() {
    window.location.href = loginUrl;
}

signup = function () {
    if(loading) {
        return;
    }
    if (!createUserUrl) {
        return;
    }

    disableSubmitBtn();
    hideError();

    // get values from screen
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    // Configuration
    var xhr = new XMLHttpRequest();
    xhr.open('POST', createUserUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        console.log(xhr);
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request was successful
            var response = xhr.responseText;
            console.log(response);
            showSuccess();
        } else {
            // Request failed
             // show a failure message 
            //console.error('Request failed with status ' + xhr.status);
            showError(xhr.responseText);
            enableSubmitBtn();
        }
    };

    // Execute
    xhr.send(JSON.stringify({
        name: name.value,
        email: email.value.toLowerCase(),
        password: password.value
    }));
}

hideError();
enableSubmitBtn();