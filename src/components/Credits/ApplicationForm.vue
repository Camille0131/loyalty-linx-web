<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// const merchant = route.params.merchant;
// 10% Interest Rate
const interestRate = 0.1;
const step = ref("");
getCookieUserIdAsync("u_TOK");

const limit = JSON.parse(sessionStorage.getItem("limit"));

let newLimit = limit;
const merchant = JSON.parse(sessionStorage.getItem("merchantItem"));
const userTok = ref(null);
const newVal = ref("");
const creditBalance = JSON.parse(sessionStorage.getItem("u_CRDBAl"));

handleLimit();
async function handleLimit() {
  if (creditBalance != "") {
    newLimit = limit - creditBalance;
  } else {
    console.log(newLimit);
  }
}

//  Get token from cookies
async function getCookieAsync(name) {
  return new Promise((resolve, reject) => {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(";");
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        resolve(cookie.substring(nameEQ.length, cookie.length));
        return;
      }
    }
    resolve(null); // Return null if the cookie is not found
  });
}

async function getCookieUserIdAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      userTok.value = JSON.parse(decodeURIComponent(cookieValue));
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}
const monthsUsed = ref("2");
const creditAmount = ref("500");
const hideModal = () => {
  sessionStorage.removeItem("merchantItem");
};

const merchantId = merchant?._id;
const urlCreditRequest = `http://localhost:5000/api/user/${merchantId}/request-credit`;
console.log(merchantId);
// Computed property to format the credit amount with currency formatting

// Computed property to format the credit amount with currency formatting
const formattedCreditAmount = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(creditAmount.value);
});

// Computed property to calculate the loan interest based on the selected credit amount
const calculatedInterest = computed(() => {
  return creditAmount.value * interestRate;
});

// Computed property to calculate the total payable (credit + interest)
const totalPayable = computed(() => {
  return +creditAmount.value + calculatedInterest.value; // Convert to number using unary plus
});

const monthlyInstallment = computed(() => {
  if (monthsUsed.value > 0) {
    return totalPayable.value / +monthsUsed.value; // Convert to number using unary plus
  } else {
    return 0;
  }
});
// Format the interest, total payable, and installment for display
const formattedInterest = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(calculatedInterest.value);
});
const formattedLimit = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(newLimit);
});

const formattedTotalPayable = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(totalPayable.value);
});

const formattedInstallment = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(monthlyInstallment.value);
});
watch(monthsUsed, () => {
  const slider = document.querySelector(".term");
  const percentage = ((monthsUsed.value - 2) / (12 - 2)) * 100;
  slider.style.background = `linear-gradient(to right, #FF8F00 ${percentage}%, #FFCA28 ${percentage}%)`;
});

watch(creditAmount, () => {
  const slider = document.querySelector(".amount");
  const percentage = ((creditAmount.value - 500) / (newLimit - 500)) * 100;
  slider.style.background = `linear-gradient(to right, #FF8F00 ${percentage}%, #FFCA28 ${percentage}%)`;
});

