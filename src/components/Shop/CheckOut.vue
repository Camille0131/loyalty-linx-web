<script setup>
import LoadingScreen from "../LoadingScreen/LoadingScreen.vue";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";
const router = useRouter();
const userData = ref();
const address = ref();
const fullName = ref("");
const itemPlaced = ref([]);
const creditBalance = ref("");
const token = ref("");
const email = ref("");
const loading = ref(true);
const items = ref([]);
const price = ref(0);
const pointsBalance = ref(0);

itemPlaced.value = JSON.parse(sessionStorage.getItem("placeOrder"));

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000); // Simulates loading time

  // if (!itemPlaced.value.length == 0) {
  // }
});

(token.value = localStorage.getItem("a_TOK")),
  (creditBalance.value = JSON.parse(sessionStorage.getItem("u_CRDBAl")));
userData.value = JSON.parse(localStorage.getItem("u_data"));
address.value = userData.value.fullAddress;
pointsBalance.value = userData.value.pointsBalance;
email.value = userData.value.email;
const mobileNo = userData.value.mobileNo;
fullName.value = `${userData.value.firstName} ${userData.value.lastName} `;
const isChecked = ref(false);
items.value = itemPlaced.value.item;
price.value = itemPlaced.value.price;
const formattedPhoneNumber = computed(() => {
  const cleanedNumber = mobileNo.replace(/\D/g, "");
  const formattedNumber = `(+63) ${cleanedNumber.slice(
    1,
    5
  )} ${cleanedNumber.slice(5, 11)}`;
  return formattedNumber;
});
const selectedPaymentMethod = ref("");

function getPaymentMethodName(id) {
  const method = paymentMethods.value.find((method) => method.id === id);
  return method ? method.id : "";
}

function handlePayment() {
  // Here you would handle the payment processing based on the selected method
  console.log(
    `Processing payment with ${getPaymentMethodName(
      selectedPaymentMethod.value
    )}`
  );
  // Call the appropriate payment processing function based on selectedPaymentMethod
}
const paymentMethods = ref([
  {
    id: "cod",
    name: "Cash on Delivery",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQggLRgf6WLJyRFBjTmRD0Jbhv4w7Kldw5yeiaDHSvH-Q&s",
  },

  {
    id: "credit_card",
    name: "Credits",
    icon: "https://cdn-icons-png.flaticon.com/512/311/311147.png",
    balance: creditBalance,
  },
  {
    id: "g_cash",
    name: "G cash",
    icon: "data:image/png;base64,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",
  },
]);

