const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

// async function markAsSeen(user_id, recipe_id) {
//     await DButils.execQuery(
//       `insert into  seenrecipes ('${user_id}','${recipe_id}',NOW())`
//     );
//   }

// async function markAsSeen(user_id, recipe_id) {
//   await DButils.execQuery(
//     `INSERT INTO seenrecipes (user_id, recipe_id, viewed_at)
//      VALUES ('${user_id}', '${recipe_id}', NOW())
//      ON DUPLICATE KEY UPDATE time = NOW()`
//   );
// }

async function getLastThreeRecipesHist(user_id){
  if (user_id == undefined){
    return [];
  }
  const query = `
  SELECT recipe_id
  FROM seenrecipes
  WHERE user_id = '${user_id}'
  ORDER BY viewed_at DESC
  LIMIT 3
`;
  const result = await DButils.execQuery(query);
  return result;
}



async function getRcipeIndication(tablename, recipe_id, user_id){
  let users = [];
  users = await DButils.execQuery(`SELECT user_id FROM ${tablename} WHERE user_id=${user_id} AND recipe_id=${recipe_id}`);
  if (users.length != 0){
      return true;
  }
  return false;
}

async function getMyRecipes(user_id){
  let arrOfMyRecipes = await DButils.execQuery(
    `SELECT * FROM users_recipes where user_id='${user_id}' `
  )
  result = Promise.all(arrOfMyRecipes)
  return result;
}


async function addMyRecipe(user_id, title, cooking_time,image_url,vegan,vegetarian,gluten_free,servings,instructions,ingredients) {
  const veganValue = vegan ? 1 : 0; // Convert boolean value to 1 or 0
  const vegetarianValue = vegetarian ? 1 : 0;
  const glutenFreeValue = gluten_free ? 1 : 0;
  
  await DButils.execQuery(
      `INSERT INTO users_recipes (user_id, title, cooking_time,image_url,vegan,vegetarian,gluten_free,servings,instructions,ingredients) VALUES ('${user_id}', '${title}', '${cooking_time}',
      '${image_url}', '${veganValue}', '${vegetarianValue}', '${glutenFreeValue}', '${servings}', '${instructions}', '${ingredients}')`
    );
}

async function getMyFamilyRecipes(user_id){
  let arrOfMyFamilyRecipes = await DButils.execQuery(
    `SELECT * FROM family_recipes where user_id='${user_id}' `
  )
  result = Promise.all(arrOfMyFamilyRecipes)
  return result;
}

async function addMyFamilyRecipe(user_id, title, recipe_owner,when_cooking,ingredients,instructions,image_url) {
  await DButils.execQuery(
      `INSERT INTO family_recipes (user_id, title, recipe_owner,when_cooking,ingredients,instructions,image_url) VALUES ('${user_id}', '${title}', '${recipe_owner}',
      '${when_cooking}', '${ingredients}', '${instructions}', '${image_url}')`
    );
}


exports.getRcipeIndication = getRcipeIndication;
//exports.markAsSeen = markAsSeen;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getMyRecipes = getMyRecipes;
exports.addMyRecipe = addMyRecipe;
exports.getMyFamilyRecipes = getMyFamilyRecipes;
exports.addMyFamilyRecipe = addMyFamilyRecipe;
exports.getLastThreeRecipesHist = getLastThreeRecipesHist;