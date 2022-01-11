const mealsElement = document.getElementById("meals"),
    favoriteContainer = document.getElementById("fav-meals"),
    mealPopup = document.getElementById("meal-popup"),
    mealInfoElement = document.getElementById("meal-info"),
    searchTerm = document.getElementById("search-term");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();

    addMeal(respData.meals[0], true);
}

async function getMealById(id) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );

    const respData = await resp.json();

    return respData.meals[0];
}

async function getMealsBySearch(term) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );

    const respData = await resp.json();

    return respData.meals;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${
                random
                    ? `
            <span class="random"> Random Recipe </span>`
                    : ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const button = meal.querySelector(".meal-body .fav-btn");

    button.addEventListener("click", () => {
        if (button.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            button.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            button.classList.add("active");
        }

        fetchFavMeals();
    });

    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    mealsElement.appendChild(meal);
}

function addMealLS(mealId) {
    localStorage.setItem("mealIds", JSON.stringify([...getMealsLS(), mealId]));
}

function removeMealLS(mealId) {
    localStorage.setItem(
        "mealIds",
        JSON.stringify(getMealsLS().filter((id) => id !== mealId))
    );
}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    favoriteContainer.innerHTML = "";
    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {
        meal = await getMealById(mealIds[i]);
        addMealFav(meal);
    }
}

function addMealFav(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-times"></i></button>
    `;

    const button = favMeal.querySelector(".clear");

    button.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);

        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
    mealInfoElement.innerHTML = "";

    const mealEl = document.createElement("div"),
        ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${
                    mealData["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
        </ul>
    `;

    mealInfoElement.appendChild(mealEl);
    mealPopup.classList.remove("hidden");
}

document.getElementById("search").addEventListener("click", async (e) => {
    mealsElement.innerHTML = "";
    const meals = await getMealsBySearch(searchTerm.value);

    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

document.getElementById("close-popup").addEventListener("click", (e) => {
    mealPopup.classList.add("hidden");
});
