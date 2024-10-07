// FilterComponent.vue
<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  options: Array,
  selectedOption: String,
});

const isOpen = ref(false);
const emit = defineEmits(["update:selectedOption"]);

function selectOption(option) {
  emit("update:selectedOption", option);
  isOpen.value = false;
}
</script>
<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {{ selectedOption || "Select an option" }}
      <svg
        class="ml-2 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 10.586 7.707 13.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="origin-top-right absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <button
          v-for="option in options"
          :key="option"
          @click="
            selectOption(option);
            isOpen = false;
          "
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>
