function reviewForm() {

    let f = document.getElementById("patientForm");

    let first = f.firstname.value.trim();
    let last = f.lastname.value.trim();
    let dob = f.dob.value;
    let email = f.email.value;
    let phone = f.phone.value;
    let address = f.address1.value;
    let city = f.city.value;
    let state = f.state.value;
    let zip = f.zip.value;

    // VALIDATION FUNCTIONS
    function status(condition, errorMsg) {
        return condition ? '<span style="color:green">pass</span>'
                         : `<span style="color:red">ERROR: ${errorMsg}</span>`;
    }

    let today = new Date();
    let dobDate = new Date(dob);

    let nameStatus = status(first && last, "Missing name");
    let dobStatus = status(dob && dobDate <= today, "Date in the future");
    let emailStatus = status(email.includes("@"), "Invalid email");
    let phoneStatus = status(phone.length >= 10, "Invalid phone");
    let zipStatus = status(zip, "Missing Zip Code");

    // CHECKBOXES Y/N
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

    // RADIOS
    let gender = document.querySelector('input[name="gender"]:checked')?.value || "N/A";
    let vaccinated = document.querySelector('input[name="vaccinated"]:checked')?.value || "N/A";
    let insurance = document.querySelector('input[name="insurance"]:checked')?.value || "N/A";

    // OUTPUT
    document.getElementById("reviewSection").innerHTML = `

    <h2>PLEASE REVIEW THIS INFORMATION</h2>

    <table width="100%">
    <tr><td>Name</td><td>${first} ${last}</td><td>${nameStatus}</td></tr>
    <tr><td>Date of Birth</td><td>${dob}</td><td>${dobStatus}</td></tr>
    <tr><td>Email</td><td>${email}</td><td>${emailStatus}</td></tr>
    <tr><td>Phone</td><td>${phone}</td><td>${phoneStatus}</td></tr>
    <tr><td>Address</td><td>${address}, ${city}, ${state} ${zip}</td><td>${zipStatus}</td></tr>
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
    </table>
    `;
}
