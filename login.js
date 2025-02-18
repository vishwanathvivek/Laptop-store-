const loginUrl = "http://localhost:3000/api/user/login";
const homeUrl = "index.html";
loading = false;

enableLoginBtn = function() {
    loading = false;
    document.getElementById("loginbtn").removeAttribute("disabled");
}

disableLoginBtn = function() {
    loading = true;
    document.getElementById("loginbtn").setAttribute("disabled", true);
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
    document.getElementById("errorMessage").innerText = "Logged in successfully!";
    document.getElementById("errorContainer").classList.add("success");
    document.getElementById("errorContainer").classList.remove("hide");

    

    setTimeout(() => {
        enableLoginBtn();
        window.location.href = homeUrl;
    }, 1000);
}

function myFunction() {
    if (loading) {
        return;
    }
    if (!loginUrl) {
        return;
    }
    disableLoginBtn();

    var email = document.forms["myForm"]["email"].value;
    var password = document.forms["myForm"]["password"].value;

    // Configuration
    var xhr = new XMLHttpRequest();
    xhr.open('POST', loginUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        console.log(xhr);
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request was successful
            var response = xhr.responseText;
            console.log(response);

            // Set Auth Key
            let parsed = JSON.parse(xhr.response);
            let authheader = parsed.token;
            let user = parsed.user;
            sessionStorage.setItem('e-commerce-token', authheader);
            sessionStorage.setItem('e-commerce-user-email', email);
            sessionStorage.setItem('e-commerce-user-name', user.name);

            showSuccess();
        } else {
            // Request failed
             // show a failure message 
            //console.error('Request failed with status ' + xhr.status);
            showError(xhr.responseText);
            enableLoginBtn();
        }
    };

    // Execute
    xhr.send(JSON.stringify({
        email: email.toLowerCase(),
        password: password
    }));

    // if (em == "vivek@gmail.com" && pw == "1234") {
    //     window.location.href = "index.html";
    //     return false;
    // }
    // else {
    //     alert("Invalid User Name and Password");
    // }
}

function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 4100);
}

window.onload = fadeOut();