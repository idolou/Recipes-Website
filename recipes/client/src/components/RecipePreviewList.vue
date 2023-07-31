<template>
  <div class="container">
    <h2 style="font-weight: bold;">{{ title }}</h2>

    <b-container>
      <div class="recipe-column">
        <div v-for="r in recipes" :key="r.id" class="recipe-wrapper">
          <RecipePreview :recipe="r" class="recipePreview" />
        </div>

        <div class="button-wrapper">
          <b-button
            v-if="randomized === true"
            width="auto"
            class="more-recipes-button"
            variant="success"
            @click="$emit('updateRandom')"
          >
            More Recipes!
          </b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: { type: String, required: false },
    recipes: { type: Array, required: true },
    randomized: { type: Boolean, default: false },
  },
  created() {
    if (!this.recipes || !this.recipes.length === 0) {
      this.$emit("created");
    }
  },
};
</script>

<style scoped>
.recipe-column {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.recipePreview {
  display: block;
}

.recipe-wrapper {
  margin-bottom: 10px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
