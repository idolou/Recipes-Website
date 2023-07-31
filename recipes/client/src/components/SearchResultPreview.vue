<template>
  <!-- Display Search Results -->
  <div class="container" v-if="searchResults">
    <div class="gallery">
      <div class="row">
        <div
          class="col-sm-6 col-md-6 col-lg-4 col-xl-4"
          v-for="recipe in displayedResults"
          :key="recipe.id"
        >
          <RecipePreview :recipe="recipe" class="recipePreview" />
        </div>
      </div>
    </div>
    <div class="pagination">
      <button
        v-if="searchResults"
        class="arrow-btn"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        <i class="fa fa-chevron-left"></i>
      </button>
      <button
        class="page-btn"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{ active: pageNumber === currentPage }"
        @click="goToPage(pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <button
        v-if="searchResults"
        class="arrow-btn"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        <i class="fa fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "SearchResultPreview",
  components: {
    RecipePreview,
  },
  data() {
    return {
      recipes: [],
      currentPage: 1,
      recipesPerPage: 6,
    };
  },
  props: {
    searchResults: { type: Array, required: false },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.searchResults.length / this.recipesPerPage);
    },
    displayedResults() {
      const startIndex = (this.currentPage - 1) * this.recipesPerPage;
      const endIndex = startIndex + this.recipesPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 2%;
  margin-bottom: 2rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  justify-content: flex-start;
  width: 100%;
}

.col-sm-6,
.col-md-4,
.col-lg-3 {
  position: relative;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

.recipePreview {
  display: block;
  border: 0px solid #eaeaea;
  width: 100%;
  margin-bottom: 1rem;
  height: 90%;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.arrow-btn {
  border: none;
  background-color: transparent;
  color: #2c3e50;
  font-size: 16px;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.arrow-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow-btn:hover {
  background-color: #eaeaea;
}

.page-btn {
  border: none;
  background-color: #42b983;
  color: #ffffff;
  font-size: 16px;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin: 0 0.5rem;
  border-radius: 3px;
}

.page-btn.active {
  background-color: #1d9b51;
}

.page-btn:hover {
  background-color: #1d9b51;
}
</style>
