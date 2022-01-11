document.getElementById("btn").addEventListener("click", createNotification);

function createNotification() {
    const dateString = new Date().toISOString().replace(/T|.[0-9]+Z/g, " ").trim();

    const notif = document.createElement("div");
    notif.classList.add("toast");
    notif.innerText = "Notification recieved at " + dateString;

    document.getElementById("container").appendChild(notif);

    setTimeout(() => {
        notif.style.opacity = "0";
        setTimeout(() => {
            notif.remove();
        }, 250);
    }, 3000);
}
