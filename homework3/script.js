/*
Program name: script.js
Author: Rayyan Zakibaig
Date created: 02/27/2026
Date last edited: 04/17/2026
Version: 3.0
Description: Live JS validation for PrimeCare Patient Registration (HW3)
*/

/* ================================================================
   HELPERS
   ================================================================ */
function setError(id, msg) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = msg;
}

function clearError(id) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = "";
}

/* ================================================================
   SLIDER
   ================================================================ */
function updateSlider(val) {
    document.getElementById("sliderValue").innerHTML = val;
}

/* ================================================================
   NAME FIELDS
   ================================================================ */
function validateFirstName() {
    var val = document.getElementById("firstname").value.trim();
    if (val === "") {
        setError("fnameError", "First name is required.");
        return false;
    }
    if (!/^[A-Za-z'-]{1,30}$/.test(val)) {
        setError("fnameError", "1-30 characters: letters, apostrophes, or dashes only.");
        return false;
    }
    clearError("fnameError");
    return true;
}

function validateMI() {
    var val = document.getElementById("mi").value.trim();
    if (val === "") {
        clearError("miError");
        return true; // optional
    }
    if (!/^[A-Za-z]$/.test(val)) {
        setError("miError", "Middle initial must be a single letter, no numbers.");
        return false;
    }
    clearError("miError");
    return true;
}

function validateLastName() {
    var val = document.getElementById("lastname").value.trim();
    if (val === "") {
        setError("lnameError", "Last name is required.");
        return false;
    }
    if (!/^[A-Za-z'-]{1,30}$/.test(val)) {
        setError("lnameError", "1-30 characters: letters, apostrophes, or dashes only.");
        return false;
    }
    clearError("lnameError");
    return true;
}

/* ================================================================
   DATE OF BIRTH
   ================================================================ */
function validateDOB() {
    var val = document.getElementById("dob").value;
    if (!val) {
        setError("dobError", "Date of birth is required.");
        return false;
    }
    // Use T00:00:00 to avoid timezone offset shifting the date by one day
    var dob = new Date(val + "T00:00:00");
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dob > today) {
        setError("dobError", "Date of birth cannot be in the future.");
        return false;
    }

    // Exact 120-year check using month and day
    var limit = new Date();
    limit.setFullYear(limit.getFullYear() - 120);
    limit.setHours(0, 0, 0, 0);
    if (dob < limit) {
        setError("dobError", "Date of birth cannot be more than 120 years ago.");
        return false;
    }

    clearError("dobError");
    return true;
}

/* ================================================================
   PATIENT ID (SSN-style, obscured)
   ================================================================ */
function formatSSN(input) {
    // Strip everything that is not a digit
    var digits = input.value.replace(/\D/g, "").substring(0, 9);
    // Re-insert dashes at positions 3 and 5
    if (digits.length > 5) {
        input.value = digits.substring(0, 3) + "-" + digits.substring(3, 5) + "-" + digits.substring(5);
    } else if (digits.length > 3) {
        input.value = digits.substring(0, 3) + "-" + digits.substring(3);
    } else {
        input.value = digits;
    }
    validateSSN();
}

function validateSSN() {
    var raw = document.getElementById("ssn").value.replace(/\D/g, "");
    if (raw === "") {
        setError("ssnError", "Patient ID is required (9 digits).");
        return false;
    }
    if (!/^\d{9}$/.test(raw)) {
        setError("ssnError", "Patient ID must be exactly 9 digits. Do NOT use your real SSN.");
        return false;
    }
    clearError("ssnError");
    return true;
}

/* ================================================================
   EMAIL
   ================================================================ */
function validateEmail() {
    var el = document.getElementById("email");
    // Force lowercase
    el.value = el.value.toLowerCase();
    var val = el.value.trim();
    if (val === "") {
        setError("emailError", "Email address is required.");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setError("emailError", "Email must be in format: name@domain.tld");
        return false;
    }
    clearError("emailError");
    return true;
}

/* ================================================================
   PHONE (optional)
   ================================================================ */
function validatePhone() {
    var val = document.getElementById("phone").value.trim();
    if (val === "") {
        clearError("phoneError");
        return true; // optional
    }
    var digits = val.replace(/\D/g, "");
    if (digits.length !== 10) {
        setError("phoneError", "Phone must be 10 digits, e.g. (555) 555-5555.");
        return false;
    }
    clearError("phoneError");
    return true;
}

/* ================================================================
   ADDRESS
   ================================================================ */
function validateAddress1() {
    var val = document.getElementById("address1").value.trim();
    if (val === "") {
        setError("addr1Error", "Street address is required.");
        return false;
    }
    if (val.length < 2 || val.length > 50) {
        setError("addr1Error", "Address must be 2-50 characters.");
        return false;
    }
    clearError("addr1Error");
    return true;
}

function validateAddress2() {
    var val = document.getElementById("address2").value.trim();
    if (val === "") {
        clearError("addr2Error");
        return true; // optional
    }
    if (val.length < 2 || val.length > 50) {
        setError("addr2Error", "If entered, address line 2 must be 2-50 characters.");
        return false;
    }
    clearError("addr2Error");
    return true;
}

function validateCity() {
    var val = document.getElementById("city").value.trim();
    if (val === "") {
        setError("cityError", "City is required.");
        return false;
    }
    if (val.length < 2 || val.length > 30) {
        setError("cityError", "City must be 2-30 characters.");
        return false;
    }
    clearError("cityError");
    return true;
}

function validateState() {
    var val = document.getElementById("state").value;
    if (!val) {
        setError("stateError", "Please select a state or territory.");
        return false;
    }
    clearError("stateError");
    return true;
}

function validateZip() {
    var val = document.getElementById("zip").value.trim();
    if (val === "") {
        setError("zipError", "ZIP code is required.");
        return false;
    }
    if (!/^\d{5}$/.test(val)) {
        setError("zipError", "ZIP code must be exactly 5 digits, no letters.");
        return false;
    }
    clearError("zipError");
    return true;
}

/* ================================================================
   RADIO BUTTONS
   ================================================================ */
function validateGender() {
    var radios = document.getElementsByName("gender");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            clearError("genderError");
            return true;
        }
    }
    setError("genderError", "Please select a gender.");
    return false;
}

