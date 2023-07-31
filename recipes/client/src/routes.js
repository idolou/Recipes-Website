import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
// import AboutPage from "./pages/AboutPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage.vue"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/AboutPage.vue'),
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('./pages/FavoritesPage.vue'),
  },
  {
    path: '/myrecipes',
    name: 'myrecipes',
    component: () => import('./pages/MyRecipesPage.vue'),
  },
  {
    path: '/familyrecipes',
    name: 'familyrecipes',
    component: () => import('./pages/FamilyRecipesPage.vue'),
  },
  // {
  //   path: '/addrecipe',
  //   name: 'addrecipe',
  //   component: () => import('./pages/AddRecipePage.vue'),
  // },


];

export default routes;
