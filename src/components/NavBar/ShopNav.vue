<template>
  <header class="bg-amber-500 shadow-md py-4">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <!-- Search Bar -->
      <div class="flex items-center space-x-4">
        <img
          src="../../assets/images/icons/magnify.svg"
          alt="Search"
          class="h-6 w-6"
        />
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
            src="../../assets/images/icons/cart-outline.svg"
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
      this.$router.push({ name: "Cart" }); // This will navigate to the Cart route
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
