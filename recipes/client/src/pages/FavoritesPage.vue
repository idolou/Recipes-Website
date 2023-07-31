<template>
  <div class="container">
    <h1 class="title">Your Favorite Recipes</h1>

    <div class="resultsPreview">
      <SearchResultPreview :searchResults="favorite_list" />
    </div>

    <div v-if="loading" class="loading-overlay">
      <div class="loading-box">
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <span> Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResultPreview from "../components/SearchResultPreview.vue";
export default {
  name: "favorites",
  components: {
    SearchResultPreview,
  },
  data() {
    return {
      favorite_list: [],
      loading: false,
    };
  },
  mounted() {
    this.getFavorites();
  },

  methods: {
    async getFavorites() {
      const saved_favorites = sessionStorage.getItem("favorites") || null;

      if (saved_favorites != null) {
        this.favorite_list = JSON.parse(saved_favorites);
        return;
      }

      try {
        this.loading = true;
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites"
        );
        this.favorite_list = response.data;
        sessionStorage.setItem("favorites", JSON.stringify(this.favorite_list));
        this.loading = false;
      } catch (error) {
        this.$root.toast(
          "Input Error",
          "Couldn't get Your Favorites Recipes",
          "danger"
        );
      } finally {
        this.loading = false;
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
</style>
