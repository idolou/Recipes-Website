var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));



router.get("/random", async (req, res, next) => {
  try {
    const random_recipes = await recipes_utils.getRandomRecipes();
    res.send(random_recipes);
  } catch (error) {
    next(error);
  }
});


router.get("/search", async (req, res, next) => {
  try {
    const query = req.query.query;
    const cuisine = req.query.cuisine;
    const diet = req.query.diet;
    const intolerances = req.query.intolerances;
    const numberOfRecipes = req.query.numberOfRecipes || 5;
    console.log(query, cuisine, diet, intolerances, numberOfRecipes);
    const search_results = await recipes_utils.SearchRecipes(query, cuisine, diet, intolerances, numberOfRecipes);
  

    // //adding field to seission for saving last searches
    // if (req.session && req.session.user_id) {
    //   req.session.last_search=req.query.getSearchResults
    // }
    res.send(search_results);
  } catch (error) {
    next(error);
  }
});



/**
 * This path returns a full details of a recipe by its id
 */

router.get("/fullDetails/:recipeId", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipeId
    const recipe = await recipes_utils.getRecipeFullDetails(recipe_id, user_id);
    if (user_id){
      await recipes_utils.markAsSeen(user_id,recipe_id)
    }
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipePreview(req.params.recipeId, req.session.user_id);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});





















/**
 * This path returns the information of all recipes that
 * the user saved as favorite
 * (recipes that the user got as recommendation)
  */
router.get("/favorites", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const recipes = await recipes_utils.getRecipesByUserFavorites(user_id);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
