<template>
  <ShopNav @search-query="filterProductsBySearch" />

  <div class="max-w-7xl mx-auto p-2 bg-gray-200">
    <!-- Carousel Section for Ads -->
    <div class="mb-2 relative">
      <div
        class="absolute top-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded-md"
      >
        <h2 class="text-white text-2xl font-semibold">Our Deals</h2>
      </div>
      <div class="relative w-full h-64 overflow-hidden rounded-md">
        <div
          class="carousel flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(image, index) in adImages"
            :key="index"
            class="w-full h-64 flex-shrink-0"
          >
            <img
              :src="getImageUrl(image)"
              :alt="`Ad ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <!-- Carousel Navigation Dots -->
        <div
          class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
        >
          <span
            v-for="(image, index) in adImages"
            :key="index"
            class="h-3 w-3 rounded-full cursor-pointer"
            :class="{
              'bg-orange-500': currentSlide === index,
              'bg-gray-300': currentSlide !== index,
            }"
            @click="setCurrentSlide(index)"
          ></span>
        </div>
      </div>
    </div>

    <!-- <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
      Product List
    </h1> -->

    <!-- Credit Score Section -->
    <div class="bg-white p-2 mb-2">
      <div
        class="p-6 rounded-md shadow-md"
        :class="['bg-gradient-to-r', 'from-amber-300', 'to-amber-600']"
      >
        <h2 class="text-2xl font-bold text-amber-800 mb-2">
          {{
            new Intl.NumberFormat("en-PH", {
              style: "decimal",
              minimumFractionDigits: 2,
            }).format(creditsBalance)
          }}
        </h2>
        <h1 class="text-gray-700 font-semibold">Available Credits...</h1>
      </div>
    </div>

    <!-- Scrollable Category Buttons -->
    <div class="bg-white p-2 mb-2 rounded-md">
      <div class="px-2 py-1">
        <h1 class="text-gray-700 font-semibold">CATEGORIES</h1>
      </div>
      <div
        class="overflow-x-auto whitespace-nowrap no-scrollbar flex space-x-2 px-2"
      >
        <button
          v-for="category in categories"
          :key="category._id"
          @click="filterProductsByCategory(category._id)"
          class="px-4 py-2 bg-white border shadow-1 text-gray-700 rounded-md hover:bg-gray-50"
        >
          {{ category.categoryName }}
        </button>
      </div>

      <!-- Loading state -->
      <div
        v-if="loading"
        class="text-center text-lg font-semibold text-gray-600"
      >
        Loading...
      </div>
    </div>

    <!-- No products available message -->
    <div
      v-if="!loading && filteredProducts.length === 0"
      class="text-center text-lg font-semibold text-gray-600"
    >
      No products available.
    </div>

    <!-- Products Grid -->
    <div
      v-if="!loading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-20"
    >
      <div
        v-for="product in filteredProducts"
        :key="product._id"
        class="bg-white p-4 rounded-sm flex flex-col cursor-pointer"
        @click="goToProductDetails(product._id)"
      >
        <img
          v-if="product.image"
          :src="product.image"
          alt="Product Image"
          class="w-full h-40 object-cover rounded-md mb-2"
        />
        <div class="flex-grow">
          <h2 class="text-lg font-bold text-gray-800 mb-1">
            {{ truncateName(product.name) }}
          </h2>
          <p class="text-lg font-bold text-amber-700 mb-2">
            ₱{{ product.price.toFixed(2) }}
          </p>
        </div>
        <!-- Add to Cart button -->
        <button
          @click.stop="addToCart(product)"
          class="bg-amber-100 border border-amber-600 text-white px-4 py-2 rounded hover:bg-orange-200 mt-2"
        >
          <img
            src="../../assets/img/icons/add-to-the-cart-svgrepo-com.svg"
            alt="Cart"
            class="h-6 w-6 inline-block"
          />
          <span class="text-sm text-amber-600">Add to Cart </span>
        </button>
      </div>
    </div>
  </div>
  <!-- <NavBar /> -->
  <BottomNavigation />
</template>

<script>
import Swal from "sweetalert2";
import ShopNav from "../NavBar/ShopNav.vue";
import BottomNavigation from "../NavBar/BottomNavigation.vue";
// import NavBar from "@/components/Navbar/Navbar.vue";

export default {
  computed: {
    truncatedName() {
      return this.product.name.length > 20
        ? this.product.name.substring(0, 20) + "..."
        : this.product.name;
    },
  },
  components: {
    ShopNav,
    BottomNavigation,
    // NavBar,
  },
  data() {
    return {
      token: JSON.parse(localStorage.getItem("token")),
      creditsBalance: JSON.parse(sessionStorage.getItem("u_CRDBAl")),
      products: [],
      filteredProducts: [],
      categories: [],
      loading: true,
      searchQuery: "",
      adImages: ["ad1.jpg", "ad2.jpg", "ad3.jpg", "ad4.jpg"],
      currentSlide: 0,
    };
  },
  async created() {
    await this.fetchProducts();
    await this.fetchCategories();
    this.startCarousel();
  },

  methods: {
    truncateName(text) {
      return text.length > 20 ? text.substring(0, 20) + "..." : text;
      s;
    },
    getImageUrl(image) {
      // return new URL(`../assets/images/ads/${image}`, import.meta.url).href;
      return new URL(`../../assets/img/ads/${image}`, import.meta.url).href;
    },
    goToProductDetails(productId) {
      this.$router.push({ name: "product/details", params: { id: productId } });
    },

    async fetchProducts() {
      try {
        let url = "http://localhost:5000/api/product/products";
        if (this.searchQuery) {
          url += `?searchQuery=${encodeURIComponent(this.searchQuery)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        this.products = data.allProduct.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        this.filteredProducts = this.products;
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching products",
        });
      } finally {
        this.loading = false;
      }
    },
    async fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/category/getAllCategories"
        );
        const data = await response.json();
        this.categories = data.allCategories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch categories",
        });
      }
    },
    filterProductsByCategory(categoryId) {
      this.filteredProducts = this.products.filter(
        (product) => product.categoryId === categoryId
      );
    },
    filterProductsBySearch(query) {
      this.searchQuery = query;
      this.fetchProducts();
    },
    setCurrentSlide(index) {
      this.currentSlide = index;
    },
    startCarousel() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.adImages.length;
      }, 3000);
    },
    // Add to Cart logic
    async addToCart(product) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/add-to-cart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token.token}`,
            },
            body: JSON.stringify({
              productId: product._id,
              quantity: 1,
            }),
          }
        );
        const data = response.json();
        if (response.ok) {
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          const productInCart = cart.find((item) => item._id === product._id);
          if (productInCart) {
            productInCart.quantity += 1; // If product exists, increase the quantity
          } else {
            cart.push({ ...product, quantity: 1, isSelected: false }); // If not, add the product with quantity 1
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          Swal.fire({
            icon: "success",
            title: "Added to Cart",
            text: `${product.name} has been added to your cart!`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "",
            text: `${product.name} has already added to your cart!`,
          });
          // console.log("failed" + data);
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "",
          text: `${error} `,
        });
      }
    },
  },
};
</script>

<style scoped>
/* Add this to your CSS file */
@media only screen and (max-width: 768px) {
  .grid-cols-1.sm\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
