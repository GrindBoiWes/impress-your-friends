

document.getElementById("randomDrink").addEventListener("click", function() {
  this.textContent = "changed"
  
fetchRandomCocktail();

});

function fetchRandomCocktail() {
  var randomCocktailApi = "https://www.thecocktaildb.com/api/json/v2/9973533/random.php"

  fetch(randomCocktailApi)
  .then(function (response) {
    return response.json();
  })
  
  .then(function(data){
    console.log(data.drinks)
    // randomCocktailName = 
  })
}