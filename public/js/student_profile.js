import {
    validatePassword,
    validateConfirmPassword,
} from "./modules/password_validation.js";

let pwvalid = false;
let pwcvalid = false;

const passwordUpdateForm = document.getElementById("passwordUpdateForm");
const passwordCancelBtn = document.getElementById("passwordCancelBtn");
const passwordEditBtn = document.getElementById("passwordEditBtn");
const passwordLabel = document.getElementById("password_label");
const passwordInput = document.getElementById("password");
const confirmPasswordLabel = document.getElementById("confirm_password_label");
const confirmPasswordInput = document.getElementById("confirmPassword");


const loadingOverlay = document.getElementById("loading");
const successOverlay = document.getElementById("success");
const failedOverlay = document.getElementById("failed");

const overlay = document.getElementsByClassName("overlay")[0];
const passwordUpdateContainer = document.getElementsByClassName(
    "password_reset_form"
)[0];
;
// ! Overlays

const openOverlay = () => {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
};

const closeOverlay = () => {
    passwordUpdateForm.reset();
    document.body.style.overflow = "auto";
    imagePreview.style.display = "none";
    overlay.style.display = "none";
};

const openPasswordUpdateForm = () => {
    openOverlay();
    passwordUpdateContainer.style.display = "block";
};

const closePasswordUpdateForm = () => {
    passwordUpdateContainer.style.display = "none";
    closeOverlay();
};

// ! Form Validations

const validatePasswordForm = () => {
    if (!pwvalid) {
        return false;
    } else if (!pwcvalid) {
        return false;
    }
    return true;
};

// ! Event handlers

const handlePasswordFormSubmission = (event) => {
    passwordUpdateContainer.style.display = "none";
    loadingOverlay.style.display = "flex";

    event.preventDefault();

    if (!validatePasswordForm()) {
        loadingOverlay.style.display = "none";
        failedOverlay.style.display = "flex";
        return;
    }

    const formData = new FormData(passwordUpdateForm);
    formData.forEach((value, key) => {
        console.log(key + ": " + value);
    });
    setTimeout(() => {
        loadingOverlay.style.display = "none";
        successOverlay.style.display = "flex";
    }, 1000);
};



// ! Event Listners

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

passwordEditBtn.addEventListener("click", openPasswordUpdateForm);
passwordCancelBtn.addEventListener("click", closePasswordUpdateForm);
successCloseBtn.addEventListener("click", () => {
    successOverlay.style.display = "none";
    closeOverlay();
});
failedCloseBtn.addEventListener("click", () => {
    failedOverlay.style.display = "none";
    closeOverlay();
});

passwordUpdateForm.addEventListener("submit", handlePasswordFormSubmission);
