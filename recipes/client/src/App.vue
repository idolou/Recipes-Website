<template>
  <div id="app">
    <div id="content">
      <!-- Navbar -->
      <div id="nav">
        <!-- Router Links -->
        <router-link :to="{ name: 'main' }">Main Page</router-link> |
        <router-link :to="{ name: 'search' }">Search</router-link> |
        <router-link :to="{ name: 'about' }">About</router-link> |

        <!-- Personal dropdown (visible if a username is available) -->
        <div
          id="personal-dropdown"
          v-if="$root.store.username"
          :class="{ active: isPersonalActive }"
        >
          Personal |

          <!-- Dropdown content -->
          <div class="dropdown-content">
            <router-link :to="{ name: 'favorites' }"
              >Favorites Recipes</router-link
            >
            <router-link :to="{ name: 'myrecipes' }">My Recipes</router-link>
            <router-link :to="{ name: 'familyrecipes' }"
              >Family Recipes</router-link
            >
          </div>
        </div>

        <!-- Add Recipe button (visible if a username is available) -->
        <span v-if="$root.store.username">
          <!-- Button trigger modal -->
          <button
            type="button"
            id="modalBtn"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Recipe
          </button>
        </span>

        <!-- Add Recipe Modal -->
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Add Recipe
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form id="recipeForm" @submit="saveRecipe">
                  <div class="mb-3">
                    <label for="title" class="form-label">Title:</label>
                      <input
                      type="text"
                      class="form-control bg-custom"
                      id="title"
                      v-model="form.title"
                      required
                    />


                  </div>
                  <div class="mb-3">
                    <label for="cookingTime" class="form-label"
                      >Cooking Time (minutes):</label
                    >
                    <input
                      type="number"
                      class="form-control bg-custom"
                      id="cookingTime"
                      v-model="form.cookingTime"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="imageURL" class="form-label">Image URL:</label>
                    <input
                      type="text"
                      class="form-control bg-custom"
                      id="imageURL"
                      v-model="form.imageURL"
                    />
                  </div>
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input bg-custom"
                      id="vegan"
                      v-model="form.vegan"
                    />
                    <label class="form-check-label" for="vegan">Vegan</label>
                  </div>
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input bg-custom"
                      id="vegetarian"
                      v-model="form.vegetarian"
                    />
                    <label class="form-check-label" for="vegetarian"
                      >Vegetarian</label
                    >
                  </div>
                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input bg-custom"
                      id="glutenFree"
                      v-model="form.glutenFree"
                    />
                    <label class="form-check-label" for="glutenFree"
                      >Gluten-Free</label
                    >
                  </div>
                  <div class="mb-3">
                    <label for="servings" class="form-label">Servings:</label>
                    <input
                      type="number"
                      class="form-control bg-custom"
                      id="servings"
                      v-model="form.servings"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="instructions" class="form-label"
                      >Instructions:</label
                    >
                    <textarea
                      class="form-control bg-custom"
                      id="instructions"
                      rows="4"
                      v-model="form.instructions"
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="ingredients" class="form-label"
                      >Ingredients:</label
                    >
                    <textarea
                      class="form-control bg-custom"
                      id="ingredients"
                      rows="4"
                      v-model="form.ingredients"
                    ></textarea>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-success">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Guest and user sections -->
        <div id="reglog">
          <!-- Guest section -->
          <span v-if="!$root.store.username">
            <div id="guest">
              <h5 style="font-weight: bold;">Hello Guest:</h5>
            </div>
            <div id="reglog-links">
              <router-link :to="{ name: 'register' }">Register</router-link> |
              <router-link :to="{ name: 'login' }">Login</router-link> |
            </div>
          </span>

          <!-- User section -->
          <span v-else>
            <div id="user">
              <span class="username">{{ $root.store.username }}</span>
              <button @click="logout" class="logout-button">Logout</button>
            </div>
          </span>
        </div>
      </div>

      <!-- Router View -->
      <router-view />
    </div>
    <!-- Footer -->
    <footer>
      <div class="footer_container">
        <p>
          Developed by
          <a
            href="https://github.com/idolou"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-github"></i
          ></a>
          Ido Lourie -
          <a
            href="https://github.com/EladShmulevich"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fab fa-github"></i
          ></a>
          Elad Shmulevich
        </p>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      showAddRecipeModal: false,
      form: {
        title: "",
        cookingTime: null,
        imageURL: "",
        popularity: null,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        servings: null,
        instructions: "",
        ingredients: "",
      },
    };
  },
  computed: {
    isPersonalActive() {
      return (
        this.$route.name === "favorites" ||
        this.$route.name === "myrecipes" ||
        this.$route.name === "familyrecipes"
      );
    },
  },
  methods: {
    logout() {
      this.$root.store.logout();
      this.$root.isLoggedIn = false;
      this.$root.toast("Logout", "User logged out successfully", "success");
      localStorage.setItem("isLoggedIn", false);
      this.isLoggedIn = false;
      sessionStorage.clear();
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    openAddRecipeModal() {
      this.showAddRecipeModal = true;
      console.log("openAddRecipeModal");
      console.log(this.showAddRecipeModal);
    },
    closeAddRecipeModal() {
      this.showAddRecipeModal = false;
    },

    async saveRecipe() {
      try {
        // Prepare the data to be sent
        const recipeData = {
          title: this.form.title,
          cooking_time: this.form.cookingTime,
          image_url: this.form.imageURL,
          vegan: this.form.vegan,
          vegetarian: this.form.vegetarian,
          gluten_free: this.form.glutenFree,
          servings: this.form.servings,
          instructions: this.form.instructions,
          ingredients: this.form.ingredients,
        };

        // Send the data to your backend API
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/myrecipes",
          recipeData
        );

        // Handle the response
        console.log("Recipe saved:", response.data);
        this.$root.toast("Rcipe saved", "good luck", "success");

        // Reset the form
        this.form = {
          title: "",
          cookingTime: null,
          imageURL: "",
          vegan: false,
          vegetarian: false,
          glutenFree: false,
          servings: null,
          instructions: "",
          ingredients: "",
        };
      } catch (error) {
        this.$root.toast("Failed to save recipe", error.message, "danger");
      }
    },
  },
  components: {
    //AddRecipeModal,
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255),
    rgba(141, 184, 133, 0.5),
    rgba(99, 158, 88, 0.5)
  );
  display: flex;
  flex-direction: column;
}




