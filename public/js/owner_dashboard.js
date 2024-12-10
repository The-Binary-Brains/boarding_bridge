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


// ! Calender
let reservedDatesOfTheMonth;
let currentDate = new Date();

function renderCalendar(year, month) {
    monthYearElement.textContent = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });

    calendarDatesElement.innerHTML = "";

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement("div");
        calendarDatesElement.appendChild(emptyCell);
    }

    // Loop through all days in the month and create date buttons
    for (let day = 1; day <= daysInMonth; day++) {
        const dateButton = document.createElement("button");
        dateButton.textContent = day;

        // Check if the date is today and add 'today' class
        if (
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
        ) {
            dateButton.classList.add("today");
            dateButton.classList.add("current-date");
        }

        // Format the current date as "YYYY-MM-DD"
        const currentDateString = `${year}-${String(month + 1).padStart(
            2,
            "0"
        )}-${String(day).padStart(2, "0")}`;

        // Check if the date is in the reserved dates array and add 'reserved' class
        if (reservedDatesOfTheMonth.includes(currentDateString)) {
            dateButton.classList.add("reserved");
        }

        // Add click event listener to select the date
        dateButton.addEventListener("click", () => {
            const selectedDate = new Date(Date.UTC(year, month, day));
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

        // Append the date button to the calendar
        calendarDatesElement.appendChild(dateButton);
    }
}

const reservedDates = async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    try {
        const response = await fetch(
            `http://localhost:5000/owner/api/reserved_month/${month}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer YOUR_ACCESS_TOKEN",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch reserved dates");
        }

        const data = await response.json();
        reservedDatesOfTheMonth = data.availableDates;

        renderCalendar(year, month);
    } catch (error) {
        console.error("Error fetching reserved dates:", error);
        throw error;
    }
};

reservedDates();

prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    reservedDates();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    reservedDates();
});

const loadProperties = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];

    propertiesContainer.innerHTML = `<div class="propert_loading">
    <div class="spinner"></div>
    <div class="loading-text">Loading...</div>
</div>`;

    resDate.innerText = `Reservations on ${formattedDate}`;

    try {
        const response = await fetch(
            `http://localhost:5000/owner/api/reserved/${formattedDate}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer YOUR_ACCESS_TOKEN",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch reserved dates");
        }

        const data = await response.json();

        propertiesContainer.innerHTML = "";

        if (data.length === 0) {
            const propertyDiv = document.createElement("div");
            propertyDiv.style.display = "flex";
            propertyDiv.style.justifyContent = "center";
            propertyDiv.style.alignItems = "center";
            propertyDiv.style.height = "300px";

            propertyDiv.innerHTML = `
                    <div class="time">No Reservations</div>
            `;
            propertiesContainer.appendChild(propertyDiv);
        }
        data.forEach((property) => {
            const propertyDiv = document.createElement("a");
            propertyDiv.href = `http://localhost:5000/owner/page/reservations/view/${property.id}`;
            propertyDiv.classList.add("property");

            console.log(property.id)
            propertyDiv.innerHTML = `
                <img src="${property.image}" alt="property" />
                <div>
                    <div class="property_title">${property.property}</div>
                    <div class="visiter">Reserved by: ${property.reservedBy}</div>
                    <div class="time">At: ${property.time}</div>
                </div>
            `;

            propertiesContainer.appendChild(propertyDiv);
        });
    } catch (error) {
        console.error("Error fetching reserved dates:", error);
        throw error;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const now = new Date();
    const today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    loadProperties(today);
});
