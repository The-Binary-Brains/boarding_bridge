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
    window.location.href = "http://localhost:5000/owner/page/inbox";
}

const handleNotificationDelete = (id) => {

    console.log(id)
    openOverlay()
    document.getElementById("deleteBtn").addEventListener("click", deleteNotification)
    document.getElementById("closeBtn").addEventListener("click", closeOverlay)
};

// ! Event Listners