#nav {
  padding: 15px 30px; /* Adjust the padding to reduce the overall height */
  border-bottom: 1px solid #ccc;
  background: linear-gradient(
    90deg,
    rgb(105, 189, 150) 0%,
    rgba(0, 172, 92, 1) 35%,
    rgb(64, 156, 99) 100%
  );
}

#nav a {
  font-weight: bold;
  color: #ffffff;
  font-size: 16px; /* Adjust the font size as per your preference */
  transition: color 0.3s ease-in-out;
  line-height: 1.5; /* Adjust the line height to reduce the vertical space */
}

#nav a:hover {
  color: #4c687a;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
}

#reglog {
  float: right;
  display: flex;
  align-items: center;
}

#reglog h5 {
  margin-right: 10px;
  font-weight: normal;
}

#reglog router-link {
  margin-right: 10px;
}

#reglog span {
  margin-right: 10px;
}

#personal-dropdown {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
  color: #ffffff;
  transition: color 0.3s ease-in-out;
  border-radius: 4px;
}

#personal-dropdown:hover {
  color: #52768f;
  text-decoration: underline;
}

#personal-dropdown .dropdown-content {
  display: none;
  position: absolute;
  background-color: #a2e2c4;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(250, 248, 248, 0.2);
  padding: 12px 16px;
  z-index: 1;
  border-radius: 4px;
}

#personal-dropdown:hover .dropdown-content {
  display: block;
  /* Add a delay before hiding the dropdown content */
  transition-delay: 0.3s;
}

#personal-dropdown .dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: color 0.3s ease-in-out;
}

#personal-dropdown .dropdown-content a:hover {
  color: #43b680;
  text-decoration: underline;
}

#personal-dropdown .dropdown-content a.router-link-exact-active {
  color: #42b983;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

#personal-dropdown.active {
  color: #2c3e50;
}

#guest {
  display: inline-block;
  font-weight: bold;
  font-size: 1.5em;
}

#reglog-links {
  display: inline-block;
  margin-left: 0.2em;
}

#user {
  display: inline-block;
  vertical-align: middle;
}

#modalBtn {
  background-color: #42b983;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

#modalBtn:hover {
  background-color: #1d9b51;
}

.username {
  font-weight: bold;
  margin-right: 10px;
}

.bg-custom {
  background-color: #d6f3e1 !important;
  border-radius: 4px;
}

.logout-button {
  background-color: #42b983;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.logout-button:hover {
  background-color: #74797e;
}

#personal-dropdown .dropdown-content {
  /* Existing styles... */
  margin-top: 1px; /* Add a small margin to separate the dropdown from the parent */
}

#personal-dropdown .dropdown-content:hover {
  display: block;
  /* Cancel the transition delay when hovering over the dropdown content */
  transition-delay: 0s;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal-dialog {
  position: relative;
  width: 100%;
  margin: 10px auto;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    to left,
    rgb(146, 199, 164),
    rgba(141, 184, 133),
    rgb(129, 177, 120)
  );
}

.modal-header {
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
}

.modal-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 15px;
  overflow-y: auto;
}

.modal-footer {
  padding: 15px;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
}

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}

.close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
}
#content {
  flex-grow: 1;
}

footer {
  background: linear-gradient(
    to right,
    rgb(51, 134, 78),
    rgba(35, 126, 19, 0.5),
    rgba(20, 109, 150, 0.4)
  );
  margin-top: auto;

  color: #ffffff;
  padding: 20px 0;
  text-align: center;
}

footer p {
  margin: 0;
}

footer i {
  vertical-align: middle;
}

footer a {
  color: #ffffff;
  text-decoration: none;
  margin: 0 5px;
}

.toast:not(.show) {
  display: block;
}


</style>
