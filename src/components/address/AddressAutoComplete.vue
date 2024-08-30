<template>
  <div>
    <input
      type="text"
      v-model="query"
      placeholder="Enter address"
      @input="fetchSuggestions"
    />
    <ul v-if="suggestions.length">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion.display_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const query = ref("");
    const suggestions = ref([]);

    const fetchSuggestions = async () => {
      if (query.value.length < 3) {
        suggestions.value = [];
        return;
      }

      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query.value,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );

        suggestions.value = response.data;
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const selectSuggestion = (suggestion) => {
      query.value = suggestion.display_name;
      suggestions.value = [];
      // Handle selected suggestion details here
    };

    return {
      query,
      suggestions,
      fetchSuggestions,
      selectSuggestion,
    };
  },
};
</script>

<style>
/* Add any styling you need here */
ul {
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
