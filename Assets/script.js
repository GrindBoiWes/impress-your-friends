
// Random drink button
document.getElementById("randomDrinkName").addEventListener("click", function() {
  this.textContent = "changed"
  
fetchCocktail();

});


function fetchCocktail() {
  var randomCocktailApi = "https://www.thecocktaildb.com/api/json/v2/9973533/random.php"
  
  fetch(randomCocktailApi)
  .then(function (response) {
    return response.json();
  })
  
  .then(function(data){

   
    console.log(data);
  var drink = data.drinks[0];
    // Displays drink name
    randomDrinkName = document.getElementById("randomDrinkTitle");
    randomDrinkName.textContent = drink.strDrink;

    // Displays drink image
    randomDrinkImg = document.getElementById("randomDrinkImg");
    randomDrinkImg.src = drink.strDrinkThumb;
    randomDrinkImg.style.width = "20%";

    // Displays instructions to make drink
    randomDrinkSteps = document.getElementById("drinkInstructions");
    randomDrinkSteps.textContent = drink.strInstructions;

    // Clears out the ingredient list
    randomDrinkIngredients = document.getElementById("randomDrinkIngredients");
    randomDrinkIngredients.textContent = ""

    // Loop to go through ingredients and measurements. Will also create a list
    for (var i = 1; i < 15; i++) {
      var randomMeasure = data.drinks[0]["strMeasure" + i];
      var randomIngredient = data.drinks[0]["strIngredient" + i];
      if (randomIngredient !=null && randomMeasure != null) {
       var listItem = document.createElement("li");
      listItem.textContent = randomMeasure + " " + randomIngredient;
      randomDrinkIngredients.appendChild(listItem);
  } else{
    break;
  } 
}

    }
  )
};



// Random meal button
document.getElementById("randomMealName").addEventListener("click", function() {
  this.textContent = "changed"
  
fetchMeal();

});

function fetchMeal() {
  var randomMealApi = "https://www.themealdb.com/api/json/v1/1/random.php"
  
  
  fetch(randomMealApi)
  .then(function (response) {
    return response.json();
  })
  
  .then(function(data){

   
    console.log(data);
  var meal = data.meals[0];
    // Displays meal name
    randomMealName = document.getElementById("randomMealTitle");
    randomMealName.textContent = meal.strMeal;
 console.log(meal.strMeal)
    // Displays meal image
    randomMealImg = document.getElementById("randomMealImg");
    randomMealImg.src = meal.strMealThumb;
    randomMealImg.style.width = "20%";

    // Displays instructions to make meal
    randomMealSteps = document.getElementById("mealInstructions");
    randomMealSteps.textContent = meal.strInstructions;

    // Clears out the ingredient list
    randomMealIngredients = document.getElementById("randomMealIngredients");
    randomMealIngredients.textContent = ""

    // Loop to go through ingredients and measurements. Will also create a list
    for (var i = 1; i < 20; i++) {
      var randomMeasure = meal["strMeasure" + i];
      var randomIngredient = meal["strIngredient" + i];
      if (randomIngredient !=null && randomMeasure != null) {
       var listItem = document.createElement("li");
      listItem.textContent = randomMeasure + " " + randomIngredient;
      randomMealIngredients.appendChild(listItem);
  } else{
    break;
  } 
}

    }
  )
};




const dropdown = document.querySelector("#dropdown");
const trigger = dropdown.querySelector(".dropdown-trigger");

trigger.addEventListener("click", function() {
  const menu = dropdown.querySelector(".dropdown-menu");
  menu.classList.toggle("is-active");
});

