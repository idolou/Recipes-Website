-- Active: 1685373892798@@127.0.0.1@3306@recipe_db

CREATE TABLE users (
user_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(8) NOT NULL,
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
country VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL
);



CREATE TABLE FavoriteRecipes (
  user_id VARCHAR(8) NOT NULL,
  recipe_id INT NOT NULL,
  PRIMARY KEY(user_id, recipe_id)
);


CREATE TABLE seenrecipes (
   user_id INTEGER NOT NULL,
   recipe_id INTEGER NOT NULL,
   viewed_at TIMESTAMP NOT NULL,
   PRIMARY KEY(user_id, recipe_id),
   UNIQUE(user_id, recipe_id)
);


CREATE TABLE users_recipes (
  user_id INTEGER NOT NULL,
  recipe_id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  cooking_time INTEGER NOT NULL,
  vegan BOOLEAN NOT NULL,
  vegetarian BOOLEAN NOT NULL,
  gluten_free BOOLEAN NOT NULL,
  servings INTEGER NOT NULL,
  instructions VARCHAR(255),
  ingredients VARCHAR(255)
) AUTO_INCREMENT = 200000;



  CREATE Table family_recipes(
    user_id INTEGER NOT NULL,
    recipe_id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    recipe_owner VARCHAR(255) NOT NULL,
    when_cooking VARCHAR(255) NOT NULL,
    Ingredients VARCHAR(255) NOT NULL,
    Instructions VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    PRIMARY KEY(recipe_id)
  )

