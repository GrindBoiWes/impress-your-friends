
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
    
    randomDrinkName = document.getElementById("randomDrinkTitle");
    randomDrinkName.textContent = drink.strDrink;
    randomDrinkImg = document.getElementById("randomDrinkImg");
    randomDrinkImg.src = drink.strDrinkThumb;
    
    for (var i = 1; i < 5; i++) {
      drinkIngredients = document.getElementById("randomDrinkIngredients");
      // drinkIngredients.textContent = drink.strIngredient(i);
      console.log(drinkIngredients.textContent)
      // drinkIngredients.textContent = drink.strIngredient1 + drink.strIngredient2
    }
  })
}