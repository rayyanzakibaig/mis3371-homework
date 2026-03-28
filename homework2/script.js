// ===============================
// Convert User ID to lowercase
// ===============================
function formatUserID() {
    let u = document.getElementById("userid");
    u.value = u.value.toLowerCase();
}

// ===============================
// Slider update (Health Rating)
// ===============================
function updateSlider(val) {
    document.getElementById("sliderValue").innerText = val;
}

// ===============================
// Review Form Function
// ===============================
function reviewForm() {

    let f = document.getElementById("patientForm");

    // ===== GET VALUES =====
    let first = f.firstname.value.trim();
    let mi = f.mi.value.trim();
    let last = f.lastname.value.trim();
    let dob = f.dob.value;
    let email = f.email.value;
    let phone = f.phone.value;
    let address = f.address1.value;
    let city = f.city.value;
    let state = f.state.value;
    let zip = f.zip.value;
    let user = f.userid.value.toLowerCase();
    let pass = f.password.value;
    let repass = f.repassword.value;
    let symptoms = f.symptoms.value;

    let sliderVal = document.getElementById("sliderValue").innerText;

    // ===== HELPER FUNCTION =====
    function status(condition, errorMsg) {
        return condition
            ? '<span style="color:green">PASS</span>'
            : `<span style="color:red">ERROR: ${errorMsg}</span>`;
    }

    // ===== VALIDATIONS =====

    // Name
    let nameValid = first !== "" && last !== "";

    // DOB (no future)
    let today = new Date();
    let dobDate = new Date(dob);
    let dobValid = dob && dobDate <= today;

    // Email
    let emailValid = email.includes("@");

    // Phone (basic)
    let phoneValid = phone === "" || phone.length >= 10;

    // ZIP
    let zipValid = /^[0-9]{5}(-[0-9]{4})?$/.test(zip);

    // User ID
    let userValid = /^[a-zA-Z][a-zA-Z0-9_-]{4,29}$/.test(user);

    // Password rules
    let passValid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_+=<>.,~]).{8,30}$/.test(pass)
        && pass === repass
        && !pass.includes(user)
        && !pass.includes('"');

    // ===== CHECKBOXES (Y/N) =====
    let conditions = {
        "Diabetes": "N",
        "Hypertension": "N",
        "Asthma": "N",
        "Heart Disease": "N",
        "Severe Allergies": "N",
        "None": "N"
    };

    document.querySelectorAll('input[name="conditions"]:checked')
        .forEach(cb => conditions[cb.value] = "Y");

    // ===== RADIO VALUES =====
    let gender = document.querySelector('input[name="gender"]:checked')?.value || "N/A";
    let vaccinated = document.querySelector('input[name="vaccinated"]:checked')?.value || "N/A";
    let insurance = document.querySelector('input[name="insurance"]:checked')?.value || "N/A";

    // ===== OUTPUT =====
    document.getElementById("reviewSection").innerHTML = `

    <h2>PLEASE REVIEW THIS INFORMATION</h2>

    <table width="100%">

    <tr>
        <td>Name</td>
        <td>${first} ${mi} ${last}</td>
        <td>${status(nameValid, "Missing name")}</td>
    </tr>

    <tr>
        <td>Date of Birth</td>
        <td>${dob}</td>
        <td>${status(dobValid, "Date cannot be in the future")}</td>
    </tr>

    <tr>
        <td>Email</td>
        <td>${email}</td>
        <td>${status(emailValid, "Invalid email format")}</td>
    </tr>

    <tr>
        <td>Phone</td>
        <td>${phone}</td>
        <td>${status(phoneValid, "Invalid phone number")}</td>
    </tr>

    <tr>
        <td>Address</td>
        <td>${address}<br>${city}, ${state} ${zip}</td>
        <td>${status(zipValid, "Invalid ZIP code")}</td>
    </tr>

    <tr>
        <td>User ID</td>
        <td>${user}</td>
        <td>${status(userValid, "Invalid User ID format")}</td>
    </tr>

    <tr>
        <td>Password</td>
        <td>********</td>
        <td>${status(passValid, "Weak or mismatched password")}</td>
    </tr>

    <tr>
        <td>Health Rating</td>
        <td>${sliderVal}</td>
        <td style="color:green">PASS</td>
    </tr>

    </table>

    <h3>REQUESTED INFO</h3>

    <table>

    <tr><td>Diabetes</td><td>${conditions["Diabetes"]}</td></tr>
    <tr><td>Hypertension</td><td>${conditions["Hypertension"]}</td></tr>
    <tr><td>Asthma</td><td>${conditions["Asthma"]}</td></tr>
    <tr><td>Heart Disease</td><td>${conditions["Heart Disease"]}</td></tr>
    <tr><td>Severe Allergies</td><td>${conditions["Severe Allergies"]}</td></tr>
    <tr><td>None</td><td>${conditions["None"]}</td></tr>

    <tr><td>Gender</td><td>${gender}</td></tr>
    <tr><td>Vaccinated</td><td>${vaccinated}</td></tr>
    <tr><td>Insurance</td><td>${insurance}</td></tr>

    <tr><td>Symptoms</td><td>${symptoms}</td></tr>

    </table>
    `;
}
