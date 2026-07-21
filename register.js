const webAppUrl = "https://script.google.com/macros/s/AKfycbwoRLepzsdW-Rof7aunSp-oYJaXk8qiDxGFBeRFun4dXx9ligrZ2iMwhWesZmUojKvP/exec";
const adminNumber = "2349025739201";

const regForm = document.querySelector(".register");
const submitBtn = document.querySelector(".submit-btn");

regForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    const fullName = document.getElementById("fullName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const assembly = document.getElementById("assembly").value.trim();
    const district = document.getElementById("district").value;
    const expectations = document.getElementById("expectations").value.trim();

    const sleepoverSelect = document.getElementById("sleepovers");

    const sleepovers = Array.from(sleepoverSelect.selectedOptions)
        .map(option => option.value)
        .join(", ") || "NONE";

    const formData = {
        name: fullName,
        phone: phoneNumber,
        email: emailAddress,
        assembly: assembly,
        district: district,
        sleepovers: sleepovers,
        expectations: expectations
    };

    try {

        const response = await fetch(webAppUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        const message =
`🙌 *NEW AOYC '26 REGISTRATION*

👤 Name: ${formData.name}

📞 Phone: ${formData.phone}

📧 Email: ${formData.email}

🏛 Assembly: ${formData.assembly}

🌍 District: ${formData.district}

🛏 Sleepovers: ${formData.sleepovers}

💭 Expectations:
${formData.expectations}`;

        window.open(
            `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`,
            "_blank"
        );

        alert("Registration Successful!");

        regForm.reset();

    } catch (error) {

        alert(error.message || "Registration failed.");

        console.error(error);

    } finally {

        submitBtn.disabled = false;
        submitBtn.innerText = "Complete Registration";

    }

});