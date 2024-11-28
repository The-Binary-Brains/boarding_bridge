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

var valid = false;

const pwErrors = [
    "Password must be at least 8 characters long.",
    "Password must contain at least one lowercase letter",
    "Password must contain at least one uppercase letter",
    "Password must contain at least one number.",
    "Password must contain at least one special character (!@#$%^&*)",
];

// ! Event handlers

const handleDocInput = () => {
    const file = legalDocInput.files[0];
    if (file) {
        customDocFileNameInput.value = file.name;
    } else {
        customDocFileNameInput.value = "NIC/Driving License/Passport Document";
    }
};

const validatePassword = () => {
    passwordInput.style.backgroundColor = "#ffe8e8";
    validateConfirmPassword();
    if (passwordInput.value.length == 0) {
        passwordLabel.innerText = pwErrors[0];
        valid = false;
    } else if (!/[!@#$%^&*]/.test(passwordInput.value)) {
        passwordLabel.innerText = pwErrors[4];
        valid = false;
    } else if (!/[a-z]/.test(passwordInput.value)) {
        passwordLabel.innerText = pwErrors[1];
        valid = false;
    } else if (!/[A-Z]/.test(passwordInput.value)) {
        passwordLabel.innerText = pwErrors[2];
        valid = false;
    } else if (!/\d/.test(passwordInput.value)) {
        passwordLabel.innerText = pwErrors[3];
        valid = false;
    } else if (passwordInput.value.length < 8) {
        passwordLabel.innerText = pwErrors[0];
        valid = false;
    } else {
        passwordLabel.innerText = "Password is valid";
        passwordInput.style.backgroundColor = "#f0ffe8";
    }
};

const validateConfirmPassword = () => {
    valid = false;
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

    if (!valid) {
        passwordInput.scrollIntoView({ behavior: "smooth", block: "center" });
        return false;
    } else if (!profilePhotoInput.files.length) {
        customFileNameInput.style.backgroundColor = "#ffe8e8";
        customFileNameInput.scrollIntoView({ behavior: "smooth", block: "center" });
        return false;
    } else if (!legalDocInput.files.length) {
        customDocFileNameInput.style.backgroundColor = "#ffe8e8";
        customDocFileNameInput.scrollIntoView({ behavior: "smooth", block: "center" });
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
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
