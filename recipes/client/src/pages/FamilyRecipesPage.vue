<template>
  <div class="container">
    <h1 class="title">Family Recipes</h1>

    <div class="resultsPreview">
      <FamilyRecipePreview
        v-for="recipe in recipe_list"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </div>
</template>

<script>
import FamilyRecipePreview from "../components/FamilyRecipePreview.vue";
export default {
  name: "myrecipes",
  components: {
    FamilyRecipePreview,
  },
  data() {
    return {
      recipe_list: [],
    };
  },
  mounted() {
    this.getFamilyRecipes();
  },

  methods: {
    async getFamilyRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/myfamilyrecipes"
        );
        this.recipe_list = response.data;
      } catch (error) {
        this.$root.toast("Input Error", error.message, "danger");
      }
    },
  },
};
</script>

<style>
.container {
  margin-top: 2%;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
}

.title {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 2rem;
}
</style>
