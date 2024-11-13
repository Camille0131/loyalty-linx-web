<template>
  <div class="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <!-- Display Product Details -->

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

    <div v-if="product">
      <!-- Product Image -->
      <img
        :src="product.image"
        alt="Product Image"
        class="w-full h-64 object-cover rounded-md mb-4"
      />
      <!-- Product Information -->
      <div class="flex flex-col sm:flex-row justify-between">
        <div class="flex-grow">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            {{ product.name }}
          </h1>
          <p class="text-xl font-bold text-orange-600 mb-4">
            Price: ${{ product.price.toFixed(2) }}
          </p>
          <p class="text-gray-700 mb-2">{{ product.description }}</p>
          <p class="text-sm text-gray-500 mb-2">
            Quantity: {{ product.quantity }}
          </p>
          <p class="text-sm text-gray-500 mb-2">
            Weight: {{ product.weight }} kg
          </p>
          <p class="text-sm text-gray-500 mb-2">
            Location: {{ product.location }}
          </p>
        </div>
        <div class="text-center sm:text-right mt-4 sm:mt-0"></div>
      </div>

      <!-- Merchant Information -->
      <div v-if="merchant" class="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 class="text-xl font-semibold text-gray-800">Seller Information</h2>
        <p class="text-gray-700">
          <strong>Store Name:</strong> {{ merchant.storeName }}
        </p>
        <p class="text-gray-700">
          <strong>Mobile Number:</strong> {{ merchant.mobileNo }}
        </p>
        <p class="text-gray-700">
          <strong>Email:</strong> {{ merchant.email }}
        </p>
      </div>

      <!-- Rating/Comment Section -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold text-gray-800">
          Ratings and Comments
        </h2>
        <div class="bg-gray-100 p-4 rounded-lg mt-4">
          <p class="text-gray-700 mb-4">
            No comments or ratings available yet.
          </p>
          <button
            class="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-blue-600"
          >
            Leave a Comment or Rating
          </button>
        </div>
      </div>
    </div>

    <!-- Recommended Products Section -->
    <div v-if="recommendedProducts.length" class="mt-10">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        Recommended Products
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="recommendedProduct in recommendedProducts"
          :key="recommendedProduct._id"
          class="bg-white p-4 rounded-lg shadow-md flex flex-col"
        >
          <img
            :src="recommendedProduct.image"
            alt="Recommended Product Image"
            class="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 class="text-lg font-semibold text-gray-800">
            {{ recommendedProduct.name }}
          </h3>
          <p class="text-sm text-gray-600 mb-2">
            Price: ${{ recommendedProduct.price.toFixed(2) }}
          </p>
          <button
            class="mt-auto bg-orange-400 text-white px-3 py-2 rounded-lg hover:bg-green-600"
            @click="goToProductDetails(recommendedProduct._id)"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- Loading and Error States -->
    <div v-if="loading" class="text-center mt-4">Loading...</div>
    <div
      v-if="!loading && !product"
      class="text-center text-lg text-red-500 mt-4"
    >
      Product not found.
    </div>
  </div>
  <BottomNavigation />
</template>

<script>
import BottomNavigation from "../NavBar/BottomNavigation.vue";

export default {
  components: { BottomNavigation },
  data() {
    return {
      product: null,
      merchant: null, // Store merchant info
      recommendedProducts: [],
      loading: true,
    };
  },
  async created() {
    const productId = this.$route.params.id;
    await this.fetchProductDetails(productId);
    await this.fetchRecommendedProducts();
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(newId) {
        this.fetchProductDetails(newId);
        this.fetchRecommendedProducts();
      },
    },
  },
  methods: {
    handleBack() {
      this.$router.back();
    },

    async fetchProductDetails(id) {
      this.loading = true;
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`);
        const data = await response.json();
        this.product = data;

        if (data.merchant_id) {
          await this.fetchMerchantDetails(data.merchant_id); // Fetch merchant info
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchMerchantDetails(merchantId) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/merchant/${merchantId}`
        );
        const merchantData = await response.json();
        this.merchant = merchantData;
      } catch (error) {
        console.error("Error fetching merchant details:", error);
      }
    },
    async fetchRecommendedProducts() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/products"
        );
        const data = await response.json();
        // Filter out the current product from recommended products
        this.recommendedProducts = data.allProduct
          .filter((item) => item._id !== this.$route.params.id)
          .slice(0, 4); // Display 4 random products
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    },
    goToProductDetails(productId) {
      this.$router.push({ name: "product/details", params: { id: productId } });
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .product-info {
    flex-direction: column;
  }
}
</style>
