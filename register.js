const webAppUrl = "https://script.google.com/macros/s/AKfycbyDyRrZJRh-RFcQxClCVnN0ZDNVJCUKN3e_Cyf8vTp_syQFq_fQBLLvGAeW9UDfcRbG/exec";
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
        // 1. Post to Google Sheet
        await fetch(webAppUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify(formData)
        });

        // 2. Format WhatsApp Message
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

        // 3. Encode message safely
        const encodedMessage = encodeURIComponent(message);
        
        // Use standard wa.me link with &text= for maximum mobile compatibility
        const whatsappURL = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

        alert("Registration Successful! Opening WhatsApp to notify admin...");

        // 4. Direct redirection (bypasses popup blocker completely)
        window.location.href = whatsappURL;

        regForm.reset();

    } catch (error) {
        alert("Registration failed. Please check your internet connection and try again.");
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Complete Registration";
    }
});