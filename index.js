const searchButton = document.getElementById("search-button");
const searchTerm = document.getElementById("search-term");
const resultsContainer = document.getElementById("results");

searchButton.addEventListener("click", () => {
  const term = searchTerm.value;
  if (!term) return;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals;
      if (!meals || meals.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
      }

      resultsContainer.innerHTML = "";

      for (let i = 0; i < 5 && i < meals.length; i++) {
        const meal = meals[i];

        // Create card elements
        const card = document.createElement("div");
        card.classList.add("meal-card");

        const image = document.createElement("img");
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;
        card.appendChild(image);

        const title = document.createElement("h3");
        title.innerText = meal.strMeal;
        card.appendChild(title);

        const description = document.createElement("p");
        description.innerText = meal.strInstructions.slice(0, 100) + "...";
        card.appendChild(description);

        // Append card to results container
        resultsContainer.appendChild(card);
      }
    })
    .catch((error) => {
      const errorMessage = document.createElement("p");
      errorMessage.innerText = "Something went wrong.";
      resultsContainer.appendChild(errorMessage);
    });
});