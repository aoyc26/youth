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

        // 2. Unicode escape mapping for clean cross-platform rendering
        const iconRaisingHands = "\u{1F64C}"; // 🙌
        const iconUser = "\u{1F464}";         // 👤
        const iconPhone = "\u{1F4DE}";        // 📞
        const iconEmail = "\u{1F327}";        // 📧
        const iconBuilding = "\u{1F3DB}";     // 🏛
        const iconGlobe = "\u{1F30D}";        // 🌍
        const iconBed = "\u{1F6CF}";          // 🛏
        const iconThought = "\u{1F4AD}";      // 💭

        // 3. Construct message with explicit newline (\n) characters
        const rawMessage = 
            iconRaisingHands + " *NEW AOYC '26 REGISTRATION*\n\n" +
            iconUser + " *Name:* " + formData.name + "\n" +
            iconPhone + " *Phone:* " + formData.phone + "\n" +
            iconEmail + " *Email:* " + formData.email + "\n" +
            iconBuilding + " *Assembly:* " + formData.assembly + "\n" +
            iconGlobe + " *District:* " + formData.district + "\n" +
            iconBed + " *Sleepovers:* " + formData.sleepovers + "\n\n" +
            iconThought + " *Expectations:*\n" + formData.expectations;

        // 4. Safely encode URL query parameter
        const encodedMessage = encodeURIComponent(rawMessage);

        alert("Registration Successful! WhatsApp will open now.");

        // 5. Open WhatsApp using window.location.href
        window.location.href = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

        regForm.reset();

    } catch (error) {
        alert("Registration failed. Please check your internet connection and try again.");
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Complete Registration";
    }
});