const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const user_utils = require("./user_utils");
const DButils = require("./DButils");
const e = require("express");

const search_filters = {
    "cuisine":[
        'African',
        'Asian',
        'American',
        'British',
        'Cajun',
        'Caribbean',
        'Chinese',
        'Eastern European',
        'European',
        'French',
        'German',
        'Greek',
        'Indian',
        'Irish',
        'Italian',
        'Japanese',
        'Jewish',
        'Korean',
        'Latin American',
        'Mediterranean',
        'Mexican',
        'Middle Eastern',
        'Nordic',
        'Southern',
        'Spanish',
        'Thai',
        'Vietnamese'
    ],
    "diet":[
        'Gluten Free',
        'Ketogenic',
        'Vegetarian',
        'Lacto-Vegetarian',
        'Ovo-Vegetarian',
        'Vegan',
        'Pescetarian',
        'Paleo',
        'Primal',
        'Low FODMAP',
        'Whole30'
    ],
    "intolerances":[
        'Dairy',
        'Egg',
        'Gluten',
        'Grain',
        'Peanut',
        'Seafood',
        'Sesame',
        'Shellfish',
        'Soy',
        'Sulfite',
        'Tree Nut',
        'Wheat'
    ]
}

  

  




/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_data 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let {id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, servings} = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        servings: servings
        
    }
}


/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 *  */
async function getRecipePreview(recipe_id, user_id=undefined){
    let recipe_details = await getRecipeDetails(recipe_id);
    if(user_id){
        recipe_details.isFavorite = await user_utils.getRcipeIndication("favoriterecipes", recipe_id, user_id);
        recipe_details.isWatched = await user_utils.getRcipeIndication("seenrecipes", recipe_id, user_id);
    }
    else{
        recipe_details.isFavorite = false;
        recipe_details.isWatched = false;
    }
    return recipe_details;
}

/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * */
async function getRecipesPreview(recipes_ids , user_id){
    let recipes = [];
    for (let i = 0; i < recipes_ids.length; i++) {
        let recipe_details = await getRecipePreview(recipes_ids[i], user_id);
        recipes.push(recipe_details);
    }
    return recipes;
}




async function getRecipeFullDetails(recipes_id, user_id=undefined){
    let recipe_details = await getRecipePreview(recipes_id, user_id);
    let recipe_ingredients = await getRecipeIngredients(recipes_id);
    let {ingredients} = recipe_ingredients.data;
    recipe_details.ingredients = ingredients;
    let recipe_instructions = await getRecipeInstructions(recipes_id);
    
    let {steps} = recipe_instructions.data[0];
    recipe_details.instructions = steps;
    return recipe_details;
}





async function getRecipeIngredients(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/ingredientWidget.json`, {
        params: {
            apiKey: process.env.spooncular_apiKey
        }
    });
}






async function getRecipeInstructions(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/analyzedInstructions`, {
        params: {
            apiKey: process.env.spooncular_apiKey
        }
    });
}


// search for recipes by using: given_query as string to search, return  number_of_wanted_results results
async function getRecipesBySearch(query, cuisine, diet, intolerances, numberOfRecipes) {
    return await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: query,
            cuisine: cuisine,
            diet: diet,
            intolerances: intolerances,
            number: numberOfRecipes,
            apiKey: process.env.spooncular_apiKey
        }
    });
}


async function SearchRecipes(query, cuisine, diet, intolerances, numberOfRecipes) {
    let recipes_arr_info = await getRecipesBySearch(query, cuisine, diet, intolerances, numberOfRecipes);
    let recipes_arr = recipes_arr_info.data.results.map((recipe) => recipe.id);
    let search_results = await getRecipesPreview(recipes_arr);
    search_results = await Promise.all(search_results);


    return search_results;
}


async function getSearchFilters(){
    return search_filters;
}





// Extract recipes data from given recipes array 
function extractRecipeDetails(recipe_data)
{
        const {
            id,
            title,
            readyInMinutes,
            image,
            aggregateLikes,
            vegan,
            vegetarian,
            glutenFree,
            servings
        } = recipe_data;
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            image: image,
            aggregateLikes: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
            servings: servings
        }
}



async function markAsSeen(user_id, recipe_id) {
    if(user_id){
        await DButils.execQuery(
            `INSERT INTO seenrecipes (user_id, recipe_id, viewed_at)
             VALUES ('${user_id}', '${recipe_id}', NOW())
             ON DUPLICATE KEY UPDATE viewed_at = NOW()`
          );
    }

  }




// return 3 random recipes, by using spoonacular API
async function getRandomRecipes() {
    recipee_random_list = [];
    const response = await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
    recipes_arr_info = response.data.recipes;
    recipes_arr_info.map((recipe) => {
                recipee_random_list.push(extractRecipeDetails(recipe));
            });
    return recipee_random_list;
}

  


exports.getRecipeFullDetails = getRecipeFullDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getRecipePreview = getRecipePreview;
exports.getRecipeDetails = getRecipeDetails;
exports.getRandomRecipes = getRandomRecipes;
exports.SearchRecipes = SearchRecipes;
exports.markAsSeen = markAsSeen

