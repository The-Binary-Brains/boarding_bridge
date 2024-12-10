import {
    validatePassword,
    validateConfirmPassword,
} from "./modules/password_validation.js";

let pwvalid = false;
let pwcvalid = false;

const passwordUpdateForm = document.getElementById("passwordUpdateForm");
const contactUpdateForm = document.getElementById("contactUpdateForm");
const userUpdateForm = document.getElementById("userUpdateForm");
const profPicUpdateForm = document.getElementById("profPicUpdateForm");

const passwordCancelBtn = document.getElementById("passwordCancelBtn");
const contactCancelBtn = document.getElementById("contactCancelBtn");
const userCancelBtn = document.getElementById("userCancelBtn");
const profPicCancelBtn = document.getElementById("profPicCancelBtn");

const passwordEditBtn = document.getElementById("passwordEditBtn");
const contactEditBtn = document.getElementById("contactEditBtn");
const userEditBtn = document.getElementById("userEditBtn");
const profilePicEditBtn = document.getElementById("profilePicEditBtn");

const passwordLabel = document.getElementById("password_label");
const passwordInput = document.getElementById("password");
const confirmPasswordLabel = document.getElementById("confirm_password_label");
const confirmPasswordInput = document.getElementById("confirmPassword");
const profilePhotoInput = document.getElementById("profilePhoto");
const customFileNameInput = document.getElementById("customFileName");
const profileSelectBtn = document.getElementById("profileSelectBtn");
const successCloseBtn = document.getElementById("successCloseBtn");
const failedCloseBtn = document.getElementById("failedCloseBtn");

const loadingOverlay = document.getElementById("loading");
const successOverlay = document.getElementById("success");
const failedOverlay = document.getElementById("failed");

const overlay = document.getElementsByClassName("overlay")[0];
const passwordUpdateContainer = document.getElementsByClassName(
    "password_reset_form"
)[0];
const contactUpdateContainer = document.getElementsByClassName(
    "contact_update_form"
)[0];
const userUpdateContainer =
    document.getElementsByClassName("user_update_form")[0];
const profPicUpdateContainer = document.getElementsByClassName(
    "profpic_update_form"
)[0];

// ! Overlays

const openOverlay = () => {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
};

const closeOverlay = () => {
    passwordUpdateForm.reset();
    userUpdateForm.reset();
    profPicUpdateForm.reset();
    contactUpdateForm.reset();
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

const openContactUpdateForm = () => {
    openOverlay();
    contactUpdateContainer.style.display = "block";
};

const closeContactUpdateForm = () => {
    contactUpdateContainer.style.display = "none";
    closeOverlay();
};

const openUserUpdateForm = () => {
    openOverlay();
    userUpdateContainer.style.display = "block";
};

const closeUserUpdateForm = () => {
    userUpdateContainer.style.display = "none";
    closeOverlay();
};

const openProfPicUpdateForm = () => {
    openOverlay();
    profPicUpdateContainer.style.display = "block";
};

const closeProfPicUpdateForm = () => {
    profPicUpdateContainer.style.display = "none";
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

const validateProfilePicForm = () => {
    if (!profilePhotoInput.files.length) {
        return false;
    } else {
        return true;
    }
};

// ! Event handlers

const handlePasswordFormSubmission = async (event) => {
    passwordUpdateContainer.style.display = "none";
    loadingOverlay.style.display = "flex";

    event.preventDefault();

    if (!validatePasswordForm()) {
        loadingOverlay.style.display = "none";
        failedOverlay.style.display = "flex";
        return;
    }

    const formData = new FormData(passwordUpdateForm);

    try {
        const formDataObj = Object.fromEntries(formData.entries());
        const jsonFormData = JSON.stringify(formDataObj);

        const response = await fetch(
            `http://localhost:5000/owner/api/profile/update/password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonFormData,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Property edited successfully:", result);
        loadingOverlay.style.display = "none";
        successOverlay.style.display = "flex";
    } catch (error) {
        console.error("Error editing property:", error);
    }
};

const handleProfilePicFormSubmission = async (event) => {
    profPicUpdateContainer.style.display = "none";
    loadingOverlay.style.display = "flex";
    event.preventDefault();

    if (!validateProfilePicForm()) {
        loadingOverlay.style.display = "none";
        failedOverlay.style.display = "flex";
        return;
    }

    const formData = new FormData(profPicUpdateForm);

    try {

        const response = await fetch(
            `http://localhost:5000/owner/api/profile/update/image`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Property edited successfully:", result);
        loadingOverlay.style.display = "none";
        successOverlay.style.display = "flex";
    } catch (error) {
        console.error("Error editing property:", error);
    }
};

const handleUserFormSubmission = async (event) => {
    userUpdateContainer.style.display = "none";
    loadingOverlay.style.display = "flex";
    event.preventDefault();

    const formData = new FormData(userUpdateForm);

    try {
        const formDataObj = Object.fromEntries(formData.entries());
        const jsonFormData = JSON.stringify(formDataObj);

        const response = await fetch(
            `http://localhost:5000/owner/api/profile/update/account`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonFormData,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Property edited successfully:", result);
        loadingOverlay.style.display = "none";
        successOverlay.style.display = "flex";
    } catch (error) {
        console.error("Error editing property:", error);
    }
};

const handleContactFormSubmission = async (event) => {
    contactUpdateContainer.style.display = "none";
    loadingOverlay.style.display = "flex";
    event.preventDefault();

    const formData = new FormData(contactUpdateForm);

    try {
        const formDataObj = Object.fromEntries(formData.entries());
        const jsonFormData = JSON.stringify(formDataObj);

        const response = await fetch(
            `http://localhost:5000/owner/api/profile/update/contact`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonFormData,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Property edited successfully:", result);
        loadingOverlay.style.display = "none";
        successOverlay.style.display = "flex";
    } catch (error) {
        console.error("Error editing property:", error);
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

const triggerPhotoInput = () => {
    customFileNameInput.style.backgroundColor = "white";
    profilePhotoInput.click();
};

profilePhotoInput.addEventListener("change", handlePhotoInput);
customFileName.addEventListener("click", triggerPhotoInput);
profileSelectBtn.addEventListener("click", triggerPhotoInput);
passwordEditBtn.addEventListener("click", openPasswordUpdateForm);
contactEditBtn.addEventListener("click", openContactUpdateForm);
userEditBtn.addEventListener("click", openUserUpdateForm);
profilePicEditBtn.addEventListener("click", openProfPicUpdateForm);
passwordCancelBtn.addEventListener("click", closePasswordUpdateForm);
contactCancelBtn.addEventListener("click", closeContactUpdateForm);
userCancelBtn.addEventListener("click", closeUserUpdateForm);
profPicCancelBtn.addEventListener("click", closeProfPicUpdateForm);
successCloseBtn.addEventListener("click", () => {
    window.location.href = "http://localhost:5000/owner/page/profile";
});
failedCloseBtn.addEventListener("click", () => {
    failedOverlay.style.display = "none";
    closeOverlay();
});

passwordUpdateForm.addEventListener("submit", handlePasswordFormSubmission);
userUpdateForm.addEventListener("submit", handleUserFormSubmission);
profPicUpdateForm.addEventListener("submit", handleProfilePicFormSubmission);
contactUpdateForm.addEventListener("submit", handleContactFormSubmission);
