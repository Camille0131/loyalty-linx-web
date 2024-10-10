<template>
  <div class="p-5 flex bg-amber-500">
    <div class="flex">
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
      <div>
        <h1 class="text-2xl font-semibold mx-6">Shopping Cart</h1>
      </div>
    </div>

    <div class="flex justify-between">
      <div class="px-2">
        <button>Edit</button>
      </div>
      <div>
        <h2>Message</h2>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 pb-8">
    <!-- Cart Items with Merchant (Shop) Name -->
    <div v-if="cart.length > 0">
      <div v-for="shop in shops" :key="shop.name" class="mb-8">
        <!-- Shop Name (Merchant) -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">{{ shop.name }}</h2>
          <hr class="flex-grow border-t border-gray-300 ml-4" />
        </div>

        <!-- Cart Items -->
        <li
          v-for="(item, index) in shop.items"
          :key="item._id"
          class="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center space-x-4 mb-6"
        >
          <div class="w-90 pl-3 pb-3">
            <input
              class="selected-checkbox inline-block w-6 rounded-sm h-6"
              :class="{
                'selected-checkbox': isSelected,
              }"
              type="checkbox"
              :id="`checkbox-${index}`"
              :checked="isSelected"
              :v-model="selectedItems"
              @change="handleSelectChange(item)"
            />
          </div>

          <!-- Product Image (Responsive) -->
          <img
            :src="item.image"
            alt="Product Image"
            class="w-full md:w-1/3 h-40 object-cover rounded-sm"
          />

          <!-- Product Details (Responsive) -->
          <div class="flex-1 md:ml-4">
            <h3 class="text-lg font-semibold">{{ item.name }}</h3>
            <p class="text-gray-500">Price: ₱{{ item.price.toFixed(2) }}</p>

            <!-- Quantity Control -->
            <div class="flex items-center mt-2">
              <button
                @click="updateQuantity(item.productId, 'decrease')"
                class="px-3 py-1 bg-gray-300 text-gray-700 rounded-l"
              >
                -
              </button>
              <input
                type="text"
                v-model="item.quantity"
                class="w-12 text-center border border-gray-300 focus:outline-none mx-2"
                readonly
              />
              <button
                @click="updateQuantity(item.productId, 'increase')"
                class="px-3 py-1 bg-gray-300 text-gray-700 rounded-r"
              >
                +
              </button>
            </div>
          </div>
          <button
            @click="removeFromCart(item.productId)"
            class="px-4 py-2 bg-[#b91c1c] text-gray-50 hover:bg-[#991b1b] rounded-lg self-end md:self-start"
          >
            Delete
          </button>

          <!-- Remove Button -->
        </li>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center">
      <p class="text-xl text-gray-500">Your cart is empty.</p>
    </div>

    <!-- Sticky Total and Checkout -->
    <div
      v-if="cart.length > 0"
      class="fixed bottom-0 left-0 right-0 bg-amber-500 shadow-md p-4"
    >
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">Total: ₱{{ totalPrice.toFixed(2) }}</p>
        <button
          @click="handleSubmit(cart)"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      shops: [],
      selectedItems: [],
      token: JSON.parse(localStorage.getItem("token")),
      isSelected: false,
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  async created() {
    await this.loadCart();
  },
  methods: {
    async loadCart() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/get-item-cart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token.token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          this.cart = data;
          this.groupItemsByShop(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }

      // const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    },

    handleBack() {
      this.$router.back();
    },
    goToProductDetails(productId) {
      this.$router.push({ name: "product/details", params: { id: productId } });
    },
    groupItemsByShop(cartItems) {
      const shopGroups = {};
      cartItems.forEach((item) => {
        if (!shopGroups[item.shopName]) {
          shopGroups[item.shopName] = [];
        }
        shopGroups[item.shopName].push(item);
      });
      this.shops = Object.keys(shopGroups).map((name) => ({
        name,
        items: shopGroups[name],
      }));
    },

    async updateQuantity(productId, action) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/quantity-item-cart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token.token}`,
            },
            body: JSON.stringify({
              productId: productId,
              action: action,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
        } else {
          console.log(data);
          console.log("Failed");
        }
      } catch (error) {
        console.log(error);
      }

      this.loadCart();
    },

    //Handle CheckOut Submit
    async handleSubmit(item) {
      const selectedItems = Object.keys(this.selectedItems).filter(
        (key) => this.selectedItems[key]
      );
      console.log(selectedItems);

      try {
        console.log("Checkout selected items:", this.selectedItems);
      } catch (error) {
        console.log(error);
      }
    },

    //Handle Select Item
    handleSelectChange(item) {
      const newItem = {
        ...item,
        isSelected: true,
      };
      this.selectedItems.push(newItem);
    },

    async removeFromCart(productId) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/delete-item-cart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token.token}`,
            },
            body: JSON.stringify({
              productId: productId,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          const cart = this.cart.filter((item) => item._id !== productId);
          localStorage.setItem("cart", JSON.stringify(cart));
          this.loadCart();
        } else {
          console.log(data);
          console.log("Failed");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.selected-checkbox:focus {
  outline-color: #ff8f00;
}
.selected-checkbox:checked {
  accent-color: #ff8f00; /* change the color of the checkbox */
  background-color: #ff8f00;
}
</style>
