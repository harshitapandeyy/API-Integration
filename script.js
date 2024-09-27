const inputBox = document.querySelector(".inputBox");
const searchButton = document.querySelector(".searchButton");
const Menu = document.querySelector(".Menu");
const Recipe = document.querySelector(".Recipe");
const menuDetailsContent = document.querySelector(".menuDetailsContent");
const clsButton = document.querySelector(".clsButton");

//Function to get recipes
const fetchRecipes = async (query) => {
  Menu.innerHTML = "Fetching Recipes.....";
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();

  Menu.innerHTML = " ";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
         <img src="${meal.strMealThumb}">
              <h3>${meal.strMeal}</h3>
              <h4><span>${meal.strArea}</span> Dish</h4>
              <h4>${meal.strCategory}</h4>
         `;
    //Adding Event Listener on cotainers
    const container = document.createElement("button");
    container.textContent = "";
    recipeDiv.appendChild(container);
    container.addEventListener("mouseover", () => {
      recipePopup(meal);
    });

    Menu.appendChild(recipeDiv);
  });
};

//To fetch the ingredients of recipes
const fetchIngredients = (meal) => {
  let ingredientList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredients = meal[`strIngredient${i}`];
    if (ingredients) {
      const measurement = meal[`strMeasure${i}`];
      ingredientList += `<li>${measurement} ${ingredients}</li>`;
    } else {
      break;
    }
  }
  return ingredientList;
};

//To show the popup for recipe details
const recipePopup = (meal) => {
  menuDetailsContent.innerHTML = `
        <h2 class="Name">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredients">${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instructions:</h3>
            <p class="instructions">${meal.strInstructions}</p>
        </div>
    `;
  menuDetailsContent.parentElement.style.display = "block";
};
//The close button
clsButton.addEventListener("click", () => {
  menuDetailsContent.parentElement.style.display = "none";
});

//It executes when the input is invalid 
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = inputBox.value.trim();
  // if (searchInput == Menu) {
  //   return;
  // } else {
  //   notFound.innerHTML =
  //     "Sorry! This meal doesn't exist ,You can search for something else.";
  // }
  
  if (searchInput != Menu ) {
    notFound.innerHTML= "Sorry"
  }else{
    notFound.innerHTML= "";
  }
  fetchRecipes(searchInput);
});