function validateVaccinated() {
    var radios = document.getElementsByName("vaccinated");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            clearError("vaccError");
            return true;
        }
    }
    setError("vaccError", "Please indicate your vaccination status.");
    return false;
}

function validateInsurance() {
    var radios = document.getElementsByName("insurance");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            clearError("insError");
            return true;
        }
    }
    setError("insError", "Please indicate whether you have insurance.");
    return false;
}

/* ================================================================
   USER ID
   ================================================================ */
function validateUserID() {
    var val = document.getElementById("userid").value;
    if (val === "") {
        setError("useridError", "User ID is required.");
        return false;
    }
    if (/^\d/.test(val)) {
        setError("useridError", "User ID cannot start with a number.");
        return false;
    }
    if (val.length < 5 || val.length > 20) {
        setError("useridError", "User ID must be 5-20 characters long.");
        return false;
    }
    if (/[^A-Za-z0-9_-]/.test(val)) {
        setError("useridError", "User ID may only contain letters, numbers, dashes (-), and underscores (_). No spaces.");
        return false;
    }
    clearError("useridError");
    return true;
}

/* ================================================================
   PASSWORD
   ================================================================ */
function validatePassword() {
    var pass = document.getElementById("password").value;
    var user = document.getElementById("userid").value;

    if (pass === "") {
        setError("pwdError", "Password is required.");
        return false;
    }
    if (pass.length < 8) {
        setError("pwdError", "Password must be at least 8 characters.");
        return false;
    }
    if (!/[A-Z]/.test(pass)) {
        setError("pwdError", "Password must contain at least 1 uppercase letter.");
        return false;
    }
    if (!/[a-z]/.test(pass)) {
        setError("pwdError", "Password must contain at least 1 lowercase letter.");
        return false;
    }
    if (!/\d/.test(pass)) {
        setError("pwdError", "Password must contain at least 1 digit.");
        return false;
    }
    if (user && pass === user) {
        setError("pwdError", "Password cannot be the same as your User ID.");
        return false;
    }

    clearError("pwdError");

    // Re-check confirm field if user already typed something there
    var repass = document.getElementById("repassword").value;
    if (repass !== "") {
        validateConfirmPassword();
    }

    return true;
}

