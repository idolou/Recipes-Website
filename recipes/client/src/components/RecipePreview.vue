<template>
  <div class="container">
    <b-card class="recipe-preview">
      <div class="recipe-body">
        <div :title="recipe.title" class="recipe-title" @click="goToRecipe">
          {{ recipe.title }}
        </div>
        <div class="recipe-image-container" @click="goToRecipe">
          <div v-if="!imageLoaded" class="spinner">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <img
            :src="recipe.image"
            class="recipe-image"
            @load="handleImageLoad"
          />
        </div>
      </div>
      <div class="recipe-footer">
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.popularity || recipe.aggregateLikes }} likes</li>
          <li>{{ recipe.servings ? recipe.servings + " servings" : "" }}</li>
          <li data-placement="top" title="vegetarian" v-if="recipe.vegetarian">
            <i class="fas fa-leaf"></i>
          </li>
          <li data-placement="top" title="vegan" v-if="recipe.vegan">
            <i class="fas fa-seedling" style="color: rgb(15, 143, 68)"></i>
          </li>
          <li v-if="recipe.isWatched"><i class="fas fa-eye"></i></li>
          <li class="fav-btn" v-if="this.$root.store.username">
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
          </li>
        </ul>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
  data() {
    return {
      imageLoaded: false,
      isFavorite: this.recipe.isFavorite,
    };
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem("isLoggedIn") === "true";
    },
  },

  methods: {
    goToRecipe() {
      console.log("goToRecipe", this.recipe.id);
      this.recipe.isWatched = true;
      let saved_last_viewed = JSON.parse(sessionStorage.getItem("lastViewedRecipes"));
      if (saved_last_viewed) {
        saved_last_viewed.splice(saved_last_viewed.length-1,1, this.recipe);
        // saved_last_viewed.push(this.recipe);
        sessionStorage.setItem("lastViewedRecipes", JSON.stringify(saved_last_viewed));
      } else {
        sessionStorage.setItem("lastViewedRecipes", JSON.stringify([this.recipe]));
      }

      //change the session storage to reflect the change
      let favorites = JSON.parse(sessionStorage.getItem("favorites"));
      if (favorites) {
        favorites.forEach((recipe) => {
          if (recipe.id === this.recipe.id) {
            recipe.isWatched = true;
          }
        });
        sessionStorage.setItem("favorites", JSON.stringify(favorites));
      }

      //change the session storage to reflect the change
      let last_search = JSON.parse(sessionStorage.getItem("latestSearch"));
      if (last_search) {
        last_search.forEach((recipe) => {
          if (recipe.id === this.recipe.id) {
            recipe.isWatched = true;
          }
        });
        sessionStorage.setItem("latestSearch", JSON.stringify(last_search));
      }

      this.$router.push({
        name: "recipe",
        params: { recipeId: this.recipe.id },
      });
    },
    handleImageLoad() {
      this.imageLoaded = true;
    },

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

          //change the session storage to reflect the change
          let saved_details = JSON.parse(
            sessionStorage.getItem("recipe-" + this.recipe.id)
          );

          if (saved_details) {
            saved_details.isFavorite = true;
            sessionStorage.setItem(
              "recipe-" + this.$route.params.recipeId,
              JSON.stringify(saved_details)
            );
          }

          //change the session storage to reflect the change
          let randomRecipes = JSON.parse(
            sessionStorage.getItem("randomRecipes")
          );
          if (randomRecipes) {
            randomRecipes.forEach((recipe) => {
              if (recipe.id === this.recipe.id) {
                recipe.isFavorite = true;
              }
            });
            sessionStorage.setItem(
              "randomRecipes",
              JSON.stringify(randomRecipes)
            );
          }
          //change the session storage to reflect the change
          let latest_search = JSON.parse(
            sessionStorage.getItem("latestSearch")
          );
          if (latest_search) {
            latest_search.forEach((recipe) => {
              if (recipe.id === this.recipe.id) {
                recipe.isFavorite = true;
              }
            });
            sessionStorage.setItem(
              "latestSearch",
              JSON.stringify(latest_search)
            );
          }

          this.$emit("favorite-updated", this.recipe); // Emit the event
        } catch (error) {
          this.$root.toast(
            "Input Error",
            "Recipe already marked as favorite",
            "success"
          );
        }

        //update the favorites list in the session storage to reflect the change in the server  (if the user refreshes the page)
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

  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  margin: 3%;
  color: black;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1),
    rgba(141, 184, 133, 0.1),
    rgba(99, 158, 88, 0.1)
  );
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  width: 100%;
  height: 100%;

}

.recipe-preview:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.recipe-title {
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: 0.3s;


}

.recipe-title:hover {
  opacity: 0.5;
}

.recipe-preview > .recipe-body {
  padding: 10px;
  width: 100%;
  height: auto;
  position: relative;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-image-container {
  position: relative;
  padding-top: 2%;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.recipe-preview .recipe-body .recipe-image {
  margin: auto;
  display: block;
  width: 100%;
  object-fit: cover;
  height: 80%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  border-radius: 10px;
  left: 0;
  opacity: 1;
  transition: 0.5s ease;
  backface-visibility: hidden;
  cursor: pointer;
}
.recipe-preview .recipe-body:hover .recipe-image {
  opacity: 0.3;
}

.fav-btn {
  transition: 0.3s;
}

.fav-btn:hover {
  opacity: 0.5;
}

.recipe-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: 2%;
}

.recipe-footer .recipe-title {
  padding: 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin-bottom: 0;
}

.recipe-footer ul.recipe-overview li {
  flex-grow: 1;
  text-align: center;
  padding: 3px;
}

@import "~@fortawesome/fontawesome-free/css/all.css";
</style>
