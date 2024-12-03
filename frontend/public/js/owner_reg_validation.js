import {
    validatePassword,
    validateConfirmPassword,
} from "./modules/password_validation.js";

const imagePreview = document.getElementById("imagePreview");
const profilePhotoInput = document.getElementById("profilePhoto");
const customFileNameInput = document.getElementById("customFileName");
const profileSelectBtn = document.getElementById("profileSelectBtn");
const registrationForm = document.getElementById("registrationForm");
const legalDocInput = document.getElementById("legal_doc");
const customDocFileNameInput = document.getElementById("customDocFileName");
const docSelectBtn = document.getElementById("docSelectBtn");
const passwordLabel = document.getElementById("password_label");
const passwordInput = document.getElementById("password");
const confirmPasswordLabel = document.getElementById("confirm_password_label");
const confirmPasswordInput = document.getElementById("confirmPassword");

let pwvalid = false;
let pwcvalid = false;

// ! Event handlers

const handleDocInput = () => {
    const file = legalDocInput.files[0];
    if (file) {
        customDocFileNameInput.value = file.name;
    } else {
        customDocFileNameInput.value = "NIC/Driving License/Passport Document";
    }
};

const handlePhotoInput = () => {
    const file = profilePhotoInput.files[0];
    if (file) {
        customFileNameInput.value = file.name;
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        customFileNameInput.value = "Profile photo";
        imagePreview.style.display = "none";
    }
};

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
    } else if (!profilePhotoInput.files.length) {
        customFileNameInput.style.backgroundColor = "#ffe8e8";
        customFileNameInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
        return false;
    } else if (!legalDocInput.files.length) {
        customDocFileNameInput.style.backgroundColor = "#ffe8e8";
        customDocFileNameInput.scrollIntoView({
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

const triggerPhotoInput = () => {
    customFileNameInput.style.backgroundColor = "white";
    profilePhotoInput.click();
};

const triggerDocInput = () => {
    customDocFileNameInput.style.backgroundColor = "white";
    legalDocInput.click();
};

// ! Event Listners

legalDocInput.addEventListener("change", handleDocInput);
profilePhotoInput.addEventListener("change", handlePhotoInput);
registrationForm.addEventListener("submit", handleFormSubmission);
customFileName.addEventListener("click", triggerPhotoInput);
profileSelectBtn.addEventListener("click", triggerPhotoInput);
customDocFileNameInput.addEventListener("click", triggerDocInput);
docSelectBtn.addEventListener("click", triggerDocInput);
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
