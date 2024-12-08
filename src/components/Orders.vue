<template>
  <div class="bg-gray-100 min-h-screen mb-15 p-4">
    <div class="flex items-center">
      <button
        @click="handleBack"
        class="flex items-center gap-2 text-gray-700 bg-white border hover:bg-gray-300 px-3 py-1 rounded-md shadow-sm"
      >
        <svg
          fill="currentColor"
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M10.828 12l4.95-4.95-1.414-1.414L7 12l7.364 7.364 1.414-1.414z"
          />
        </svg>
        Back
      </button>
    </div>
    <!-- Header -->

    <!-- Orders List -->
    <div class="mt-4">
      <div
        v-for="order in userOrders"
        :key="order.id"
        class="bg-white rounded-lg p-4 mb-4 shadow-sm border"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-700"></h2>
          <span
            :class="orderStatusClass(order.status)"
            class="px-2 py-1 rounded-lg text-sm font-medium"
          >
            {{ order.order_status }}
          </span>
        </div>
        <!-- Slidable Product Images -->
        <div class="w-full md:w-40 overflow-x-auto flex space-x-2 mt-2">
          <div
            v-for="(image, index) in order.orderDetails"
            :key="index"
            class="flex-shrink-0"
          >
            <img
              :src="image.image"
              alt="Product Image"
              class="w-20 h-20 object-cover rounded-md border p-1"
            />
          </div>
        </div>

        <p class="text-gray-600 mt-2">
          Date order:
          {{
            new Intl.DateTimeFormat("en-PH", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(order.order_date))
          }}
        </p>
        <p class="text-gray-600">Total: {{ order.grand_price }}</p>
        <div>
          <Accordion :order="order" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "./Accordion/Accordion.vue";
import VueCarousel from "@chenfengyuan/vue-carousel";

export default {
  components: {
    Accordion,
    VueCarousel,
  },
  data() {
    return {
      userData: null,
      userOrders: null,
    };
  },
  mounted() {
    const storedItem = localStorage.getItem("u_data");
    if (storedItem) {
      try {
        this.userData = JSON.parse(storedItem);
        this.userOrders = this.userData.orders;
      } catch (error) {
        console.error("Error parsing localStorage item:", error);
        this.localItem = storedItem; // Fallback if not JSON
      }
    }
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    viewOrder(order) {
      sessionStorage.setItem("orderDetails", JSON.stringify(order));
    },
    orderStatusClass(status) {
      switch (status) {
        case "Pending":
          return "bg-yellow-200 text-yellow-800";
        case "Shipped":
          return "bg-blue-200 text-blue-800";
        case "Delivered":
          return "bg-green-200 text-green-800";
        default:
          return "bg-gray-200 text-gray-800";
      }
    },
  },
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  overflow: hidden;
  margin-top: 1rem;
}
.carousel-slide {
  width: 100%;
  display: flex;
  justify-content: center;
}
.carousel-slide img {
  max-width: 100%;
  height: auto;
}
</style>
