const overlay = document.getElementById("overlay");
const overlayContentHTML = document.getElementById("overlayContent");

const monthYearElement = document.getElementById("month-year");
const calendarDatesElement = document.getElementById("calendar-dates");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const propertiesContainer = document.getElementById("properties_container");
const resDate = document.getElementById("res_date");

// ! Calender
let currentDate = new Date();

const loadingHTML = `
<div class="loading" id="loading">
<div class="spinner"></div>
<div class="loading-text" id="loadingText">Canceling...</div>
</div>
`;

const deleteSuccess = `Reservation Canceled! <br><br> <br>  <button class="closeBtn"  onclick="refreshPage()">
Close
</button>`;
const deleteFailed = `Reservation Cancel failed! <br> Something went wrong.. <br> <br>  <button class="closeBtn"  onclick="refreshPage()">
Cancel
</button>`;



// ! Event Handlers

const deleteNotification = () => {
    overlayContentHTML.innerHTML = loadingHTML;

    setTimeout(() => {
        overlayContentHTML.innerHTML = deleteSuccess;
    }, 2000);
};


const openOverlay = () => {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

const closeOverlay = () => {
    overlay.style.display = "none";
    document.body.style.overflow = "";
}

const refreshPage = () => {
    window.location.href = "http://localhost:5000/owner/page/reservations";
}

const handleNotificationDelete = (id) => {

    console.log(id)
    openOverlay()
    document.getElementById("deleteBtn").addEventListener("click", deleteNotification)
    document.getElementById("closeBtn").addEventListener("click", closeOverlay)
};

// ! Event Listners
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
