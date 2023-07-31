<template>
  <div class="container">
    <!-- Left Column -->
    <div class="columns-container">
      <div class="left-column">
        <RecipePreviewList
          class="RandomRecipes"
          title="Discover these recipes:"
          :recipes="randomRecipes || []"
          :randomized="true"
          @updateRandom="randomizeRecipes"
        />
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <template v-if="$root.store.username">
          <RecipePreviewList
            title="Recently Viewed Recipes:"
            :recipes="lastViewedRecipes || []"
          ></RecipePreviewList>
        </template>
        <template v-else>
          <LoginPage
            @loggedIn="login"
            style="padding-top:50%; padding-bottom:50%;"
          ></LoginPage>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";
export default {
  components: {
    RecipePreviewList,
    LoginPage,
  },

  data() {
    return {
      randomRecipes: [],
      lastViewedRecipes: [],
      isLoggedIn: false,
    };
  },
  created() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
  },
  async mounted() {
    await this.getData();
  },

  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        this.getData();
      }
    },
  },

  methods: {
    loggedIn(val) {
      this.isLoggedIn = val;
    },

    async getRandomRecipes(new_data = false) {
      if (!new_data) {
        const last_random = sessionStorage.getItem("randomRecipes");
        if (last_random) {
          return JSON.parse(last_random);
        }
      }

      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random"
        );
        sessionStorage.setItem("randomRecipes", JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        this.$root.toast(
          "Input Error",
          "Couldn't get Random Recipes",
          "danger"
        );
      }
      return [];
    },

    async getLastViewedRecipes() {
      //check if we have the data in the session storage
      const saves_last_viewed = sessionStorage.getItem("lastViewedRecipes");
      if (saves_last_viewed) {
        return JSON.parse(saves_last_viewed);
      }

      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/lastSeen",
          { withCredentials: true }
        );
        sessionStorage.setItem(
          "lastViewedRecipes",
          JSON.stringify(response.data)
        );

        return response.data;
      } catch (error) {
        this.$root.toast(
          "Input Error",
          "Couldn't get Last Viewed Recipes",
          "danger"
        );
      }
    },

    async getData(new_data = false) {
      this.randomRecipes = await this.getRandomRecipes(new_data);
      if (this.isLoggedIn && this.$root.store.username) {
        this.lastViewedRecipes = await this.getLastViewedRecipes();
      }
    },

    async randomizeRecipes() {
      this.randomRecipes = await this.getRandomRecipes(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 2% auto;
  width: 100%;
}

.columns-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: -10px; /* Adjust the left margin as needed */
  margin-right: -10px; /* Adjust the right margin as needed */
}

.left-column,
.right-column {
  flex-basis: 50%;
  padding-left: 10px; /* Adjust the left padding as needed */
  padding-right: 10px; /* Adjust the right padding as needed */
}
</style>
