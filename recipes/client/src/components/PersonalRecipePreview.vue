<template>
    <div class="container">
      <b-card class="recipe-preview">
        <div class="recipe-body">
          <div :title="recipe.title" class="recipe-title">{{ recipe.title }}</div>
          <div class="recipe-image-container">
            <div v-if="!imageLoaded" class="spinner">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <img
              :src="recipe.image_url"
              class="recipe-image"
              @load="handleImageLoad"
            />
          </div>
        </div>
        <div class="recipe-footer">
          <ul class="recipe-overview">
            <li>{{ recipe.cooking_time }} minutes</li>
            <li>{{ recipe.servings ? recipe.servings + " servings" : "" }} </li>
            <li data-placement="top" title="vegetarian" v-if="recipe.vegetarian"><i class="fas fa-leaf"></i></li>
            <li data-placement="top" title="vegan" v-if="recipe.vegan"><i class="fas fa-seedling" style = "color: rgb(15, 143, 68)"></i></li>
          </ul>
        </div>
        <div class="recipe-instructions">
            <h5>Instructions:</h5>
            <!-- <p>{{ recipe.instructions }}</p> -->
            <ul>
                    <li v-for="instruction in recipe.instructions.split('\n')" :key="instruction">{{ instruction }}</li>
                </ul>
          </div>
          <div class="recipe-ingredients">
            <h5>Ingredients:</h5>
            <ul>
                    <li v-for="ingredient in recipe.ingredients.split('\n')" :key="ingredient">{{ ingredient }}</li>
                </ul>
          </div>
      </b-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "PersonalRecipePreview",
    data() {
      return {
        imageLoaded: false,
      };
    },
    methods: {
      handleImageLoad() {
        this.imageLoaded = true;
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
    padding-bottom: 2%;
    width: 100%; /* Set the desired width for the images */
    height: 100%; /* Set the desired height for the images */
    overflow: hidden; /* Hide any overflowing parts of the images */
  }
  .recipe-preview .recipe-image-container img {
    width: 100%; /* Make the image fill the container horizontally */
    height: 100%; /* Make the image fill the container vertically */
    object-fit: cover; /* Maintain the aspect ratio and cover the container */
  }

  .recipe-preview .recipe-body .recipe-image {
    margin: auto;
    display: block;
    width: 20%;
    object-fit: cover;
    height: 20%;
    border-radius: 10px;

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
  </style>
  