// Get elements
const galleryButton = document.getElementById('gallery');
const galleryPopup = document.getElementById('galleryPopup');
const closePopup = document.getElementById('closePopup');

// Open the popup when the filter button is clicked
galleryButton.addEventListener('click', () => {
    galleryPopup.style.display = 'flex';
});

// Close the popup when the close button is clicked
closePopup.addEventListener('click', () => {
    galleryPopup.style.display = 'none';
});

// Close the popup if clicked outside the popup content
window.addEventListener('click', (event) => {
    if (event.target === galleryPopup) {
        galleryPopup.style.display = 'none';
    }
});

// Reservation Popup
const reservationButton = document.getElementById('reservation');
const reservationPopup = document.getElementById('reservationPopup');
const close = document.getElementById('close');

// Open the popup when the filter button is clicked
reservationButton.addEventListener('click', () => {
    reservationPopup.style.display = 'flex';
});

// Close the popup when the close button is clicked
close.addEventListener('click', () => {
    reservationPopup.style.display = 'none';
});

// Close the popup if clicked outside the popup content
window.addEventListener('click', (event) => {
    if (event.target === reservationPopup) {
        reservationPopup.style.display = 'none';
    }
});