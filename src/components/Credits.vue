<script setup>
import { ref, onMounted, computed } from "vue";
import PointsCard from "./PointsCard/PointsCard.vue";
import PointsHistory from "./PointsCard/PointsHistory.vue";
import Services from "./HomeCard/Services.vue";
import ApplyCreditPath from "../assets/img/credits/invoice-apply-line-svgrepo-com.svg";
import PayCreditsPath from "../assets/img/credits/pay-pal-paypal-payments-platform-svgrepo-com.svg";
import StatusIcon from "../assets/img/credits/status-up-svgrepo-com.svg";
import jollibee from "../assets/img/merchants/jollibee.png";
import mcdo from "../assets/img/merchants/mcdo.png";
import amazon from "../assets/img/merchants/amazon.png";
import super8 from "../assets/img/merchants/super8.jpg";
import sm from "../assets/img/merchants/sm.png";
import walmart from "../assets/img/merchants/walmart.png";
import MerchantsSelection from "./Credits/MerchantsSelection.vue";
import { useUserStore } from "../stores/user";
import Merchants from "./merchants/Merchants.vue";
import { useRouter } from "vue-router";
const merchantEndPoint =
  "https://loyalty-linxapi.vercel.app/api/merchant/get-all";

const router = useRouter();
let merchantData = ref([]);
let isMerchantDataFetched = ref(false); // Flag to track whether merchant data has been fetched
const userProfile = ref([]);
const credits = ref("");
const creditsReq = ref("");
const limit = ref("");
const newLimit = ref(0);
const used = ref("");

userProfile.value = JSON.parse(localStorage.getItem("u_data"));
getCookieUserProfileAsync("u_PRO");
getCookieUserCredsAsync("userCred");
getCookieUserCredReqsAsync("u_CREDREQ");

onMounted(async () => {
  const userStore = useUserStore();
  const token = userStore.token;
  // if (!JSON.parse(localStorage.getItem("merchants"))) {
  //   await getAllMerchant(token);
  //   isMerchantDataFetched.value = true;
  // }
  used.value = userProfile.value.balance;
  sessionStorage.setItem("u_CRDBAl", JSON.stringify(userProfile.value.balance));
  limit.value = userProfile.value.limit;
  newLimit.value = limit.value - used.value;

  sessionStorage.setItem("limit", JSON.stringify(userProfile.value.limit));
});

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
async function getCookieUserProfileAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      userProfile.value = JSON.parse(decodeURIComponent(cookieValue));
    } else {
      // console.log("userProfile cookie not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}
async function getCookieUserCredsAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      credits.value = JSON.parse(decodeURIComponent(cookieValue));
    } else {
      // console.log("userProfile cookie not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}
async function getCookieUserCredReqsAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      creditsReq.value = JSON.parse(decodeURIComponent(cookieValue));
      sessionStorage.setItem(
        "u_CRDRQ",
        JSON.stringify(JSON.parse(decodeURIComponent(cookieValue)))
      );
      // console.log(JSON.parse(decodeURIComponent(cookieValue)));

      console.log();
    } else {
      // console.log("userProfile cookie not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}

// const getAllMerchant = async (token) => {
//   try {
//     const response = await fetch(merchantEndPoint, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (response.ok) {
//       const data = await response.json();
//       console.log("fecth");
//       localStorage.setItem("merchants", JSON.stringify(data.merchants));
//     } else {
//       const data = await response.json();
//       console.log(data);
//     }
//   } catch (error) {
//     console.groupEnd(error);
//   }
// };

merchantData.value = JSON.parse(localStorage.getItem("m_data"));
const balances = ref([
  {
    balanceItems: [
      {
        label: "Available balance",
        value: newLimit,
        id: 1,
        progress: true,
        max: limit,
        used: used,
      },
    ],
  },
]);
const brandDatas = ref([
  {
    name: "Security Social System",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    name: "TwitterS",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    name: "GithFub",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
]);

const servicesItem = ref([
  {
    id: 1,
    name: "Apply",
    path: ApplyCreditPath,
  },
  {
    id: 2,
    name: "Pay",
    path: PayCreditsPath,
  },
  {
    id: 3,
    name: "Loan Status",
    path: StatusIcon,
  },
]);

const merchantsGroup = ref([
  {
    name: "jollibee",
    id: 1,
    path: jollibee,
  },
  {
    name: "mcdonalds",
    id: 2,
    path: mcdo,
  },
  {
    name: "amazon",
    id: 3,
    path: amazon,
  },
  {
    name: "super8",
    id: 4,
    path: super8,
  },
  {
    name: "SM",
    id: 5,
    path: sm,
  },
  {
    name: "walmart",
    id: 6,
    path: walmart,
  },
]);
const showModal = ref(false);

const servicesFunctions = (service) => {
  switch (service.id) {
    case 1:
      applyCredit();
      break;
    case 2:
      payCredits();
      break;
    case 3:
      loanStatus();
      break;

    default:
      console.error(`Unknown service ID: ${service.id}`);
    // You could also perform some other default action here
  }
};

const applyCredit = () => {
  showModal.value = true;
};

const payCredits = () => {
  router.push({ name: "selection/payment" });
};

const loanStatus = () => {
  router.push({ name: "loan/status" });
};

const hideModal = () => {
  showModal.value = false;
};
</script>

<template>
  <template v-for="balance in balances" :key="balance.id">
    <ul class="flex flex-row justify-evenly">
      <PointsCard
        v-for="(balanceItem, index) in balance.balanceItems"
        :key="index"
        :item="balanceItem"
        :index="index"
      />
    </ul>
  </template>
  <Services :services="servicesItem" @serviceClicked="servicesFunctions" />
  <div class="pb-22" v-if="merchantData">
    <Merchants :item="merchantData" />
  </div>
  <div>
    <div
      :class="{ hidden: !showModal }"
      tabindex="-1"
      class="flex bg-gray-700 bg-opacity-70 overflow-y-auto overflow-x-hidden my-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="bg-white rounded-sm shadow dark:bg-gray-700 h-[40rem]">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Choose merchants
            </h3>
            <button
              @click="hideModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
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
            </button>
          </div>
          <!-- Modal body -->
          <div class="py-5 scrollbar-width-thin">
            <MerchantsSelection class="my-auto" :item="merchantData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
