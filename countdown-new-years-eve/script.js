const daysEl = document.getElementById("days"),
    hoursEl = document.getElementById("hours"),
    minsEl = document.getElementById("mins"),
    secondsEl = document.getElementById("seconds"),
    nye = document.getElementById("nye");

const newYearsDate = new Date((new Date().getFullYear() + 1), 0, 1);
nye.innerHTML = `New Years Eve (${newYearsDate.getFullYear()})`;

function run() {
    const totalSeconds = (newYearsDate - new Date()) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24),
        hours = Math.floor(totalSeconds / 3600) % 24,
        mins = Math.floor(totalSeconds / 60) % 60,
        seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = format(hours);
    minsEl.innerHTML = format(mins);
    secondsEl.innerHTML = format(seconds);
}

function format(time) {
    return time < 10 ? `0${time}` : time;
}

run();
setInterval(run, 1000);
