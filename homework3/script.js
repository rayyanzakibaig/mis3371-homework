function updateSlider(val) {
    document.getElementById("sliderValue").innerHTML = val;
}

function formatUserID() {
    let user = document.getElementById("userid");
    user.value = user.value.toLowerCase();
}

function validateFirstName() {
    let val = document.getElementsByName("firstname")[0].value.trim();
    let error = document.getElementById("fnameError");

    if (!/^[A-Za-z'-]{1,30}$/.test(val)) {
        error.innerHTML = "Invalid first name";
        return false;
    }
    error.innerHTML = "";
    return true;
}

function validateEmail() {
    let val = document.getElementsByName("email")[0].value;
    let error = document.getElementById("emailError");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        error.innerHTML = "Invalid email";
        return false;
    }
    error.innerHTML = "";
    return true;
}

function validateDOB() {
    let val = document.getElementsByName("dob")[0].value;
    let error = document.getElementById("dobError");

    let dob = new Date(val);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    if (!val || dob > today || age > 120) {
        error.innerHTML = "Invalid DOB";
        return false;
    }
    error.innerHTML = "";
    return true;
}

function validateZip() {
    let val = document.getElementsByName("zip")[0].value;
    let error = document.getElementById("zipError");

    if (!/^\d{5}(-\d{4})?$/.test(val)) {
        error.innerHTML = "Invalid ZIP";
        return false;
    }
    error.innerHTML = "";
    return true;
}

function validatePassword() {
    let pass = document.getElementsByName("password")[0].value;
    let repass = document.getElementsByName("repassword")[0].value;
    let user = document.getElementById("userid").value;
    let error = document.getElementById("pwdError");

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$/.test(pass)) {
        error.innerHTML = "Weak password";
        return false;
    }

    if (pass !== repass) {
        error.innerHTML = "Passwords do not match";
        return false;
    }

    if (user && pass.toLowerCase().includes(user.toLowerCase())) {
        error.innerHTML = "Password cannot contain user ID";
        return false;
    }

    error.innerHTML = "";
    return true;
}

function validateAll() {
    let valid = true;

    if (!validateFirstName()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validateDOB()) valid = false;
    if (!validateZip()) valid = false;
    if (!validatePassword()) valid = false;

    document.getElementById("submitBtn").disabled = !valid;
}

function reviewForm() {
    validateAll();

    let form = document.getElementById("patientForm");
    let output = "<h3>PLEASE REVIEW YOUR INFORMATION</h3>";

    for (let e of form.elements) {
        if (e.name && e.type !== "button" && e.type !== "submit") {
            output += `<p><b>${e.name}:</b> ${e.value}</p>`;
        }
    }

    document.getElementById("reviewSection").innerHTML = output;
}