// Get elements
const filterButton = document.getElementById("filterButton");
const filterPopup = document.getElementById("filterPopup");
const closePopup = document.getElementById("closePopup");
const filterForm = document.getElementById("filterForm");

filterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(filterForm);

    const checkedTypes = [];
    const typesCheckBoxes = document.querySelectorAll('input[name="type"]:checked');
    typesCheckBoxes.forEach((checkbox) => {
        checkedTypes.push(checkbox.value);
    });

    const checkedAmenities = [];
    const amenitiesCheckBoxes = document.querySelectorAll('input[name="amenities"]:checked');
    amenitiesCheckBoxes.forEach((checkbox) => {
        checkedAmenities.push(checkbox.value);
    });

    const formJSON = Object.fromEntries(formData.entries());

    formJSON.types = checkedTypes;
formJSON.amenities = checkedAmenities;

    try {
        const response = await fetch(
            `http://localhost:5000/student/api/filter`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formJSON),
            }
        );

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }

    filterPopup.style.display = "none";
    document.body.style.overflow = "";

});

filterButton.addEventListener("click", () => {
    filterPopup.style.display = "flex";
    document.body.style.overflow = "hidden";
});

closePopup.addEventListener("click", () => {
    filterPopup.style.display = "none";
    document.body.style.overflow = "";
});

window.addEventListener("click", (event) => {
    if (event.target === filterPopup) {
        filterPopup.style.display = "none";
    }
});

function updateValues(minSlider, maxSlider, minValueDisplay, maxValueDisplay) {
    let min = parseInt(minSlider.value);
    let max = parseInt(maxSlider.value);

    if (min >= max) {
        if (minSlider === document.activeElement) {
            minSlider.value = max - 1000;
            min = max - 1000;
        } else if (maxSlider === document.activeElement) {
            maxSlider.value = min + 1000;
            max = min + 1000;
        }
    }

    minValueDisplay.textContent = min.toLocaleString();
    maxValueDisplay.textContent = max.toLocaleString();

    const rangePercentMin = ((min - 10000) / 40000) * 100;
    const rangePercentMax = ((max - 10000) / 40000) * 100;
    minSlider.style.background = `linear-gradient(to right, #ddd ${rangePercentMin}%, #800000 ${rangePercentMin}%, #800000 ${rangePercentMax}%, #ddd ${rangePercentMax}%)`;
}

const minSlider = document.getElementById("minSlider");
const maxSlider = document.getElementById("maxSlider");
const minValueDisplay = document.getElementById("minValue");
const maxValueDisplay = document.getElementById("maxValue");

minSlider.addEventListener("input", () =>
    updateValues(minSlider, maxSlider, minValueDisplay, maxValueDisplay)
);
maxSlider.addEventListener("input", () =>
    updateValues(minSlider, maxSlider, minValueDisplay, maxValueDisplay)
);

filterForm.addEventListener("reset", () => {
    setTimeout(() => {
        updateValues(minSlider, maxSlider, minValueDisplay, maxValueDisplay);
    }, 0);
});

updateValues(minSlider, maxSlider, minValueDisplay, maxValueDisplay);