const handleCreditRequest = async () => {
  try {
    if (newLimit < 500) {
      Swal.fire({
        title: "Request fail!",
        text: "limit exceed",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          router.replace("/home");
        }
      });
    } else {
      const response = await fetch(urlCreditRequest, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userTok.value}`,
        },
        body: JSON.stringify({
          incomeSource: "Employed",
          incomeSourceAmount: "50,000",
          creditAmount: `${creditAmount.value}`,
          term: `${monthsUsed.value}`,
          monthlyInstallment: monthlyInstallment.value,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // console.log(data);
        Swal.fire({
          title: "Application complete!",
          text: data.message,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            router.replace("/home");
          }
        });
      } else {
        Swal.fire({
          title: "Request fail!",
          text: data.message,
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            router.replace("/home");
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <form class="p-4 md:p-5" @submit.prevent="handleCreditRequest">
      <div class="flex flex-end m-2">
        <button
          @click="hideModal"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <router-link to="/home">
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </router-link>
        </button>
      </div>
      <div class="grid gap-4 mb-4 grid-cols-2">
        <!-- <div class="w-100 py-5">
          <h2 class="mx-auto font-bold text-center text-xl">
            Application From
          </h2>
        </div> -->

        <div class="col-span-2">
          <div
            class="flex justify-center items-center b p-2 rounded-xl shadow-1 bg-white"
          >
            <div class="w-15 mr-2">
              <img
                :src="merchant?.profilePicture"
                alt=""
                class="rounded-full"
              />
            </div>
            <h2 class="font-bold text-2xl text-gray-700">
              {{ merchant?.storeName }}
            </h2>
          </div>
        </div>

        <div class="col-span-2 mt-8">
          <h1 class="font-bold text-gray-800 text-2xl">Installment Details</h1>
        </div>
        <div class="col-span-2 mt-8 sm:col-span-1">
          <label
            for="term"
            class="block mb-2 text-md font-medium text-gray-700 dark:text-white"
            >ORDER VALUE</label
          >

          <div class="w-full max-w-md mx-auto mt-4 px-2">
            <div class="flex justify-between items-center mb-2">
              <!-- <span class="text-sm font-medium text-gray-700"
                >Select Duration</span
              > -->
              <span class="text-2xl font-bold text-gray-700"
                >{{ formattedCreditAmount }}
              </span>
            </div>

            <!-- Slider Input with colored background -->
            <input
              id="amount"
              type="range"
              v-model="creditAmount"
              min="500"
              :max="newLimit"
              step="100"
              class="w-full h-2 bg-transparent appearance-none cursor-pointer slider amount"
            />
            <div class="flex justify-between mt-2 text-sm text-gray-600">
              <span>500</span>
              <span>{{ formattedLimit }}</span>
            </div>
            <div class="flex justify-between mt-2 text-sm text-gray-600">
              <!-- Displaying calculated interest -->
              <div class="mt-4">
                <p class="text-sm font-medium text-gray-700">
                  Interest (10%): {{ formattedInterest }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-2 mt-8">
          <label
            for="term"
            class="block mb-2 text-md font-medium text-gray-700 dark:text-white"
            >INSTALLATION TERM</label
          >
          <div class="w-full max-w-md mx-auto mt-4 px-2">
            <div class="flex justify-between items-center mb-2">
              <!-- <span class="text-sm font-medium text-gray-700"
                >Select Duration</span
              > -->
              <span class="text-2xl font-bold text-gray-700"
                >{{ monthsUsed }} month<span v-if="monthsUsed > 1"
                  >s</span
                ></span
              >
            </div>

            <!-- Slider Input with colored background -->
            <input
              id="term"
              type="range"
              v-model="monthsUsed"
              min="2"
              max="12"
              step="1"
              class="w-full h-2 bg-transparent appearance-none cursor-pointer slider term"
            />

            <div class="flex justify-between mt-2 text-sm text-gray-600">
              <span>2 Month</span>
              <span>12 Months</span>
            </div>
          </div>
        </div>
      </div>
      <div class="py-10 mx-8 rounded-md my-4 bg-white">
        <div>
          <h1 class="text-md text-center font-semibold text-gray-500">
            Installment Amount
          </h1>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-bold text-indigo-900 text-center">
            {{ formattedInstallment }}
          </p>
        </div>
        <p class="text-center text-sm font-semibold text-blue-900">
          {{ monthsUsed }}x installment
        </p>
        <div class="px-6 mt-8">
          <button
            type="submit"
            class="w-full py-3 px-4 text-lg tracking-wide rounded-full text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
          >
            CONTINUE
          </button>
          <button
            class="w-full py-3 px-4 text-lg tracking-wide rounded-full mt-5 text-white bg-white border border-amber-700 hover:bg-gray-200 focus:outline-none"
          >
            <router-link to="/home">
              <h1 class="text-amber-600">CANCEL</h1>
            </router-link>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
body {
  background-color: #f4f7f7f7;
}

input[type="range"].term {
  -webkit-appearance: none; /* Removes default slider styling */
  appearance: none;
  width: 100%;
  height: 8px; /* Adjusts the height of the slider track */
  background: linear-gradient(
    to right,
    #ff8f00 0%,
    #ffd54f 0%
  ); /* Default gradient */
  border-radius: 999px; /* Makes the slider track fully rounded */
  outline: none;
  transition: background 0.15s ease-in-out;
}

/* Custom styles for the slider thumb (range button) */
input[type="range"].term::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 2rem; /* Adjust this to make the thumb wider */
  height: 1rem; /* Adjust height as needed */
  background-color: white; /* Color of the slider thumb */
  border: 1px solid #ff8f00;
  border-radius: 8px; /* Makes the thumb rounded */
  cursor: pointer;
  transition: background 0.15s ease-in-out;
}

input[type="range"].term::-moz-range-thumb {
  width: 24px; /* Adjust this to make the thumb wider */
  height: 16px; /* Adjust height as needed */
  background-color: #ff8f00;
  border-radius: 8px;
  cursor: pointer;
}

input[type="range"].amount {
  -webkit-appearance: none; /* Removes default slider styling */
  appearance: none;
  width: 100%;
  height: 8px; /* Adjusts the height of the slider track */
  background: linear-gradient(
    to right,
    #ff8f00 0%,
    #ffd54f 0%
  ); /* Default gradient */
  border-radius: 999px; /* Makes the slider track fully rounded */
  outline: none;
  transition: background 0.15s ease-in-out;
}

/* Custom styles for the slider thumb (range button) */
input[type="range"].amount::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 2rem; /* Adjust this to make the thumb wider */
  height: 1rem; /* Adjust height as needed */
  background-color: white; /* Color of the slider thumb */
  border: 1px solid #ff8f00;
  border-radius: 8px; /* Makes the thumb rounded */
  cursor: pointer;
  transition: background 0.15s ease-in-out;
}

input[type="range"].amount::-moz-range-thumb {
  width: 24px; /* Adjust this to make the thumb wider */
  height: 16px; /* Adjust height as needed */
  background-color: #ff8f00;
  border-radius: 8px;
  cursor: pointer;
}
</style>
