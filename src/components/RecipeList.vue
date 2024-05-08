<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-center text-gray-800 my-6">Recipes</h1>

    <!-- Filter Dropdown -->
    <select v-model="filterStatus" class="mb-4 p-2 border rounded">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>

    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li
        v-for="recipe in paginatedRecipes"
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
            :class="{
              'bg-blue-500 hover:bg-blue-600': recipe.status === 'pending',
              'bg-green-500 hover:bg-green-600': recipe.status === 'completed',
              'text-white': recipe.status === 'pending' || recipe.status === 'completed',
              'text-gray-700': recipe.status === 'completed'
            }"
            class="mt-4 py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            {{ recipe.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending' }}
          </button>
        </div>
      </li>
    </ul>

    <div class="flex items-center space-x-14">
      <button
        @click="currentPage = Math.max(currentPage - 1, 1)"
        class="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"
        :disabled="currentPage === 1"
      >
        Previous
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        @click="currentPage = Math.min(currentPage + 1, totalPages)"
        :disabled="currentPage === totalPages"
        class="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"
      >
        Next
      </button>

      <router-link
        to="/add-recipe"
        class="mt-4 inline-block bg-blue-500 py-2 px-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 rounded"
        >Add New Recipe</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      recipes: [],
      filterStatus: 'all',
      currentPage: 1,
      recipesPerPage: 2 // Adjust as needed for the desired number of recipes per page
    }
  },
  computed: {
    paginatedRecipes() {
      const start = (this.currentPage - 1) * this.recipesPerPage
      const end = start + this.recipesPerPage

      return this.filteredRecipes.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredRecipes.length / this.recipesPerPage)
    },
    filteredRecipes() {
      if (this.filterStatus === 'all') {
        return this.recipes
      }
      return this.recipes.filter((recipe) => recipe.status === this.filterStatus)
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
        })
        .catch((error) => {
          console.error('There was an error fetching the recipes:', error)
        })
    },
    updateStatus(id, currentStatus) {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed'

      axios
        .patch(`http://localhost:3000/recipes/${id}`, {
          status: newStatus
        })
        .then(() => {
          // Find the recipe and update its status directly
          const recipeIndex = this.recipes.findIndex((r) => r.id === id)

          if (recipeIndex !== -1) {
            // Using Vue.set to ensure reactivity is maintained
            this.recipes[recipeIndex] = {
              ...this.recipes[recipeIndex],
              status: newStatus
            }
          }
        })
        .catch((error) => {
          console.error('There was an error updating the recipe:', error)
        })
    }
  }
}
</script>
