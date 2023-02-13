
// Random drink button
document.getElementById("randomDrinkName").addEventListener("click", function() {
  // this.textContent = "changed"
  
fetchCocktail();

});

document.getElementById("randomDrinkName2").addEventListener("click", function() {
  this.textContent = "New drink?"
  
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
    randomDrinkImg.style.width = "75%";

    // Displays instructions to make drink, and will clear out previous steps
    randomDrinkSteps = document.getElementById("drinkInstructions");
    randomDrinkSteps.textContent = ""
    
    // Loop to turn instructions into an array, and display as a numbered list
    var drinkInstructions = drink.strInstructions.split(".");
    for (var i = 0; i < drinkInstructions.length; i++) {
      if (drinkInstructions[i].trim() === "") {
        break;
      }
      var listItem = document.createElement("li");
      console.log(drinkInstructions) 
      listItem.textContent = drinkInstructions[i];
      randomDrinkSteps.appendChild(listItem);
      
    }
     
    
                       

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
  // this.textContent = "changed"
  
fetchMeal();

});

document.getElementById("randomMealName2").addEventListener("click", function() {
  // this.textContent = "changed"
  
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
    randomMealImg.style.width = "75%";

    // Displays instructions to make meal
    randomMealSteps = document.getElementById("mealInstructions");
    randomMealSteps.textContent = ""

    var mealInstructions = meal.strInstructions.split(".");
    for (var i = 0; i < mealInstructions.length; i++) {
      if (mealInstructions[i].trim() === "") {
        break;
      }
      var listItem = document.createElement("li");
      console.log(mealInstructions) 
      listItem.textContent = mealInstructions[i];
      randomMealSteps.appendChild(listItem);
      
    }

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


document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});


// Buttons for dropdown menu located in the navbar  Wes Section


const resultsList = document.querySelector('#results-list');



function fetchData(foodType) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodType}`)
    .then(response => response.json())
    .then(data => {
      displayData(data)
    })
    
};

function fetchDataDrinks(drinkType) {
  fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?i=${drinkType}`)
    .then(response => response.json())
    .then(data => {
      displayData(data, true);
    });
}

const foodDropdownItems = document.querySelectorAll('#dropdown-menu-food .dropdown-item');
const drinkDropdownItems = document.querySelectorAll('#dropdown-menu-drinks .dropdown-item');

foodDropdownItems.forEach(item => {
  item.addEventListener('click', (event) => {
    const foodType = event.target.dataset.food;
    fetchData(foodType);
  });
});

drinkDropdownItems.forEach(item => {
  item.addEventListener('click', (event) => {
    const drinkType = event.target.dataset.drink;
    fetchDataDrinks(drinkType);
  });
});

function displayData(data) {
  resultsList.innerHTML = '';
  if (data.meals) {
    // display meal data
    data.meals.forEach(meal => {
      const mealItem = document.createElement('div');
      mealItem.classList.add('meal-item');
      mealItem.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;
      resultsList.appendChild(mealItem);
    });
  } else if (data.drinks) {
    // display drink data
    data.drinks.forEach(drink => {
      const drinkItem = document.createElement('div');
      drinkItem.classList.add('drink-item');
      drinkItem.innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <h3>${drink.strDrink}</h3>
      `;
      resultsList.appendChild(drinkItem);
    });
  } else {
    resultsList.innerHTML = 'No results found.';
  }
};

const dropItem = document.querySelectorAll('.dropdown-item');
dropItem.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const foodType = event.target.dataset.food;
    fetchData(foodType);
  });
});

// End Wes Section