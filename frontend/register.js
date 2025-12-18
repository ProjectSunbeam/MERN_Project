function validateForm() {

    let name = document.getElementById("nameip").value.trim();
    let email = document.getElementById("emailip").value.trim();
    let password = document.getElementById("passip").value.trim();
    let phone = document.getElementById("phoneip").value.trim();

    // Name validation
    let namePattern = /^[A-Za-z ]+$/;
    if (name === "") {
        alert("Name is required");
        return false;
    }
    if (!namePattern.test(name)) {
        alert("Name should contain only letters");
        return false;
    }

    // Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return false;
    }

    // Password validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return false;
    }

    // Phone number validation
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Phone number must be 10 digits");
        return false;
    }

    let buttonip = document.getElementById("buttonip");
    buttonip.addEventListener("click",alert("Registration Successful!"));
    return true;
}