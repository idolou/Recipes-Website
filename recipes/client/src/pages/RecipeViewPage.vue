<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>

        <div class="image-container">
          <img :src="recipe.image" class="center" />

          <div class="info-container">
            <span v-if="recipe.vegetarian" class="icon-container">
              <i class="fas fa-leaf"></i>
              <span class="icon-label">Vegetarian</span>
            </span>
            <span v-if="recipe.vegan" class="icon-container">
              <i class="fas fa-seedling"></i>
              <span class="icon-label">Vegan</span>
            </span>
            <p v-if="recipe.glutenFree">Gluten-Free</p>
            <p>Servings: {{ recipe.servings }}</p>
            <p>Likes: {{ recipe.popularity ? recipe.popularity : 0 }}</p>

            <span class="fav-btn" v-if="this.$root.store.username">
              <button
                @click="toggleFavorite()"
                class="btn btn-link"
                style="padding: 0; border: none; background: none;"
              >
                <i
                  v-if="this.isFavorite"
                  class="fas fa-heart"
                  style="color: rgb(15, 143, 68);"
                ></i>
                <i v-else class="far fa-heart" style="color: rgb(0, 0, 0);"></i>
              </button>
            </span>
          </div>
        </div>

        <div class content-container>
          <h2>Ingredients:</h2>
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
              {{ ingredient.name }}
            </li>
          </ul>
          <h2>Instructions:</h2>
          <ol>
            <li
              v-for="instruction in recipe.instructions"
              :key="instruction.number"
            >
              {{ instruction.step }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recipe",
  data() {
    return {
      recipe: null,
      isFavorite: false,
    };
  },

  async created() {
    try {
      let response;
      //check if the recipe is in the session storage and if so use it instead of making a request to the server
      if (
        sessionStorage.getItem("recipe-" + this.$route.params.recipeId) !== null
      ) {
        this.recipe = JSON.parse(
          sessionStorage.getItem("recipe-" + this.$route.params.recipeId)
        );
        return;
      }

      //if the recipe is not in the session storage, make a request to the server
      try {
        response = await this.axios.get(
          `${this.$root.store.server_domain}/recipes/fullDetails/${this.$route.params.recipeId}/`,
          { withCredentials: true }
        );

        //check if the recipe is in the user's favorites
        this.isFavorite = response.data.isFavorite;

        //change the session storage to reflect the change
        let random_recipes = JSON.parse(
          sessionStorage.getItem("randomRecipes")
        );
        if (random_recipes) {
          random_recipes.forEach((recipe) => {
            if (recipe.id === this.$route.params.recipeId) {
              recipe.isWatched = true;
            }
          });
          sessionStorage.setItem(
            "randomRecipes",
            JSON.stringify(random_recipes)
          );
        }

        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        id,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        instructions,
        ingredients,
        popularity,
        readyInMinutes,
        image,
        title,
        isFavorite,
      } = response.data;

      let _recipe = {
        id,
        instructions,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        ingredients,
        readyInMinutes,
        image,
        title,
        popularity,
        isFavorite,
      };

      this.recipe = _recipe;
      //save the recipe in the session storage
      sessionStorage.setItem(
        "recipe-" + this.$route.params.recipeId,
        JSON.stringify(_recipe)
      );
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async toggleFavorite() {
      if (this.$root.store.username && !this.isFavorite) {
        this.recipe.isFavorite = !this.recipe.isFavorite;
        this.isFavorite = true;
        try {
          await this.axios.post(
            this.$root.store.server_domain + "/users/favorites",
            { recipeId: this.recipe.id },
            { withCredentials: true }
          );
          this.$emit("favorite-updated", this.recipe); // Emit the event

          //change the session storage to reflect the change
          let saved_details = JSON.parse(
            sessionStorage.getItem("recipe-" + this.$route.params.recipeId)
          );

          if (saved_details) {
            saved_details.isFavorite = true;
            sessionStorage.setItem(
              "recipe-" + this.$route.params.recipeId,
              JSON.stringify(saved_details)
            );
          }

          //change the session storage to reflect the change
          let saved_favorites = JSON.parse(sessionStorage.getItem("favorites"));
          if (saved_favorites) {
            saved_favorites.forEach((recipe) => {
              if (recipe.id === this.$route.params.recipeId) {
                recipe.isFavorite = true;
              }
            });
            sessionStorage.setItem(
              "favorites",
              JSON.stringify(saved_favorites)
            );
          }

          //change the session storage to reflect the change
          let random_recipes = JSON.parse(
            sessionStorage.getItem("randomRecipes")
          );
          if (random_recipes) {
            random_recipes.forEach((recipe) => {
              if (recipe.id === this.$route.params.recipeId) {
                recipe.isFavorite = true;
              }
            });
            sessionStorage.setItem(
              "randomRecipes",
              JSON.stringify(random_recipes)
            );
          }

          //change the session storage to reflect the change
          let saved_latest_search = JSON.parse(
            sessionStorage.getItem("latestSearch")
          );
          if (saved_latest_search) {
            saved_latest_search.forEach((recipe) => {
              if (recipe.id === this.$route.params.recipeId) {
                recipe.isFavorite = true;
              }
            });
            sessionStorage.setItem(
              "latestSearch",
              JSON.stringify(saved_latest_search)
            );
          }
        } catch (error) {
          this.$root.toast(
            "Input Error",
            "Recipe already markes as favorite",
            "success"
          );
        }

        try {
          const response = await this.axios.get(
            this.$root.store.server_domain + "/users/favorites"
          );
          sessionStorage.setItem("favorites", JSON.stringify(response.data));
        } catch (error) {
          this.$root.toast("Input Error", error.message, "danger");
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add any necessary CSS styles for the About page */
.container {
  display: flex;
  flex-direction: column;
}

.image-container {
  display: flex;
  align-items: flex-start;
}

.image-container img {
  width: 200px; /* Adjust the width as needed */
  margin-right: 20px;
  border-radius: 10px;
}

.info-container {
  display: flex;
  flex-direction: column;
}

.content-container {
  margin-top: 20px;
}

.icon-container {
  display: flex;
  align-items: center;
}

.icon-label {
  margin-left: 5px;
}

.fav-btn {
  transition: 0.3s;
}

.fav-btn:hover {
  opacity: 0.5;
}

/* Include Font Awesome styles */
@import "~@fortawesome/fontawesome-free/css/all.css";
</style>
