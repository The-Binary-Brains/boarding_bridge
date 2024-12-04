const dashboardButton = document.getElementById("dashboardButton");
const accommodationButton = document.getElementById("accommodationButton");
const messagesButton = document.getElementById("messagesButton");
const profileButton = document.getElementById("profileButton");
const monthYearElement = document.getElementById("month-year");
const calendarDatesElement = document.getElementById("calendar-dates");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const propertiesContainer = document.getElementById("properties_container");
const resDate = document.getElementById("res_date");

const changeSelectedButton = (selectedButton) => {
    const buttons = document.querySelectorAll(".nav_button");
    buttons.forEach((button) => {
        button.classList.remove("selected");
    });
    selectedButton.classList.add("selected");
};

const loadContent = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.text();

        const contentDiv = document.querySelector(".content");
        contentDiv.innerHTML = data;

        const scripts = contentDiv.querySelectorAll("script");
        scripts.forEach((script) => {
            const newScript = document.createElement("script");
            newScript.text = script.textContent || script.innerText;
            document.body.appendChild(newScript);
        });

        if (typeof renderCalendar === "function") {
            renderCalendar();
        }
    } catch (error) {
        console.error("Error loading content:", error);
    }
};

// ! Calender
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearElement.textContent = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    calendarDatesElement.innerHTML = "";

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement("div");
        calendarDatesElement.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateButton = document.createElement("button");
        dateButton.textContent = day;

        if (
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
        ) {
            dateButton.classList.add("today");
        }

        // Add click event listener
        dateButton.addEventListener("click", () => {
            const selectedDate = new Date(year, month, day); /*
            alert(selectedDate.toDateString());*/
            const allButtons = document.querySelectorAll(
                ".calendar-dates button"
            );
            allButtons.forEach((button) =>
                button.classList.remove("current-date")
            );

            // Add 'current-date' class to the clicked button
            dateButton.classList.add("current-date");
            loadProperties(selectedDate);
        });

        calendarDatesElement.appendChild(dateButton);
    }
}

renderCalendar();

// ! Event Listners

prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

const loadProperties = (selectedDate) => {
    propertiesContainer.innerHTML = `<div class="propert_loading">
    <div class="spinner"></div>
    <div class="loading-text">Loading...</div>
</div>`;

    resDate.innerText = `Reservations on ${selectedDate.toDateString()}`;

    setTimeout(() => {
        propertiesContainer.innerHTML = `<div class="property">
    <img src="/images/property1.jpg" alt="property" />
    <div>
        <div class="property_title">Property One</div>
        <div class="visiter">Reserved by: Jhon Doe</div>
        <div class="time">At: 09:00 AM</div>
    </div>
</div>`;
    }, 1000);
};
