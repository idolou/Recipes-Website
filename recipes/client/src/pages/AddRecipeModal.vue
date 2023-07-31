<template>
  <div class="container">
    <h1 class="title">Add New Recipe</h1>
    <form @submit.prevent="submitForm" class="form">
      <!-- Add the form fields for the recipe details -->
    </form>
  </div>
</template>

<script>
export default {
  name: "AddRecipeModal",
  methods: {
    submitForm() {
      // Handle form submission logic here
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
}

.form {
  display: grid;
  grid-gap: 10px;
}

/* Add your custom form styles here */
</style>