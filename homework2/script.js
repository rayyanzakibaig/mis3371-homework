function formatUserID() {
    let user = document.getElementById("userid");
    user.value = user.value.toLowerCase();
}

function validatePassword() {
    let pass = document.getElementById("password").value;
    let repass = document.getElementById("repassword").value;

    if (repass && pass !== repass) {
        document.getElementById("repassword").style.border = "2px solid red";
    } else {
        document.getElementById("repassword").style.border = "";
    }
}

function updateSlider(val) {
    document.getElementById("sliderValue").innerText = val;
}

function reviewForm() {

    let f = document.getElementById("patientForm");

    let conditions = [];
    document.querySelectorAll('input[name="conditions"]:checked')
        .forEach(c => conditions.push(c.value));

    let gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    let vaccinated = document.querySelector('input[name="vaccinated"]:checked')?.value || "";
    let insurance = document.querySelector('input[name="insurance"]:checked')?.value || "";

    document.getElementById("reviewSection").innerHTML = `
    <h3>PLEASE REVIEW THIS INFORMATION</h3>

    <p><b>Name:</b> ${f.firstname.value} ${f.mi.value} ${f.lastname.value}</p>
    <p><b>DOB:</b> ${f.dob.value}</p>
    <p><b>Email:</b> ${f.email.value}</p>
    <p><b>Phone:</b> ${f.phone.value}</p>

    <p><b>Address:</b><br>
    ${f.address1.value}<br>
    ${f.city.value}, ${f.state.value} ${f.zip.value}</p>

    <p><b>Conditions:</b> ${conditions.join(", ") || "None"}</p>

    <p><b>Gender:</b> ${gender}</p>
    <p><b>Vaccinated:</b> ${vaccinated}</p>
    <p><b>Insurance:</b> ${insurance}</p>

    <p><b>Health Rating:</b> ${document.getElementById("sliderValue").innerText}</p>
    <p><b>User ID:</b> ${f.userid.value}</p>
    `;
}
