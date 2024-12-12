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

const overlay = document.getElementById("overlay");
const overlayContentHTML = document.getElementById("overlayContent");

const loadingHTML = `
<div class="loading" id="loading">
<div class="spinner"></div>
<div class="loading-text" id="loadingText">Please Wait...</div>
</div>
`;

const registrationSuccess = ` Registeration compleate! <br> You will be redirected to the login page shortly..`;

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

const handleFormSubmission = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    overlayContentHTML.innerHTML = loadingHTML;

    const formElement = document.getElementById("registrationForm");
    const formData = new FormData(formElement);

    const formJSON = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(
            `http://localhost:5000/student/api/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formJSON),
            }
        );

        const result = await response.json();
        const status_code = result.status_code

        if (status_code == 0) {
            overlayContentHTML.innerHTML = "No Students found";
            setTimeout(() => {
                overlay.style.display = "none";
                document.body.style.overflow = "";
            }, 5000);

        } else if (status_code == 1) {
            overlayContentHTML.innerHTML = registrationSuccess;
            setTimeout(() => {
                overlay.style.display = "none";
                document.body.style.overflow = "";
                window.location.href =
                    "http://localhost:5000/student/page/login";
            }, 5000);

        } else if (status_code == 2) {
            overlayContentHTML.innerHTML = "Student Already Registerd";
            setTimeout(() => {
                overlay.style.display = "none";
                document.body.style.overflow = "";
            }, 5000);

        } else {
            overlayContentHTML.innerHTML =
                "Error submitting data, please try again.";
            setTimeout(() => {
                overlay.style.display = "none";
                document.body.style.overflow = "";
            }, 5000);

        }

    } catch (error) {
        overlayContentHTML.innerHTML =
            "Error submitting data, please try again.";
            document.body.style.overflow = "";
        console.error("Error:", error);
    }
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