function validateConfirmPassword() {
    var pass = document.getElementById("password").value;
    var repass = document.getElementById("repassword").value;

    if (repass === "") {
        setError("repwdError", "Please re-enter your password to confirm.");
        return false;
    }
    if (pass !== repass) {
        setError("repwdError", "Passwords do not match.");
        return false;
    }
    clearError("repwdError");
    return true;
}

/* ================================================================
   VALIDATE ALL FIELDS
   Returns true only if every field passes.
   ================================================================ */
function validateAll() {
    var valid = true;

    if (!validateFirstName())       valid = false;
    if (!validateMI())              valid = false;
    if (!validateLastName())        valid = false;
    if (!validateDOB())             valid = false;
    if (!validateSSN())             valid = false;
    if (!validateEmail())           valid = false;
    if (!validatePhone())           valid = false;
    if (!validateAddress1())        valid = false;
    if (!validateAddress2())        valid = false;
    if (!validateCity())            valid = false;
    if (!validateState())           valid = false;
    if (!validateZip())             valid = false;
    if (!validateGender())          valid = false;
    if (!validateVaccinated())      valid = false;
    if (!validateInsurance())       valid = false;
    if (!validateUserID())          valid = false;
    if (!validatePassword())        valid = false;
    if (!validateConfirmPassword()) valid = false;

    return valid;
}

/* ================================================================
   VALIDATE BUTTON HANDLER
   Shows Submit only when all fields pass.
   ================================================================ */
function handleValidate() {
    var submitBtn = document.getElementById("submitBtn");
    if (validateAll()) {
        submitBtn.style.display = "inline";
        alert("All fields are valid! You may now click Submit.");
    } else {
        submitBtn.style.display = "none";
        alert("Please correct the errors highlighted in red before submitting.");
    }
}

/* ================================================================
   RESET
   ================================================================ */
function resetForm() {
    document.getElementById("submitBtn").style.display = "none";
    var errorDivs = document.getElementsByClassName("error");
    for (var i = 0; i < errorDivs.length; i++) {
        errorDivs[i].innerHTML = "";
    }
    document.getElementById("reviewSection").innerHTML = "";
    document.getElementById("sliderValue").innerHTML = "5";
}

/* ================================================================
   REVIEW / GET DATA
   ================================================================ */
function reviewForm() {
    validateAll();

    var form = document.getElementById("patientForm");
    var output = "<h3>Review Your Information</h3>";
    output += "<table id='reviewTable'><tr><th>Field</th><th>Value</th></tr>";

    var skipTypes = ["button", "submit", "reset"];
    var seenRadioCheckbox = {};

    for (var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if (!e.name || skipTypes.indexOf(e.type) !== -1) continue;

        if (e.type === "radio" || e.type === "checkbox") {
            if (seenRadioCheckbox[e.name]) continue;
            seenRadioCheckbox[e.name] = true;

            var selected = [];
            var group = document.getElementsByName(e.name);
            for (var j = 0; j < group.length; j++) {
                if (group[j].checked) selected.push(group[j].value);
            }
            output += "<tr><td>" + e.name + "</td><td>" + (selected.length ? selected.join(", ") : "(none selected)") + "</td></tr>";

        } else if (e.type === "password" || e.name === "ssn") {
            output += "<tr><td>" + e.name + "</td><td>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</td></tr>";

        } else {
            output += "<tr><td>" + e.name + "</td><td>" + (e.value || "(blank)") + "</td></tr>";
        }
    }

    output += "</table>";
    document.getElementById("reviewSection").innerHTML = output;
}
