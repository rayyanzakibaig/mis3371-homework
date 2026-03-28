function reviewForm() {

    let f = document.getElementById("patientForm");

    let first = f.firstname.value;
    let mi = f.mi.value;
    let last = f.lastname.value;
    let dob = f.dob.value;
    let email = f.email.value;
    let phone = f.phone.value;
    let address = f.address1.value;
    let city = f.city.value;
    let state = f.state.value;
    let zip = f.zip.value;

    // DOB validation
    let dobStatus = "pass";
    let today = new Date();
    let inputDate = new Date(dob);

    if (inputDate > today) {
        dobStatus = "ERROR: Cannot be in the future";
    }

    // ZIP validation
    let zipStatus = zip ? "pass" : "ERROR: Missing Zip Code";

    // Checkbox Y/N mapping
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

    // Radio values
    let gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    let vaccinated = document.querySelector('input[name="vaccinated"]:checked')?.value || "";
    let insurance = document.querySelector('input[name="insurance"]:checked')?.value || "";

    // OUTPUT
    document.getElementById("reviewSection").innerHTML = `

    <h2>PLEASE REVIEW THIS INFORMATION</h2>

    <table width="100%">

    <tr>
    <td><b>Name</b></td>
    <td>${first} ${mi} ${last}</td>
    <td style="color:green">pass</td>
    </tr>

    <tr>
    <td><b>Date of Birth</b></td>
    <td>${dob}</td>
    <td style="color:red">${dobStatus}</td>
    </tr>

    <tr>
    <td><b>Email</b></td>
    <td>${email}</td>
    <td style="color:green">pass</td>
    </tr>

    <tr>
    <td><b>Phone</b></td>
    <td>${phone}</td>
    <td style="color:green">pass</td>
    </tr>

    <tr>
    <td><b>Address</b></td>
    <td>${address}<br>${city}, ${state} ${zip}</td>
    <td style="color:red">${zipStatus}</td>
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

    </table>
    `;
}
