const webAppUrl = "https://script.google.com/macros/s/AKfycbwUG_oWP5gE-LWlxMiw58beVQbEUAgVVVUFqY7QIawn86iJ8ZJE4lCNBCEgsYj9soc/exec";
const adminNumber = "2348109328490";

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.innerText = "Submitting...";
    

    const formData = {
        name: fullName.value,
        phone: phoneNumber.value,
        email: emailAddress.value,
        assembly: assembly.value,
        district: district.value,
        expectations: expectations.value
    };
    
    
    fetch(webAppUrl, {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => {
        
        const rawMessage = `🙌 *NEW AOYC '26 REGISTRATION*\n\n` +
                           `• *Name:* ${formData.name}\n` +
                           `• *Phone:* ${formData.phone}\n` +
                           `• *Email:* ${formData.email}\n` +
                           `• *Assembly:* ${formData.assembly}\n` +
                           `• *District:* ${formData.district}\n` +
                           `• *Expectations:* ${formData.expectations}`;
        
        const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(rawMessage)}`;
        
        alert("Registration saved! WhatsApp will open. Tap 'Send' to notify us.");
        window.open(whatsappURL, '_blank'); 
        
        submitBtn.innerText = "Complete Registration";
        regForm.reset();
    })
    .catch(error => {
        alert("Error saving. Please try again.");
        submitBtn.innerText = "Complete Registration";
    });
});