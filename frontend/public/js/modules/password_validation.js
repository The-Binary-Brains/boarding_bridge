export const validatePassword = (passwordInput, passwordLabel) => {

    let valid = false;

    const pwErrors = [
        "Password must be at least 8 characters long.",
        "Password must contain at least one lowercase letter",
        "Password must contain at least one uppercase letter",
        "Password must contain at least one number.",
        "Password must contain at least one special character (!@#$%^&*)",
    ];

    passwordInput.style.backgroundColor = "#ffe8e8";

    if (passwordInput.value.length == 0) {
        passwordLabel.innerText = pwErrors[0];
    } else if (!/[!@#$%^&*]/.test(passwordInput.value)) {
        passwordLabel.innerText = pwErrors[4];
    } else if (!/[a-z]/.test(passwordInput.value)) {
        passwordLabel.innerText = pwErrors[1];
    } else if (!/[A-Z]/.test(passwordInput.value)) {
        passwordLabel.innerText = pwErrors[2];
    } else if (!/\d/.test(passwordInput.value)) {
        passwordLabel.innerText = pwErrors[3];
    } else if (passwordInput.value.length < 8) {
        passwordLabel.innerText = pwErrors[0];
    } else {
        passwordLabel.innerText = "Password is valid";
        passwordInput.style.backgroundColor = "#f0ffe8";
        valid = true;
    }
    return valid;
};

export const validateConfirmPassword = (passwordInput, confirmPasswordInput, confirmPasswordLabel) => {
    let valid = false;
    confirmPasswordInput.style.backgroundColor = "#ffe8e8";
    confirmPasswordLabel.innerText = "Passwords don't match";

    if (
        passwordInput.value === confirmPasswordInput.value &&
        confirmPasswordInput.value.length
    ) {
        confirmPasswordLabel.innerText = "Password confirmed";
        confirmPasswordInput.style.backgroundColor = "#f0ffe8";
        valid = true;
    }
    return valid;
};
