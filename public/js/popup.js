// Get elements
const filterButton = document.getElementById('filterButton');
const filterPopup = document.getElementById('filterPopup');
const closePopup = document.getElementById('closePopup');

// Open the popup when the filter button is clicked
filterButton.addEventListener('click', () => {
    filterPopup.style.display = 'flex';
});

// Close the popup when the close button is clicked
closePopup.addEventListener('click', () => {
    filterPopup.style.display = 'none';
});

// Close the popup if clicked outside the popup content
window.addEventListener('click', (event) => {
    if (event.target === filterPopup) {
        filterPopup.style.display = 'none';
    }
});
