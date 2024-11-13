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
    </div>
  </div>

  <div class="container mx-auto px-4 pb-8">
    <!-- Cart Items with Merchant (Shop) Name -->
    <div v-if="cart.length > 0">
      <div v-for="shop in shops" :key="shop.name" class="mb-2 pb-10">
        <!-- Shop Name (Merchant) -->
        <div class="flex items-center justify-between mb-4 pt-2">
          <svg
            class="w-7 px-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 22H3"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M19 22V15"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M5 22V15"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M16.5278 2H7.47214C6.26932 2 5.66791 2 5.18461 2.2987C4.7013 2.5974 4.43234 3.13531 3.89443 4.21114L2.49081 7.75929C2.16652 8.57905 1.88279 9.54525 2.42867 10.2375C2.79489 10.7019 3.36257 11 3.99991 11C5.10448 11 5.99991 10.1046 5.99991 9C5.99991 10.1046 6.89534 11 7.99991 11C9.10448 11 9.99991 10.1046 9.99991 9C9.99991 10.1046 10.8953 11 11.9999 11C13.1045 11 13.9999 10.1046 13.9999 9C13.9999 10.1046 14.8953 11 15.9999 11C17.1045 11 17.9999 10.1046 17.9999 9C17.9999 10.1046 18.8953 11 19.9999 11C20.6373 11 21.205 10.7019 21.5712 10.2375C22.1171 9.54525 21.8334 8.57905 21.5091 7.75929L20.1055 4.21114C19.5676 3.13531 19.2986 2.5974 18.8153 2.2987C18.332 2 17.7306 2 16.5278 2Z"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
          <h2 class="text-xl font-semibold">McDo</h2>
          <hr class="flex-grow border-t border-gray-300 ml-4" />
        </div>

        <!-- Cart Items -->
        <li
          v-for="(item, index) in shop.items"
          :key="index"
          class="bg-white border rounded-lg p-4 flex md:flex-row items-center space-x-4 mb-2"
        >
          <div class="">
            <input
              class="selected-checkbox inline-block w-6 rounded-sm h-6"
              :class="{
                'selected-checkbox': allSelected,
              }"
              type="checkbox"
              :id="`checkbox-${index}`"
              :checked="allSelected"
              :v-model="selectedItems"
              @change="handleSelectChange(item)"
            />
          </div>

          <!-- Product Image (Responsive) -->
          <div class="w-40" @click="goToProductDetails(item.productId)">
            <img
              :src="item.image"
              alt="Product Image"
              class="w-20 md:w-1/3 object-cover rounded-sm h-auto"
            />
          </div>

          <!-- Product Details (Responsive) -->
          <div class="flex-col ml-0">
            <h3 class="">{{ item.name }}</h3>
            <p class="text-amber-600 font-semibold">
              <!-- ₱ -->
              {{
                new Intl.NumberFormat("en-PH", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                }).format(item.price)
              }}
            </p>

            <!-- Quantity Control -->
            <div class="flex items-center mt-2 w-full">
              <button
                @click="updateQuantity(item.productId, 'decrease', item)"
                class="px-2 bg-gray-300 border text-gray-700 rounded-l"
              >
                -
              </button>
              <div class="w-10">
                <p
                  type="text"
                  class="text-center py-1 border text-xs border-gray-300 focus:outline-none"
                  readonly
                >
                  {{ item.quantity }}
                </p>
              </div>
              <button
                @click="updateQuantity(item.productId, 'increase', item)"
                class="px-2 bg-gray-300 border text-gray-700 rounded-r"
              >
                +
              </button>
              <button
                @click="removeFromCart(item.productId)"
                class="px-4 py-2 text-sm bg-[#b91c1c] ml-3 text-gray-50 hover:bg-[#991b1b] rounded-sm self-end md:self-start"
              >
                Delete
              </button>
            </div>
          </div>

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
      class="fixed bottom-0 left-0 right-0 shadow-top bg-white shadow-card p-2"
    >
      <div class="flex justify-between items-center">
        <div class="flex">
          <h1 class="px-2">All</h1>
          <input
            class="selected-checkbox inline-block w-6 rounded-sm h-6"
            :class="{
              'selected-checkbox': allSelected,
            }"
            type="checkbox"
            :checked="allSelected"
            :v-model="selectedItems"
            @change="toggleSelectAll"
          />
        </div>
        <div class="flex items-center">
          <p class="text-md">
            Total:
            <span class="font-semibold text-amber-600">
              <!-- ₱ -->
              {{
                new Intl.NumberFormat("en-PH", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                }).format(price)
              }}</span
            >
          </p>
          <button
            @click="handleSubmit(cart)"
            class="px-4 m-2 py-3 bg-green-500 text-white text-sm rounded-sm hover:bg-green-600"
          >
            Check Out
            <span v-if="selectedItems.length"
              >({{ selectedItems.length }})</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      cart: [],
      shops: [],
      selectedItems: [],
      token: JSON.parse(localStorage.getItem("token")),
      allSelected: false,
    };
  },
  computed: {
    price() {
      return this.selectedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },

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
          console.log(data);
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

    async updateQuantity(productId, action, item) {
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
          const itemIndex = this.selectedItems.findIndex(
            (selectedItem) => selectedItem.name === item.name
          );
          if (itemIndex !== -1) {
            // Update the quantity based on action
            this.selectedItems[itemIndex].quantity +=
              action === "increase" ? 1 : -1;
          }
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }

      this.loadCart();
    },

    generateCode(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let code = "";
      for (let i = 0; i < length; i++) {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return code;
    },
    //Handle CheckOut Submit
    async handleSubmit() {
      // const selectedItems = Object.keys(this.selectedItems).filter(
      //   (key) => this.selectedItems[key]
      // );
      // console.log(selectedItems);

      console.log(this.selectedItems);

      try {
        if (this.selectedItems.length) {
          const newSelectedItem = {
            item: this.selectedItems,
            price: this.price,
          };
          sessionStorage.setItem("placeOrder", JSON.stringify(newSelectedItem));
          this.$router.push({
            name: "check-out",
            params: { id: this.generateCode(18) },
          });
        } else {
          Swal.fire({
            icon: "info",
            text: "You have not selected any items for checkout",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    // //Toggle all
    toggleSelectAll() {
      // Set all items' selected property based on allSelected
      this.selectedItems.forEach((item) => {
        item.selected = this.allSelected;
      });
      console.log(this.selectedItems);
    },

    //Handle Select Item
    handleSelectChange(item) {
      const itemIndex = this.selectedItems.findIndex(
        (selectedItem) => selectedItem.name === item.name
      );
      if (itemIndex !== -1) {
        // Item is found, remove it from selectedItems
        this.selectedItems.splice(itemIndex, 1);
      } else {
        // Item is not found, add it to selectedItems
        const newItem = {
          ...item,
          selected: true,
        };
        this.selectedItems.push(newItem);
      }
      // Optional: Log the updated selectedItems
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
          const selectedItem = this.selectedItems.filter(
            (item) => item.productId === productId
          );
          if (selectedItem) {
            this.selectedItems = this.selectedItems.filter(
              (item) => item.productId !== productId
            );
          }
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
.shadow-top {
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); /* Adjust values as needed */
}
.selected-checkbox:focus {
  outline-color: #ff8f00;
}
.selected-checkbox:checked {
  accent-color: #ff8f00; /* change the color of the checkbox */
  background-color: #ff8f00;
}
</style>
