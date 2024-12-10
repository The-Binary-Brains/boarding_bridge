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

document.addEventListener("DOMContentLoaded", function () {
    const minSlider = document.getElementById("minSlider");
    const maxSlider = document.getElementById("maxSlider");
    const minValueDisplay = document.getElementById("minValue");
    const maxValueDisplay = document.getElementById("maxValue");

    function updateValues() {
        let min = parseInt(minSlider.value);
        let max = parseInt(maxSlider.value);

        if (min >= max) {
            // Prevent overlap
            if (this === minSlider) {
                minSlider.value = max - 1000;
                min = max - 1000;
            } else if (this === maxSlider) {
                maxSlider.value = min + 1000;
                max = min + 1000;
            }
        }

        minValueDisplay.textContent = min.toLocaleString();
        maxValueDisplay.textContent = max.toLocaleString();

        // Update slider background for visual range
        const rangePercentMin = ((min - 10000) / 40000) * 100;
        const rangePercentMax = ((max - 10000) / 40000) * 100;
        minSlider.style.background = `linear-gradient(to right, #ddd ${rangePercentMin}%, #007bff ${rangePercentMin}%, #007bff ${rangePercentMax}%, #ddd ${rangePercentMax}%)`;
    }

    // Add event listeners
    minSlider.addEventListener("input", updateValues);
    maxSlider.addEventListener("input", updateValues);

    // Initialize slider background and values
    updateValues();
});

