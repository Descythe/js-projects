const APIURL =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1",
    IMGPATH = "https://image.tmdb.org/t/p/w1280",
    SEARCHAPI =
        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main"),
    form = document.getElementById("form"),
    search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie");

        movieContainer.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
                onerror="this.src = './default.jpg';"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRating(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieContainer);
    });
}

function getClassByRating(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else return "red";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (search.value) {
        getMovies(SEARCHAPI + search.value);
        search.value = "";
    }
});
