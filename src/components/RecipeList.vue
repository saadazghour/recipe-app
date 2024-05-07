<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 my-6">Recipes</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li
        v-for="recipe in recipes"
        :key="recipe.id"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <img :src="`/images/${recipe.image}`" alt="" class="w-full h-48 object-cover" />

        <div class="p-4">
          <h2 class="text-xl font-semibold text-gray-700">{{ recipe.name }}</h2>
          <p class="text-gray-600">{{ recipe.description }}</p>

          <h3 class="text-md font-semibold mt-2">Ingredients:</h3>
          <ul class="list-disc pl-5 mt-2 text-gray-600">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>

          <h3 class="text-md font-semibold mt-2">Instructions:</h3>
          <p class="text-gray-600">{{ recipe.instructions }}</p>

          <button
            @click="updateStatus(recipe.id)"
            class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Mark as Completed
          </button>
        </div>
      </li>
    </ul>

    <router-link
      to="/add-recipe"
      class="mt-4 inline-block bg-blue-500 py-2 px-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 rounded"
      >Add New Recipe</router-link
    >
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      recipes: []
    }
  },
  created() {
    this.fetchRecipes()
  },
  methods: {
    fetchRecipes() {
      axios
        .get('http://localhost:3000/recipes')
        .then((res) => {
          this.recipes = res.data
          console.log('logged', res.data)
        })
        .catch((error) => {
          console.error('There was an error fetching the recipes:', error)
        })
    },
    updateStatus(id) {
      axios
        .patch(`http://localhost:3000/recipes/${id}`, {
          status: 'completed'
        })
        .then(() => {
          this.fetchRecipes() // Refresh the list
        })
        .catch((error) => {
          console.error('There was an error updating the recipe:', error)
        })
    }
  }
}
</script>
