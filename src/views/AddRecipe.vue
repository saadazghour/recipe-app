<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Add a New Recipe</h1>
    <form @submit.prevent="submitRecipe" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Recipe Name</label>
        <input
          type="text"
          placeholder="Recipe Name"
          id="name"
          v-model="recipe.name"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="recipe.description"
          required
          rows="4"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>
      <div>
        <label for="ingredients" class="block text-sm font-medium text-gray-700">Ingredients</label>
        <textarea
          id="ingredients"
          v-model="recipe.ingredients"
          required
          rows="4"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>
      <div>
        <label for="instructions" class="block text-sm font-medium text-gray-700"
          >Preparation Instructions</label
        >
        <textarea
          id="instructions"
          v-model="recipe.instructions"
          required
          rows="4"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          v-model="recipe.status"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label for="image" class="block text-sm font-medium text-gray-700">Recipe Image</label>
        <input
          type="file"
          id="image"
          @change="onFileChange"
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit Recipe
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

import { v4 as uuidv4 } from 'uuid' // Importing the UUID function

export default {
  data() {
    return {
      recipe: {
        id: uuidv4(),
        name: '',
        description: '',
        ingredients: '',
        instructions: '',
        status: 'pending',
        image: null
      }
    }
  },
  methods: {
    submitRecipe() {
      if (this.recipe.image) {
        const formData = new FormData()

        // Append the image file to the FormData object
        formData.append('image', this.recipe.image, this.recipe.image.name)
        // Send the FormData object
        this.sendRecipeData(formData)
      } else {
        // No image to process, send recipe as is
        this.sendRecipeData(this.recipe)
      }
    },

    sendRecipeData(data) {
      axios
        .post('http://localhost:3000/recipes', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Recipe added successfully:', response.data)
          this.resetForm()
          this.$router.push('/')
        })
        .catch((error) => {
          console.error('Error posting the recipe:', error)
        })
    },

    onFileChange(event) {
      this.recipe.image = event.target.files[0]
    },

    resetForm() {
      this.recipe = {
        id: uuidv4(), // Reset with new UUID
        name: '',
        description: '',
        ingredients: '',
        instructions: '',
        status: 'pending',
        image: null
      }
    }
  }
}
</script>

<style scoped>
/* Tailwind CSS is handling most styling, no extra styles needed here */
</style>
