
// const apiKey = 'c5679533aa7e4f9698a0e6b0b65b9f2b'; 
// const apiKey = '5028e0d438cb4daaaf380212abc29419'; 
// const apiKey = '4da98194ed984253873a7ebc17d36f21'; 
// const apiKey = '8a6de961f98e4010920ff3ed92b2d3d4'; 
const apiKey = '6c14936461ed4778b63b6354dfc06035'; 



let result = document.getElementById("result");


document.getElementById('recipe-results').addEventListener('click', function (e) {
  
  if (e.target && e.target.classList.contains('toggle-ingredients-btn')) {
    const ingredients = e.target.nextElementSibling; 
    ingredients.classList.toggle('hidden');
    e.target.textContent = ingredients.classList.contains('hidden') ? 'Show Ingredients' : 'Hide Ingredients'; // Change button text
  }

  if (e.target && e.target.classList.contains('toggle-instructions-btn')) {
    const instructions = e.target.nextElementSibling;
    instructions.classList.toggle('hidden'); 
    e.target.textContent = instructions.classList.contains('hidden') ? 'Show Instructions' : 'Hide Instructions'; // Change button text
  }
});


const recipesDiv = document.getElementById('recipe-results');

document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('search').value;
  fetchRecipes(query);
  recipesDiv.innerHTML = " ";
  result.innerHTML = "<h2>Recipe Results</h2>";
});

function fetchRecipes(query) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      
      if (data.results && data.results.length > 0) {
        data.results.forEach(recipe => {
          fetchRecipeDetails(recipe.id); 
        });
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

function fetchRecipeDetails(recipeId) {
  fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(recipeDetails => {
      displayRecipeDetails(recipeDetails); 
    })
    .catch(error => console.error('Error fetching recipe details:', error));
}

function displayRecipeDetails(recipe) {
  const instructionsList = recipe.instructions
    .split('\n') 
    .map(step => `<li>${step}</li>`)
    .join('');

  const ingredientsList = recipe.extendedIngredients
    .map(ingredient => `<li>${ingredient.original}</li>`)
    .join('');

  const recipeCard = `
    <div class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <p><b>Ready in:</b> ${recipe.readyInMinutes} minutes</p>
      
      <button class="toggle-ingredients-btn">Show Ingredients</button>
      <div class="ingredients hidden">
        <p><b>Ingredients:</b></p>
        <ul>${ingredientsList}</ul>
      </div>
      
      <button class="toggle-instructions-btn">Show Instructions</button>
      <div class="instructions hidden">
        <p><b>Instructions:</b></p>
        <ul>${instructionsList}</ul>
      </div>
    </div>
  `;

  recipesDiv.innerHTML += recipeCard;
}
