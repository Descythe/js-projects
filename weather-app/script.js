const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main"),
    form = document.getElementById("form"),
    search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


if (localStorage.getItem("city") === null) {
    localStorage.setItem("city", "Vienna");
}
    
search.value = localStorage.getItem("city");
getWeatherByLocation(localStorage.getItem("city"));

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const data = await resp.json();

    const temp = kelvin2Celsius(data.main.temp),
        weather = document.createElement("div");

    weather.classList.add("weather");

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C</h2>
        <small>${data.weather[0].main}</small>
    `;

    main.innerHTML = "";
    main.appendChild(weather);

    localStorage.setItem("city", city);
}

function kelvin2Celsius(k) {
    return Math.floor(k - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (search.value) {
        getWeatherByLocation(search.value);
    }
});
