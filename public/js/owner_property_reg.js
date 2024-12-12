const imagePreviewsContainer = document.getElementById("imagePreviews");
const profilePhotoInput = document.getElementById("profilePhoto");
const customFileNameInput = document.getElementById("customFileName");
const profileSelectBtn = document.getElementById("profileSelectBtn");

const legalDocInput = document.getElementById("legal_doc");
const customDocFileNameInput = document.getElementById("customDocFileName");
const docSelectBtn = document.getElementById("docSelectBtn");

const overlay = document.getElementById("overlay");
const overlayContentHTML = document.getElementById("overlayContent");

const paymentProcessing = `
<div class="payment-container">
<div class="header">Welcome to Boarding Bridge Payment Gateway</div>
<div class="payment-content">
    <!-- Payment Details -->
    <div class="payment-details">
        <h3>Payment Details</h3>
        <div class="form-group card-type">
            <label>Card Type</label>
            <input type="radio" name="card-type" value="visa" id="visa">
            <label for="visa"><img src="https://cdn.pixabay.com/photo/2021/12/06/13/48/visa-6850402_960_720.png" alt="Visa"></label>
            <input type="radio" name="card-type" value="mastercard" id="mastercard">
            <label for="mastercard"><img src="https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png" alt="Mastercard"></label>
        </div>
        <div class="form-group">
            <label for="card-number">Card Number</label>
            <input type="text" id="card-number" maxlength="16" placeholder="XXXX XXXX XXXX XXXX">
        </div>
        <div class="form-group">
            <label for="expiry">Expiration Date</label>
            <input type="text" id="expiry" placeholder="MM/YY">
        </div>
        <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="password" id="cvv" maxlength="3" placeholder="***">
        </div>
        <button class="btn-proceed" id="pay">Proceed</button>
    </div>
    <!-- Order Summary -->
    <div class="order-summary">
        <h3>Your Order</h3>
        <div class="amount">Total amount: 1,000.00 Rs</div>
        <div class="bank-logo">
            <img src="https://static.brandirectory.com/logos/PEOK001_pple_bank_logo_sent_by_client_jpeg.jpeg" alt="People's Bank">
        </div>
    </div>
</div>
</div>`;

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

const registrationSuccess = `Payment success! <br> Registeration compleate! <br> You will be redirected to the properties page..`;

const processPayment = (e) => {
    e.preventDefault();

    overlayContentHTML.innerHTML = paymentProcessing;
    document.getElementById("pay").addEventListener("click", handlePayment);
};

const handlePayment = (e) => {
    e.preventDefault();

    overlayContentHTML.innerHTML = loadingHTML;

    const loadingText = document.getElementById("loadingText");

    setTimeout(() => {
        loadingText.innerHTML = paymentSuccess;
        setTimeout(() => {
            loadingText.innerHTML = registrationSuccess;
            setTimeout(() => {
                window.location.href =
                    "http://localhost:5000/owner/page/property";
            }, 5000);
        }, 3000);
    }, 5000);
};

const handlePhotoInput = () => {
    const files = profilePhotoInput.files;
    if (files.length > 0) {
        customFileNameInput.style.backgroundColor = "white";
        customFileNameInput.value = `${files.length} file(s) selected`;
        imagePreviewsContainer.innerHTML = "";

        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();

            reader.onload = function (e) {
                const previewContainer = document.createElement("div");
                previewContainer.classList.add("image-preview");

                const imgElement = document.createElement("img");
                imgElement.src = e.target.result;
                imgElement.alt = file.name;

                const removeBtn = document.createElement("button");
                removeBtn.textContent = "Remove";
                removeBtn.onclick = () => {
                    const updatedFiles = Array.from(files).filter(
                        (_, idx) => idx !== index
                    );
                    const newDataTransfer = new DataTransfer();

                    updatedFiles.forEach((file) =>
                        newDataTransfer.items.add(file)
                    );
                    profilePhotoInput.files = newDataTransfer.files;

                    handlePhotoInput();
                };

                previewContainer.appendChild(imgElement);
                previewContainer.appendChild(removeBtn);
                imagePreviewsContainer.appendChild(previewContainer);
            };

            reader.readAsDataURL(file);
        });
    } else {
        customFileNameInput.value = "Property Images";
        imagePreviewsContainer.innerHTML = "";
    }
};

const handleDocInput = () => {
    const file = legalDocInput.files[0];
    if (file) {
        customDocFileNameInput.value = file.name;
    } else {
        customDocFileNameInput.value = "NIC/Driving License/Passport Document";
    }
};

const triggerDocInput = () => {
    customDocFileNameInput.style.backgroundColor = "white";
    legalDocInput.click();
};

const validateForm = () => {
    const termsCheckbox = document.getElementById("terms");

    if (!profilePhotoInput.files.length) {
        customFileNameInput.style.backgroundColor = "#ffe8e8";
        customFileNameInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
        return false;
    } else if (
        profilePhotoInput.files.length > 10 ||
        profilePhotoInput.files.length < 5
    ) {
        customFileNameInput.style.backgroundColor = "#ffe8e8";
        customFileNameInput.value =
            customFileNameInput.value + " (Minimun: 5, Maximum: 10)";
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
        return false;
    }
    return true;
};

const handleFormSubmission = (event) => {
    event.preventDefault();

    if (!validateForm()) return;
    /*
    const formData = new FormData(document.getElementById("registrationForm"));
    formData.forEach((value, key) => {
        console.log(key + ": " + value);
    });
    alert("Form submitted successfully!");*/

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
        .addEventListener("submit", processPayment);
};

profileSelectBtn.addEventListener("click", () => profilePhotoInput.click());
profilePhotoInput.addEventListener("change", handlePhotoInput);
legalDocInput.addEventListener("change", handleDocInput);
docSelectBtn.addEventListener("click", triggerDocInput);
registrationForm.addEventListener("submit", handleFormSubmission);
