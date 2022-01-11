const bulb = document.getElementById("bulb");

document.getElementById("toggle").addEventListener("change", (e) => {
    setMode(e.target.checked);
});

function setMode(mode) {
    document.getElementById("toggle").checked = mode;
    localStorage.setItem("dark", mode);

    document.body.classList.toggle("dark", mode);
    bulb.classList.toggle("fas", !mode);
    bulb.classList.toggle("far", mode);
}

setMode(JSON.parse(localStorage.getItem("dark")));