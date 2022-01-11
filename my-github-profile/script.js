const APIURL = "https://api.github.com/users/",
    main = document.getElementById("main");

getUser("Descythe");

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createCard(respData);
    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addRepos(respData);
}

function createCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${
        user.name
    }" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio || ""}</p>

                <ul class="info">
                    <li><b>${user.followers}</b>&nbsp;Followers</li>
                    <li><b>${user.following}</b>&nbsp;Following</li>
                    <li><b>${user.public_repos}</b>&nbsp;Repos</li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addRepos(repos) {
    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoElement = document.createElement("a");
            repoElement.classList.add("repo");

            repoElement.href = repo.html_url;
            repoElement.target = "_blank";
            repoElement.innerText = repo.name;

            document.getElementById("repos").appendChild(repoElement);
        });
}
