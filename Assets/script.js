

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

   
    console.log(data.drinks.strDrink);

    randomDrinkName = data.drinks[0].strDrink;
    randomDrinkText = document.getElementById("randomDrinkTitle");
    randomDrinkText.textContent = randomDrinkName;
    randomDrinkImg = document.getElementById("randomDrinkImg");
    randomDrinkImg.src = data.drinks[0].strDrinkThumb;
    
    
  })
}