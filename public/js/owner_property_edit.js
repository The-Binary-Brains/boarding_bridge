const imagePreviewsContainer = document.getElementById("imagePreviews");
const propertyPhotoInput = document.getElementById("profilePhoto");
const customFileNameInput = document.getElementById("customFileName");
const profileSelectBtn = document.getElementById("profileSelectBtn");

const overlay = document.getElementById("overlay");
const overlayContentHTML = document.getElementById("overlayContent");

const loadingHTML = `
<div class="loading" id="loading">
<div class="spinner"></div>
<div class="loading-text" id="loadingText">Updating Property...</div>
</div>
`;

const updateSuccess = `Update success! <br> You will be redirected to the properties page..`;

// Simulated server data
const formData = {
    name: "Cozy Apartment",
    propertyType: "apartment",
    occupancy: 4,
    furnishingType: "fully-furnished",
    amenities: ["wifi", "kitchen", "bath"],
    about: "A cozy apartment located near the university.",
    email: "owner@example.com",
    phone: "12345678",
};

// ! Event Handlers

const updateProperty = () => {
    overlayContentHTML.innerHTML = loadingHTML;

    const loadingText = document.getElementById("loadingText");

    setTimeout(() => {
        loadingText.innerHTML = updateSuccess;
        setTimeout(() => {
            window.location.href = "http://localhost:5000/owner/page/property";
        }, 3000);
    }, 5000);
};

const handlePhotoInput = () => {
    const files = propertyPhotoInput.files;
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
                    propertyPhotoInput.files = newDataTransfer.files;

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

const validateForm = () => {
    const termsCheckbox = document.getElementById("terms");

    if (!propertyPhotoInput.files.length) {
        customFileNameInput.style.backgroundColor = "#ffe8e8";
        customFileNameInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
        return false;
    } else if (
        propertyPhotoInput.files.length > 10 ||
        propertyPhotoInput.files.length < 5
    ) {
        customFileNameInput.style.backgroundColor = "#ffe8e8";
        customFileNameInput.value =
            customFileNameInput.value + " (Minimun: 5, Maximum: 10)";
        customFileNameInput.scrollIntoView({
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
    updateProperty();
};

// ! Event Listners

profileSelectBtn.addEventListener("click", () => propertyPhotoInput.click());
propertyPhotoInput.addEventListener("change", handlePhotoInput);
registrationForm.addEventListener("submit", handleFormSubmission);

// Function to auto-fill form
document.addEventListener("DOMContentLoaded", () => {
    // Fill text and number inputs
    document.getElementById("name").value = formData.name;
    document.getElementById("occupancy").value = formData.occupancy;
    document.getElementById("about").value = formData.about;
    document.getElementById("email").value = formData.email;
    document.getElementById("phone").value = formData.phone;

    // Fill select input
    document.getElementById("propertyType").value = formData.propertyType;

    // Fill radio buttons
    const furnishingRadios = document.querySelectorAll(
        'input[name="furnishingType"]'
    );
    furnishingRadios.forEach((radio) => {
        if (radio.value === formData.furnishingType) {
            radio.checked = true;
        }
    });

    // Fill checkboxes
    formData.amenities.forEach((amenity) => {
        const checkbox = document.getElementById(amenity);
        if (checkbox) checkbox.checked = true;
    });
});
