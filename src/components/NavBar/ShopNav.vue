<template>
  <header class="bg-amber-500 shadow-md py-4">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <!-- Search Bar -->
      <div class="flex items-center space-x-4">
        <div>
          <svg
            @click="handleBack"
            fill="#111827"
            class="w-6"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 26.676 26.676"
            xml:space="preserve"
          >
            <g>
              <path
                d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
		c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
		C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
		c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
		C26.18,21.891,26.141,21.891,26.105,21.891z"
              />
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </g>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          class="px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          @input="onSearchInput"
        />
      </div>

      <!-- Icons Section -->
      <div class="flex items-center space-x-6">
        <!-- Shopping Cart with Cart Count -->
        <div class="relative cursor-pointer" @click="goToCart">
          <img
            src="../../assets/img/icons/cart-outline.svg"
            alt="Cart"
            class="h-6 w-6"
          />
          <!-- Cart item count badge -->
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </div>

        <!-- Notifications -->
        <img
          src="../../assets/img/icons/bell-outline.svg"
          alt="Notifications"
          class="h-6 w-6 cursor-pointer"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "HeaderBar",
  data() {
    return {
      cartCount: 0, // This will hold the number of items in the cart
    };
  },
  methods: {
    onSearchInput(event) {
      const query = event.target.value;
      this.$emit("search-query", query);
    },
    goToCart() {
      this.$router.push({ name: "cart" }); // This will navigate to the Cart route
    },
    handleBack() {
      this.$router.back();
    },
    // Load cart count from localStorage
    loadCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total items in the cart
    },
  },
  mounted() {
    this.loadCartCount(); // Load the cart count when the component is mounted
    window.addEventListener("storage", this.loadCartCount); // Listen for changes to the cart in other parts of the app
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.loadCartCount); // Clean up the event listener
  },
};
</script>
