const overlay = document.getElementById("overlay");
const overlayContentHTML = document.getElementById("overlayContent");

const loadingHTML = `
<div class="loading" id="loading">
<div class="spinner"></div>
<div class="loading-text" id="loadingText">Deleting...</div>
</div>
`;

const deleteSuccess = `Delete success! <br><br> <br>  <button class="closeBtn"  onclick="refreshPage()">
Close
</button>`;
const deleteFailed = `Delete failed! <br> Something went wrong.. <br> <br>  <button class="closeBtn"  onclick="refreshPage()">
Cancel
</button>`;



// ! Event Handlers

const deleteNotification = async (id) => {

    overlayContentHTML.innerHTML = loadingHTML;

    try {

        const response = await fetch(
            `http://localhost:5000/owner/api/inbox/delete/${id}`,
            {
                method: "POST",
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Notification deleted successfully:", result);
        overlayContentHTML.innerHTML = deleteSuccess;
    } catch (error) {
        console.error("Error deleted notification:", error);
        overlayContentHTML.innerHTML = deleteFailed;
    }

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
    window.location.href = "http://localhost:5000/owner/page/inbox";
}

const handleNotificationDelete = (id) => {

    console.log(id)
    openOverlay()
    document.getElementById("closeBtn").addEventListener("click", closeOverlay)
    document.getElementById("deleteBtn").addEventListener("click",  () => deleteNotification(id))
};

// ! Event Listners
