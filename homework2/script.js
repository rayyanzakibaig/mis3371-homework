// ===============================
// Convert User ID to lowercase
// ===============================
function formatUserID() {
    let user = document.getElementById("userid");
    user.value = user.value.toLowerCase();
}


// ===============================
// Validate Password Match
// ===============================
function validatePassword() {
    let pass = document.getElementById("password").value;
    let repass = document.getElementById("repassword").value;

    if (repass.length > 0 && pass !== repass) {
        document.getElementById("repassword").style.border = "2px solid red";
    } else {
        document.getElementById("repassword").style.border = "";
    }
}


// ===============================
// Update Slider Value
// ===============================
function updateSlider(val) {
    document.getElementById("sliderValue").innerText = val;
}


// ===============================
// Review Form Data
// ===============================
function reviewForm() {

    let form = document.getElementById("patientForm");

    let first = form.firstname.value;
    let mi = form.mi.value;
    let last = form.lastname.value;
    let dob = form.dob.value;
    let email = form.email.value;
    let phone = form.phone.value;
    let address = form.address1.value;
    let city = form.city.value;
    let state = form.state.value;
    let zip = form.zip.value;
    let user = form.userid.value;
    let slider = document.getElementById("sliderValue").innerText;
    let symptoms = form.symptoms.value;

    // Basic validation flags
    let dobCheck = "";
    let zipCheck = "";

    // DOB validation (no future dates)
    if (dob) {
        let today = new Date();
        let inputDate = new Date(dob);

        if (inputDate > today) {
            dobCheck = " ❌ ERROR: Cannot be in the future";
        } else {
            dobCheck = " ✅";
        }
    }

    // ZIP validation
    if (!zip) {
        zipCheck = " ❌ ERROR: Missing Zip Code";
    } else {
        zipCheck = " ✅";
    }

    // Display review
    document.getElementById("reviewSection").innerHTML = `
        <h3>PLEASE REVIEW THIS INFORMATION</h3>

        <p><strong>Name:</strong> ${first} ${mi} ${last}</p>
        <p><strong>Date of Birth:</strong> ${dob} ${dobCheck}</p>

        <p><strong>Email:</strong> ${email} ✅</p>
        <p><strong>Phone:</strong> ${phone} ✅</p>

        <p><strong>Address:</strong><br>
        ${address}<br>
        ${city}, ${state} ${zip} ${zipCheck}</p>

        <p><strong>Health Rating:</strong> ${slider}</p>

        <p><strong>Symptoms:</strong><br>${symptoms}</p>

        <p><strong>User ID:</strong> ${user}</p>
    `;
}
