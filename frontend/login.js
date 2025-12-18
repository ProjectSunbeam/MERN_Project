function validateForm() {
    let email = document.getElementById("emailip").value.trim();
    let password = document.getElementById("passip").value.trim();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return false;
    }

    let buttonip = document.getElementById("buttonip");
    buttonip.addEventListener("click",alert("Login Successful!"));
    return true;
}