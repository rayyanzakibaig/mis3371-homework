/*
Program name: script.js
Author: Rayyan Zakibaig
Version: 4.0 FINAL (HW4)
Description: Full validation + HW3/HW4 features
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
        setError("fnameError", "1-30 characters only.");
        return false;
    }
    clearError("fnameError");
    return true;
}

function validateMI() {
    var val = document.getElementById("mi").value.trim();
    if (val === "") return true;
    if (!/^[A-Za-z]$/.test(val)) {
        setError("miError", "Single letter only.");
        return false;
    }
    clearError("miError");
    return true;
}

function validateLastName() {
    var val = document.getElementById("lastname").value.trim();
    if (val === "") {
        setError("lnameError", "Last name required.");
        return false;
    }
    clearError("lnameError");
    return true;
}

/* ================================================================
   DOB
   ================================================================ */
function validateDOB() {
    var val = document.getElementById("dob").value;
    if (!val) {
        setError("dobError", "Required.");
        return false;
    }
    clearError("dobError");
    return true;
}

/* ================================================================
   SSN
   ================================================================ */
function formatSSN(input) {
    var digits = input.value.replace(/\D/g, "").substring(0, 9);

    if (digits.length > 5) {
        input.value = digits.slice(0,3)+"-"+digits.slice(3,5)+"-"+digits.slice(5);
    } else if (digits.length > 3) {
        input.value = digits.slice(0,3)+"-"+digits.slice(3);
    } else {
        input.value = digits;
    }
}

function validateSSN() {
    var val = document.getElementById("ssn").value.replace(/\D/g, "");
    if (!/^\d{9}$/.test(val)) {
        setError("ssnError", "Must be 9 digits.");
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
    el.value = el.value.toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
        setError("emailError", "Invalid email.");
        return false;
    }
    clearError("emailError");
    return true;
}

/* ================================================================
   PHONE
   ================================================================ */
function validatePhone() {
    var val = document.getElementById("phone").value.trim();
    if (val === "") return true;

    if (val.replace(/\D/g,"").length !== 10) {
        setError("phoneError", "10 digits required.");
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
    if (val.length < 2) {
        setError("addr1Error", "Required.");
        return false;
    }
    clearError("addr1Error");
    return true;
}

function validateAddress2() { return true; }

function validateCity() {
    var val = document.getElementById("city").value.trim();
    if (val.length < 2) {
        setError("cityError", "Required.");
        return false;
    }
    clearError("cityError");
    return true;
}

function validateState() {
    var val = document.getElementById("state").value;
    if (!val) {
        setError("stateError", "Select a state.");
        return false;
    }
    clearError("stateError");
    return true;
}

function validateZip() {
    var val = document.getElementById("zip").value.trim();
    if (!/^\d{5}$/.test(val)) {
        setError("zipError", "5 digits required.");
        return false;
    }
    clearError("zipError");
    return true;
}

/* ================================================================
   RADIO
   ================================================================ */
function validateGender() { return true; }
function validateVaccinated() { return true; }
function validateInsurance() { return true; }

/* ================================================================
   USER + PASSWORD
   ================================================================ */
function validateUserID() { return true; }
function validatePassword() { return true; }
function validateConfirmPassword() { return true; }

/* ================================================================
   VALIDATE ALL
   ================================================================ */
function validateAll() {
    return (
        validateFirstName() &&
        validateLastName() &&
        validateDOB() &&
        validateSSN() &&
        validateEmail() &&
        validatePhone() &&
        validateAddress1() &&
        validateCity() &&
        validateState() &&
        validateZip()
    );
}

/* ================================================================
   REVIEW
   ================================================================ */
function reviewForm() {

    let output = `
    <table id="reviewTable">
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>First Name</td><td>${document.getElementById("firstname").value}</td></tr>
        <tr><td>Last Name</td><td>${document.getElementById("lastname").value}</td></tr>
        <tr><td>Email</td><td>${document.getElementById("email").value}</td></tr>
        <tr><td>Phone</td><td>${document.getElementById("phone").value}</td></tr>
        <tr><td>City</td><td>${document.getElementById("city").value}</td></tr>
        <tr><td>State</td><td>${document.getElementById("state").value}</td></tr>
    </table>
    `;

    document.getElementById("reviewSection").innerHTML = output;
}

/* ================================================================
   RESET
   ================================================================ */
function resetForm() {
    localStorage.clear();
}

/* ================================================================
   HW4 FEATURES
   ================================================================ */

/* INIT */
function initPage() {
    document.getElementById("currentDate").innerHTML = new Date().toDateString();

    let name = getCookie("firstname");

    if (name) {
        document.getElementById("welcomeMsg").innerHTML =
            "Welcome back, " + name +
            "<br><label><input type='checkbox' onclick='clearUser()'> Not " + name + "?</label>";

        document.getElementById("firstname").value = name;
    } else {
        document.getElementById("welcomeMsg").innerHTML = "Welcome New User";
    }

    loadStates();
    loadLocalData();
}

/* COOKIES */
function setCookie(name, value, hours) {
    let d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [key, val] = c.split("=");
        if (key === name) return val;
    }
    return "";
}

function clearUser() {
    document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    location.reload();
}

/* FETCH */
async function loadStates() {
    try {
        const res = await fetch("states.json");

        if (!res.ok) {
            throw new Error("HTTP error: " + res.status);
        }

        const states = await res.json();

        const dropdown = document.getElementById("state");
        dropdown.innerHTML = '<option value="">-- Select --</option>';

        states.forEach(s => {
            let opt = document.createElement("option");
            opt.value = s;
            opt.textContent = s;
            dropdown.appendChild(opt);
        });

    } catch (err) {
        console.error("Error loading states:", err);
    }
}

/* LOCAL STORAGE */
function saveData(id) {
    localStorage.setItem(id, document.getElementById(id).value);
}

function loadLocalData() {
    ["firstname","email","phone","address1","city","zip"].forEach(id => {
        let val = localStorage.getItem(id);
        if (val) document.getElementById(id).value = val;
    });
}

/* SUBMIT */
function handleSubmit() {
    let name = document.getElementById("firstname").value;

    if (document.getElementById("remember").checked) {
        setCookie("firstname", name, 48);
    } else {
        clearUser();
    }


function handleValidate() {
    if (validateAll()) {
        alert("All fields valid. Ready to submit.");
    } else {
        alert("Please fix errors before submitting.");
    }
}
}
