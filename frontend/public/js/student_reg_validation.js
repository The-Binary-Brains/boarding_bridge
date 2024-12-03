import {
    validatePassword,
    validateConfirmPassword,
} from "./modules/password_validation.js";

let pwvalid = false;
let pwcvalid = false;

const registrationForm = document.getElementById("registrationForm");
const passwordLabel = document.getElementById("password_label");
const passwordInput = document.getElementById("password");
const confirmPasswordLabel = document.getElementById("confirm_password_label");
const confirmPasswordInput = document.getElementById("confirmPassword");

// ! Event handlers
const validateForm = () => {
    const termsCheckbox = document.getElementById("terms");

    if (!pwvalid) {
        passwordInput.scrollIntoView({ behavior: "smooth", block: "center" });
        return false;
    } else if (!pwcvalid) {
        confirmPasswordInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
        return false;
    } else if (!termsCheckbox.checked) {
        alert("You must agree to the Terms and Conditions.");
        return false;
    }
    return true;
};

const handleFormSubmission = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(document.getElementById("registrationForm"));
    formData.forEach((value, key) => {
        console.log(key + ": " + value);
    });
    alert("Form submitted successfully!");
};

// ! Event Listners
registrationForm.addEventListener("submit", handleFormSubmission);
passwordInput.addEventListener("input", () => {
    pwvalid = validatePassword(passwordInput, passwordLabel);
    pwcvalid = validateConfirmPassword(
        passwordInput,
        confirmPasswordInput,
        confirmPasswordLabel
    );
});
confirmPasswordInput.addEventListener("input", () => {
    pwcvalid = validateConfirmPassword(
        passwordInput,
        confirmPasswordInput,
        confirmPasswordLabel
    );
});
