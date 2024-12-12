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

const overlay = document.getElementById("overlay");
const overlayContentHTML = document.getElementById("overlayContent");

const paymetGetaway = `
<div class="payment_getaway">
                <div class="container_title">Payment Getaway</div>
                <div class="container_line"></div>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>Jhon Doe</td>
                        </tr>
                        <tr>
                            <td>Payment ID:</td>
                            <td>PY51568613864</td>
                        </tr>
                        <tr>
                            <td>Amount:</td>
                            <td>Rs: 1000</td>
                        </tr>
                    </tbody>
                </table>
                <div class="container_line"></div>
                <div class="info">Enter the CAPTCHA before submit</div>
                <div class="captcha">^5wd46@#</div>
                <form id="paymentCaptcha">
                    <input type="text" required />
                    <div class="container_line"></div>
                    <div class="button_container">
                        <button id="cancelPaymentBtn" type="button">Cancel</button>
                        <button type="submit">Pay</button>
                    </div>
                </form>
            </div>
`;

const loadingHTML = `
<div class="loading" id="loading">
<div class="spinner"></div>
<div class="loading-text" id="loadingText">Payment Processing...</div>
</div>
`;

const paymentSuccess = `Payment success! <br> Finishing up registration... <br>`;

const registrationSuccess = `Payment success! <br> Registeration compleate! <br> You will be redirected to the login page shortly..`;

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


const handlePaymet = async (e) => {
    e.preventDefault();

    overlayContentHTML.innerHTML = loadingHTML;

    const loadingText = document.getElementById("loadingText");


    loadingText.innerHTML = paymentSuccess;

    const formData = new FormData(document.getElementById("registrationForm"));

    try {
        const response = await fetch(
            `http://localhost:5000/owner/api/register`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.message == "success") {
            overlayContentHTML.innerHTML = registrationSuccess;
            setTimeout(() => {
                window.location.href = "http://localhost:5000/owner/page/login";
            }, 5000);
        }else {
            overlayContentHTML.innerHTML =
            "Error submitting data, please try again.";
        }

    } catch (error) {
        overlayContentHTML.innerHTML =
            "Error submitting data, please try again.";
            document.body.style.overflow = "";
        console.error("Error:", error);
    }
};

const handleFormSubmission = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    overlayContentHTML.innerHTML = paymetGetaway;

    document
        .getElementById("cancelPaymentBtn")
        .addEventListener("click", () => {
            overlay.style.display = "none";
            document.body.style.overflow = "";
        });

    document
        .getElementById("paymentCaptcha")
        .addEventListener("submit", handlePaymet);
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
