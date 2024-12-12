// Get elements
const galleryButton = document.getElementById("gallery");
const galleryPopup = document.getElementById("galleryPopup");
const closePopup = document.getElementById("closePopup");

const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const pageNumber = document.getElementById("page-number");
const imgPreview = document.getElementById("img-preview");

let images = [
    "/uploads/prop1.jpeg",
    "/uploads/prop2.jpeg",
    "/uploads/prop3.jpeg",
    "/uploads/prop10.jpg",
    "/uploads/prop9.jpg",
    "/uploads/prop5.jpg",
    "/uploads/prop6.jpg",
    "/uploads/prop7.jpg",
    "/uploads/prop8.jpg",
];
let currentIndex = 0;

// Open the popup when the gallery button is clicked
galleryButton.addEventListener("click", () => {
    galleryPopup.style.display = "flex";
    document.body.style.overflow = "hidden";

    if (images.length > 0) {
        changeImage(currentIndex);
    } else {
        console.error("No images available to display.");
    }
});

leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        changeImage(currentIndex);
    }
});

rightBtn.addEventListener("click", () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        changeImage(currentIndex);
    }
});

const changeImage = (index) => {
    imgPreview.src = images[index]; // Update the image source
    pageNumber.innerText = `${index + 1}/${images.length}`; // Update the page number
};


// Close the popup when the close button is clicked
closePopup.addEventListener("click", () => {
    galleryPopup.style.display = "none";
    document.body.style.overflow = "";
});

// Close the popup if clicked outside the popup content
window.addEventListener("click", (event) => {
    if (event.target === galleryPopup) {
        galleryPopup.style.display = "none";
        document.body.style.overflow = "";
    }
});



// Reservation Popup
const reservationButton = document.getElementById("reservation");
const reservationPopup = document.getElementById("reservationPopup");
const close = document.getElementById("close");
const reserveMain = document.getElementById("reserve-main");

const successContent = `
    <div class="success">
    <div class="title">Done!</div>
    <div class="message"> You have successfully reserved property for visit at Date</div>
    </div>`;

const failedContent = `
    <div class="success">
    <div class="title">Date Unavailable</div>
    <div class="message"> The date you chose is unavailable, <br>Pleace choose another date </div>
    <form id="date-reservation" onsubmit="formEventHandler(event)">
        <input name="date" id="date" type="date" class="date" required/>
        <button id="date-selection" type="submit" class="date-btn">
            Confirm Date
        </button>
    </form>`;

const defaultContent = `
        <div class="success">
        <form id="date-reservation" onsubmit="formEventHandler(event)">
            <input name="date" id="date" type="date" class="date" required/>
            <button id="date-selection" type="submit" class="date-btn">
                Confirm Date
            </button>
        </form>`;

reserveMain.innerHTML = defaultContent;
const form = document.getElementById("date-reservation");

// Open the popup when the filter button is clicked
reservationButton.addEventListener("click", () => {
    reservationPopup.style.display = "flex";
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    reserveMain.innerHTML = defaultContent;
    reservationPopup.style.display = "none";
    document.body.style.overflow = "";
});

// Close the popup if clicked outside the popup content
window.addEventListener("click", (event) => {
    if (event.target === reservationPopup) {
        reserveMain.innerHTML = defaultContent;
        reservationPopup.style.display = "none";
        document.body.style.overflow = "";
    }
});

const formEventHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(
            `http://localhost:5000/student/api/reservation/new`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formJSON),
            }
        );

        const result = await response.json();

        if (result == "success") {
            reserveMain.innerHTML = successContent;
        } else {
            reserveMain.innerHTML = failedContent;
        }
    } catch (error) {
        console.log(error);
    }
};
