const regForm = document.querySelector('.register');

regForm.addEventListener('submit', function(event) {
    
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const emailAddress = document.getElementById('emailAddress').value.trim();
    const assemblyDistrict = document.getElementById('assemblyDistrict').value.trim();
    const expectations = document.getElementById('expectations').value.trim();
    
    const submitBtn = regForm.querySelector('.submit-btn');
    submitBtn.innerText = "Processing...";
    
    const formData = {
        name: fullName,
        phone: phoneNumber,
        email: emailAddress,
        district: assemblyDistrict,
        expectations: expectations
    };

    
    fetch('https://script.google.com/macros/s/AKfycbyY6wfcXoJ_dY_6q8NqYB3JibbIU1NFOdv1xdyzF6k-VAIBFtEVwSpXmhh6vHJju7Hz/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        
        const rawMessage = `AOYC '26 Registration Details:\n\n` +
                           `• Name: ${fullName}\n` +
                           `• Phone: ${phoneNumber}\n` +
                           `• Email: ${emailAddress}\n` +
                           `• Assembly/District: ${assemblyDistrict}\n` +
                           `• Expectations: ${expectations}`;
                           
        const groupCode = "https://chat.whatsapp.com/JyF7AmlcULFKetoCdUzRgS?s=cl&p=a&ilr=0"; 
        const groupLink = `https://chat.whatsapp.com/` + groupCode;
    
        alert("Registration saved to database! Opening the AOYC group chat now...");
    
        window.open(groupLink, '_blank');

        submitBtn.innerText = "Complete Registration";
        regForm.reset();
    })
    .catch(error => {
        console.error('Submission failed:', error);
        submitBtn.innerText = "Complete Registration";
        alert("Something went wrong. Please check your connection and try again.");
    });
});