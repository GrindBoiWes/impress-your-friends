// code to display modal message for age verification
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var message = document.getElementById("modal-message");
var content = document.getElementById("content");

window.onload = function() {
  var name = prompt("Please enter your name:");
  var ageCheck = parseInt(prompt("Please enter your age:"));

  if (ageCheck < 21) {
    message.innerHTML = "You submitted that you are " + ageCheck + " years old, " + name + ". You must be at least 21 years or older to visit this site.";
    modal.style.display = "block";
    content.style.display = "none";
    alert("You're not old enough to enter! Check back in when you're 21 years or older!");
  } else if (ageCheck >= 21 && ageCheck <= 100) {
    content.style.display = "block";
    console.log(content);
    message.innerHTML = "You entered that you are " + ageCheck + " years old, " + name + ". You are the legal drinking age! Welcome " + name + "!";
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
    content.style.display = "block";
  }
};

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Random drink button
document.getElementById("randomDrinkName").addEventListener("click", function() {
  // this.textContent = "changed"
  
fetchCocktail();

});

// Random drink button in modal
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
    processData(data)
})
};

  function processDrink(data){
    console.log(data);
  var drink = data.drinks[0];
    // Displays drink name
    randomDrinkName = document.getElementById("randomTitle");
    randomDrinkName.textContent = drink.strDrink;

    // Displays drink image
    randomDrinkImg = document.getElementById("randomImg");
    randomDrinkImg.src = drink.strDrinkThumb;
    randomDrinkImg.style.width = "75%";

    // Displays instructions to make drink, and will clear out previous steps
    randomDrinkSteps = document.getElementById("Instructions");
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
    randomDrinkIngredients = document.getElementById("randomIngredients");
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

    };
  



// Random meal button
document.getElementById("randomMealName").addEventListener("click", function() {
  // this.textContent = "changed"
  
fetchMeal()
  

});

// Random meal button in modal
document.getElementById("randomMealName2").addEventListener("click", function() {
  // this.textContent = "changed"
  
  fetchMeal()
  
  

});

function fetchMeal() {
  var randomMealApi = "https://www.themealdb.com/api/json/v1/1/random.php"
  
  
  fetch(randomMealApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    processData(data)
  })
};
  

  


  function processMeal(data){

   
    console.log(data);
  var meal = data.meals[0];
    // Displays meal name
    randomMealName = document.getElementById("randomTitle");
    randomMealName.textContent = meal.strMeal;
 console.log(meal.strMeal)
    // Displays meal image
    randomMealImg = document.getElementById("randomImg");
    randomMealImg.src = meal.strMealThumb;
    randomMealImg.style.width = "75%";

    // Displays instructions to make meal
    randomMealSteps = document.getElementById("Instructions");
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
    randomMealIngredients = document.getElementById("randomIngredients");
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

    };
  
// Able to switch between functions if it's a meal or drink
function processData(data) {
  if (typeof data.drinks !== 'undefined') {
    processDrink(data);
  } else if (typeof data.meals !== 'undefined') {
    processMeal(data);
  }
}



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


function fetchData(foodType, mealId) {

  
  
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodType}`)
    .then(response => response.json())
    .then(data => {
      displayData(data);

    })
      
};

function fetchDataDrinks(drinkType) {
  // Added if statement due to non-alcoholic being a different parameter
  if (drinkType === 'non-alcoholic') {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
    .then(response => response.json())
    .then(data => {
      displayData(data);
    })
  } else {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + drinkType)
    .then(response => response.json())
    .then(data => {
      displayData(data);
    });
  }
};


 const foodDropdownItems = document.querySelectorAll('#dropdown-menu-food .dropdown-item');
const drinkDropdownItems = document.querySelectorAll('#dropdown-menu-drinks .dropdown-item');

function displayIngredients(recipeId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then(response => response.json())
    .then(data => {
      const recipe = data.meals[0];
      const ingredients = [];

      // Collect the ingredients and their measurements
      for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
          ingredients.push(`${recipe[`strIngredient${i}`]} (${recipe[`strMeasure${i}`]})`);
        } else {
          break;
        }
      }

      // Display the ingredients in a modal or alert
      const ingredientsList = ingredients.join('\n');
      alert(`Ingredients for ${recipe.strMeal}:\n${ingredientsList}`);
    });
}

foodDropdownItems.forEach(item => {
  item.addEventListener('click', (event) => {
    const foodType = event.target.dataset.food;
   fetchData(foodType);
    console.log(foodType)
  });
});

drinkDropdownItems.forEach(item => {
  item.addEventListener('click', (event) => {
    const drinkType = event.target.dataset.drinks;

    fetchDataDrinks(drinkType);
    console.log(drinkType);
  });
});

function displayData(data) {
  resultsList.innerHTML = '';
  if (data.meals) {
    // display meal data
    data.meals.slice(0, 10).forEach(meal => {
      const mealItem = document.createElement('div');
      mealItem.classList.add('meal-item');
      mealItem.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button class="ingredients-button" data-meal-id="${meal.idMeal}">View Ingredients & Instructions</button>
      `;
      resultsList.appendChild(mealItem);
    });
  } else if (data.drinks) {
    // display drink data
    data.drinks.slice(0, 10).forEach(drink => {
      const drinkItem = document.createElement('div');
      drinkItem.classList.add('drink-item');
      drinkItem.innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <h3>${drink.strDrink}</h3>
        <button class="ingredients-button" data-drink-id="${drink.idDrink}">View Ingredients & Instructions</button>
      `;
      resultsList.appendChild(drinkItem);
    });
  } else {
    resultsList.innerHTML = 'No results found.';
  }

  const ingredientsButtons = document.querySelectorAll('.ingredients-button');
  ingredientsButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const mealId = event.target.dataset.mealId;
      const drinkId = event.target.dataset.drinkId;
      let fetchUrl = '';

      if (mealId) {
        fetchUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
      } else if (drinkId) {
        fetchUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
      }

      if (fetchUrl) {
        fetch(fetchUrl)
          .then(response => response.json())
          .then(data => {
            const instructions = data.meals ? data.meals[0].strInstructions : data.drinks[0].strInstructions;
            const ingredients = [];

            for (let i = 1; i <= 20; i++) {
              const ingredient = data.meals ? data.meals[0][`strIngredient${i}`] : data.drinks[0][`strIngredient${i}`];
              const measure = data.meals ? data.meals[0][`strMeasure${i}`] : data.drinks[0][`strMeasure${i}`];

              if (ingredient) {
                ingredients.push(`${ingredient} - ${measure}`);
              }
            }

            const mealItem = event.target.parentElement;
            const details = document.createElement('div');
            details.classList.add('meal-details');
            details.innerHTML = `
              <h4>Ingredients:</h4>
              <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
              <h4>Instructions:</h4>
              <p>${instructions}</p>
            `;
            mealItem.appendChild(details);
          });
      }
    });
  });
}


const dropItem = document.querySelectorAll('.dropdown-item');
dropItem.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const foodType = event.target.dataset.food;
    fetchData(foodType);
  });
});

dropItem.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const drinkType = event.target.dataset.drinks;
    fetchData(drinkType);
  });
}); 
//End Wes Section



