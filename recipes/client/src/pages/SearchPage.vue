<template>
  <div>
    <div class="container">
      <div class="row">
        <!-- Search Bar -->
        <div class="col-12">
          <div class="search-bar">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control search-input"
              placeholder="Search"
              @focus="focusSearchBar"
              @keyup.enter="searchRecipes"
              list="search-history-list"
            />
            <datalist id="search-history-list">
              <!-- Specify the id of the datalist -->
              <option
                v-for="query in searchHistory"
                :key="query"
                :value="query"
              ></option>
            </datalist>
          </div>
        </div>
      </div>

      <div id="filters">
        <div class="row mt-3">
          <!-- Filters -->
          <div class="col-12 d-flex align-items-center">
            <!-- Number of Recipes Dropdown -->
            <div class="mr-3">
              <select v-model="numberOfRecipes" class="form-control bg-custom">
                <option
                  v-for="(option, index) in numberOfRecipesOptions"
                  :key="index"
                  :value="option"
                  >{{ option }}</option
                >
              </select>
            </div>

            <!-- Cuisine Dropdown -->
            <div class="mr-3">
              <select v-model="selectedCuisine" class="form-control bg-custom">
                <option
                  v-for="(cuisine, index) in cuisineOptions"
                  :key="index"
                  :value="cuisine"
                  >{{ cuisine }}</option
                >
              </select>
            </div>

            <!-- Diet Dropdown -->
            <div class="mr-3">
              <select v-model="selectedDiet" class="form-control bg-custom">
                <option
                  v-for="(diet, index) in dietOptions"
                  :key="index"
                  :value="diet"
                  >{{ diet }}</option
                >
              </select>
            </div>

            <!-- Intolerances Dropdown -->
            <div>
              <select
                v-model="selectedIntolerances"
                class="form-control bg-custom"
              >
                <option
                  v-for="(intolerance, index) in intoleranceOptions"
                  :key="index"
                  :value="intolerance"
                  >{{ intolerance }}</option
                >
              </select>
            </div>
          </div>

          <!-- Search Button -->
          <div class="col-2 d-flex mt-3">
            <button
              @click="searchRecipes"
              :disabled="!searchQuery"
              class="btn btn-success btn-search"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <!-- Display Search Results -->
      <div class="row mt-3">
        <div class="col-12" v-if="searchResults.length === 0">
          <div class="alert alert-info no-results-message">
      <div class="progress-bar"></div>
      No results found.
    </div>
        </div>
<!-- <div class="animation"> -->
  <img src="https://bestanimations.com/media/simpsons/623965317the-simpsons-animated-gif-4.gif" alt="Cool Animation" class="cool-animation-gif" />

<!-- </div> -->

      </div>
      <!-- Filter Buttons -->
      <div class="filter-buttons" v-if="searchResults.length > 0">
        <button class="btn btn-success btn-search" @click="sortByPopularity">
          Sort by Popularity
        </button>
        <button class="btn btn-success btn-search" @click="sortByCookingTime">
          Sort by Cooking Time
        </button>
      </div>

      <div class="resultsPreview">
        <SearchResultPreview :searchResults="filteredSearchResults" />
      </div>

      <!-- Display a loading message while waiting for the results -->

      <div v-if="loading" class="loading-overlay">
        <div class="loading-box">
          <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <span> Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResultPreview from "../components/SearchResultPreview.vue";
import searchOptions from "../assets/searchOptions";
export default {
  name: "SearchPage",
  components: {
    SearchResultPreview,
  },
  data() {
    return {
      searchQuery: "",
      numberOfRecipes: 5,
      numberOfRecipesOptions: [5, 10, 15],
      selectedCuisine: "",
      cuisineOptions: searchOptions.cuisineOptions,
      selectedDiet: "",
      dietOptions: searchOptions.dietOptions,
      selectedIntolerances: "",
      intoleranceOptions: searchOptions.intoleranceOptions,
      searchResults: [],
      filteredSearchResults: [],
      loading: false,
      searchHistory: [],
    };
  },
  methods: {
    async searchRecipes() {
      const params = {
        query: this.searchQuery,
        numberOfRecipes: this.numberOfRecipes,
        cuisine: this.selectedCuisine,
        diet: this.selectedDiet,
        intolerances: this.selectedIntolerances,
      };

      try {
        this.loading = true;
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/search",
          { params }
        );
        this.searchResults = response.data;

        this.searchHistory.push(this.searchQuery);

        if (this.$root.store.username) {
          sessionStorage.setItem("latestSearch", JSON.stringify(response.data));
        }
      } catch (error) {
        this.$root.toast("Input Error", "Problen in Search", "danger");
      } finally {
        this.loading = false;
      }
    },

    async getLastSearch() {
      let latest_search =
        JSON.parse(sessionStorage.getItem("latestSearch")) || null;
      if (latest_search) {
        this.filteredSearchResults = latest_search;
      }
    },

    focusSearchBar() {
      document.querySelector(".search-input").focus();
    },
    sortByPopularity() {
      this.filteredSearchResults = [...this.searchResults].sort(
        (a, b) => b.popularity - a.popularity
      );
    },

    sortByCookingTime() {
      this.filteredSearchResults = [...this.searchResults].sort(
        (a, b) => a.readyInMinutes - b.readyInMinutes
      );
    },
  },
  computed: {
    showFilterButtons() {
      return this.searchResults.length > 0 && this.filteredResults.length > 0;
    },
  },

  mounted() {
    this.getLastSearch();
  },

  watch: {
    searchResults: {
      immediate: true,
      handler(newValue) {
        this.filteredSearchResults = [...newValue];
      },
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 2%;
}

.resultsPreview {
  width: 100%;
}

.search-bar {
  position: relative;
  background-color: #d6f3e1;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.search-bar input {
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
}

.bg-custom {
  background-color: #d6f3e1;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.filter-buttons button {
  margin-right: 0.5rem;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px); /* Add the blur effect */
}

.loading-box {
  background-color: rgba(
    0,
    128,
    0,
    0.5
  ); /* Semi-transparent green background */
  color: white;
  padding: 30px; /* Increased padding for more space */
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative; /* Add position: relative to center the box */
  font-size: 24px; /* Increase font size */
}

.loading-box i {
  font-size: 40px; /* Increase spinner size */
  margin-right: 20px; /* Increased spacing */
}

/* Center the box horizontally and vertically */
.loading-box::before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}




.no-results-message {
  margin-top: 20px;
  opacity: 0.7;
  position: relative; /* Ensure the position is relative to contain the progress bar */
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0; /* Starting width of the progress bar (0% progress) */
  background-color: #42b983; /* Color of the progress bar */
  animation: progressBarAnimation 10s linear infinite; /* Animation properties */
  opacity: 0.5; /* Set the opacity of the progress bar */
  border-radius: 3px;
}

@keyframes progressBarAnimation {
  0% {
    width: 0; /* Starting width of the progress bar (0% progress) */
  }
  100% {
    width: 100%; /* Ending width of the progress bar (100% progress) */
  }
}

.cool-animation-gif {
  position: relative;
  padding-top: 25%;
  left: 30%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 30%;
  width: 30%;
  animation: slideAnimation 5s linear infinite; /* Apply the animation to the GIF */

}
@keyframes slideAnimation {
  0% {
    transform: translate(-50%, -50%) translateX(0%); /* Starting position (right side of the container) */
  }
  100% {
    transform: translate(-50%, -50%) translateX(100%); /* Ending position (left side of the container) */
  }
}

.no-results-message:hover {
  opacity: 1;
}
</style>
