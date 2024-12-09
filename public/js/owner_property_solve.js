const imagePreviewsContainer = document.getElementById("imagePreviews");
const profilePhotoInput = document.getElementById("profilePhoto");
const customFileNameInput = document.getElementById("customFileName");
const profileSelectBtn = document.getElementById("profileSelectBtn");

const legalDocInput = document.getElementById("legal_doc");
const customDocFileNameInput = document.getElementById("customDocFileName");
const docSelectBtn = document.getElementById("docSelectBtn");

const overlay = document.getElementById("overlay");
const overlayContentHTML = document.getElementById("overlayContent");

const loadingHTML = `
<div class="loading" id="loading">
<div class="spinner"></div>
<div class="loading-text" id="loadingText">Submitting Changes...</div>
</div>
`;

const submissionSuccess = `Submit success! <br> You will be redirected to the properties page..`;

const handleSubmit = () => {
    overlayContentHTML.innerHTML = loadingHTML;

    const loadingText = document.getElementById("loadingText");

    setTimeout(() => {
        loadingText.innerHTML = submissionSuccess;
        setTimeout(() => {
            window.location.href = "http://localhost:5000/owner/page/property";
        }, 5000);
    }, 3000);
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

    const formData = new FormData(document.getElementById("registrationForm"));
    formData.forEach((value, key) => {
        console.log(key + ": " + value);
    });

    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    handleSubmit();
};

profileSelectBtn.addEventListener("click", () => profilePhotoInput.click());
profilePhotoInput.addEventListener("change", handlePhotoInput);
legalDocInput.addEventListener("change", handleDocInput);
docSelectBtn.addEventListener("click", triggerDocInput);
registrationForm.addEventListener("submit", handleFormSubmission);