const handleSubmit = async () => {
  if (selectedPaymentMethod.value.length == 0) {
    return Swal.fire({
      text: "Please select your payment method?",
      icon: "warning",
      showConfirmButton: false,
      timer: 1000,
    });
  }
  loading.value = true;
  handlePayment();
  try {
    const response = await fetch("http://localhost:5000/api/order/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value} `,
      },
      body: JSON.stringify({
        shippingAddress: `${address.value.address} ${address.value.city} ${address.value.province}`,
        orderAddress: "456 Oak St, Springfield",
        orderEmail: email.value,
        orderDetails: itemPlaced.value.item,
        paymentMethod: getPaymentMethodName(selectedPaymentMethod.value),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        title: "Placed Order !",
        text: "Your Placed Order added to your orders!",
        icon: "success",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          loading.value = false;
          sessionStorage.setItem("orderPlace", JSON.stringify(""));
          router.back();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire({
        text: data.message,
        icon: "warning",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          loading.value = false;
          sessionStorage.setItem("orderPlace", JSON.stringify(""));
          router.back();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const handleBack = () => {
  router.back();
};
</script>
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
        <h1 class="text-2xl font-semibold mx-6">Check Out</h1>
      </div>
    </div>
  </div>
  <LoadingScreen :isLoading="loading" />

  <div v-if="!loading">
    <div class="px-2 py-2 flex items-center justify-center">
      <div
        class="max-w-sm p-3 w-full bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex pb-2">
          <svg
            class="w-7 px-1"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 255.856 255.856"
            xml:space="preserve"
          >
            <g>
              <path
                style="fill: #d32f2f"
                d="M127.928,38.8c-30.75,0-55.768,25.017-55.768,55.767s25.018,55.767,55.768,55.767
		s55.768-25.017,55.768-55.767S158.678,38.8,127.928,38.8z M127.928,135.333c-22.479,0-40.768-18.288-40.768-40.767
		S105.449,53.8,127.928,53.8s40.768,18.288,40.768,40.767S150.408,135.333,127.928,135.333z"
              />
              <path
                style="fill: #d32f2f"
                d="M127.928,0C75.784,0,33.362,42.422,33.362,94.566c0,30.072,25.22,74.875,40.253,98.904
		c9.891,15.809,20.52,30.855,29.928,42.365c15.101,18.474,20.506,20.02,24.386,20.02c3.938,0,9.041-1.547,24.095-20.031
		c9.429-11.579,20.063-26.616,29.944-42.342c15.136-24.088,40.527-68.971,40.527-98.917C222.495,42.422,180.073,0,127.928,0z
		 M171.569,181.803c-19.396,31.483-37.203,52.757-43.73,58.188c-6.561-5.264-24.079-26.032-43.746-58.089
		c-22.707-37.015-35.73-68.848-35.73-87.336C48.362,50.693,84.055,15,127.928,15c43.873,0,79.566,35.693,79.566,79.566
		C207.495,112.948,194.4,144.744,171.569,181.803z"
              />
            </g>
          </svg>
          <p class="text-sm">
            {{ fullName }}
            <span class="text-xs text-gray-400">
              {{ formattedPhoneNumber }}</span
            >
          </p>
        </div>

        <hr class="flex-grow border-t border-gray-300 ml-4 pb-2" />

        <div class="text-gray-500 p-3">
          <p>{{ address.address }}</p>
          <p>{{ address.city }}</p>
          <p>{{ address.province }}</p>
        </div>
      </div>
    </div>

    <div class="flex px-4 justify-center items-center">
      <div
        class="w-full p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex">
          <svg
            class="w-6 px-1"
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
          <h1 class="text-sm">McDo</h1>
          <hr class="flex-grow border-t border-gray-300 ml-2 self-center" />
        </div>

        <!-- Item list -->
        <li
          v-for="(item, index) in items"
          :key="index"
          class="bg-white rounded-lg p-4 flex md:flex-row items-center space-x-4"
        >
          <!-- Product Image (Responsive) -->
          <div class="w-40">
            <img
              :src="item.image"
              alt="Product Image"
              class="w-20 md:w-1/3 object-cover rounded-sm h-auto"
            />
          </div>

          <!-- Product Details (Responsive) -->
          <div class="flex-col ml-0 w-full">
            <div class="w-50">
              <h3 class="name text-gray-800">{{ item.name }}</h3>
            </div>
            <div class="w-50">
              <p class="name text-sm text-gray-500">{{ item.description }}</p>
            </div>
            <div class="pt-4 flex justify-between">
              <p class="text-gray-600 font-semibold">
                <!-- ₱ -->
                {{
                  new Intl.NumberFormat("en-PH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                  }).format(item.price)
                }}
              </p>
              <p class="text-gray-500 text-xs">x {{ item.quantity }}</p>
            </div>
          </div>
        </li>
        <div class="flex justify-between mt-2">
          <p class="text-gray-600">
            Total ({{ items.length }}) item<span v-if="items.length > 1"
              >s</span
            >
          </p>
          {{
            new Intl.NumberFormat("en-PH", {
              style: "decimal",
              minimumFractionDigits: 2,
            }).format(price)
          }}
        </div>
      </div>
    </div>

    <div class="px-4 mt-2">
      <div
        class="w-full p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <label class="flex items-center justify-between cursor-pointer">
          <div class="inline-flex items-center">
            <div>
              <img
                class="w-8"
                src="https://img.icons8.com/?size=512w&id=7165&format=png&color=FD7E14"
                alt=""
              />
            </div>
            <p class="ms-3 text-sm font-sm text-gray-900 dark:text-gray-300">
              Redeem {{ pointsBalance }} Loyalty Points
            </p>
          </div>
          <div>
            <input type="checkbox" value="" class="sr-only peer" />
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"
            ></div>
          </div>
        </label>
      </div>
    </div>

    <!-- Select Payment Method -->
    <div class="px-4 mt-2 mb-22">
      <div
        class="w-full p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <div>
          <h1 class="text-sm text-gray-800">Payment Methods</h1>
        </div>
        <hr class="flex-grow border-t border-gray-300 mt-2 pb-2" />

        <div>
          <form @submit.prevent="handlePayment">
            <div
              v-for="method in paymentMethods"
              :key="method.id"
              class="payment-option p-1"
            >
              <label class="custom-radio flex justify-between">
                <div class="flex items-end">
                  <img class="w-7 mx-1" :src="method.icon" alt="icon" />
                  <p class="text-gray-600">
                    {{ method.name }}
                    <span class="text-sm" v-if="method.balance"
                      >({{
                        new Intl.NumberFormat("en-PH", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                        }).format(method.balance)
                      }}) Available</span
                    >
                  </p>
                </div>

                <input
                  type="radio"
                  :value="method.id"
                  v-model="selectedPaymentMethod"
                />
                <span class="radio-checkmark"></span>
              </label>
            </div>
          </form>
          <!-- <p v-if="selectedPaymentMethod">
            Selected Payment Method:
            {{ getPaymentMethodName(selectedPaymentMethod) }}
          </p> -->
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="fixed bottom-0 left-0 right-0 -top bg-white -card p-2">
      <div class="flex justify-between items-center">
        <div class="flex"></div>
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
              }}
            </span>
          </p>
          <button
            @click="handleSubmit(cart)"
            class="px-4 m-2 py-3 bg-green-500 text-white text-sm rounded-sm hover:bg-green-600"
          >
            Place Order
            <span>
              <!-- ({{ selectedItems.length }}) -->
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-radio {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.custom-radio input {
  display: none; /* Hide the default radio button */
}

.radio-checkmark {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 2px solid #ffb300; /* Border color */
  position: relative;
  margin-right: 10px;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-radio input:checked + .radio-checkmark {
  background-color: #ffb300; /* Background color when checked */
}

.custom-radio input:checked + .radio-checkmark::after {
  content: "\2713"; /* Check icon */
  font-size: 12px;
  color: white; /* Check icon color */
}
</style>
