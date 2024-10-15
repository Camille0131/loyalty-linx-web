<script setup>
import { ref, onMounted, computed } from "vue";
import { initTabs } from "flowbite";

import { initModals } from "flowbite";
import { defineEmits } from "vue";
import HomeCarousel from "./HomeCard/HomeCarousel.vue";
import Services from "./HomeCard/Services.vue";
import ApplyCreditPath from "../assets/img/home/loan-svgrepo-com.svg";
import PayCreditsPath from "../assets/img/home/pay-per-click-cursor-svgrepo-com.svg";
import CovertPointsPath from "../assets/img/home/exchange-svgrepo-com.svg";
import RedeemPath from "../assets/img/home/gift-svgrepo-com.svg";
import DiscoverDealsPath from "../assets/img/home/open-box-svgrepo-com.svg";
import MorePath from "../assets/img/home/more-horizontal-svgrepo-com.svg";
import HistoryTable from "./HomeCard/HistoryTable.vue";
import Card from "./HomeCard/Card.vue";
import TransactionHistoryModal from "./modal/TransactionHistoryModal.vue";
import MerchantsSelection from "./Credits/MerchantsSelection.vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const creditAmount = JSON.parse(sessionStorage.getItem("u_CRDBAl"));
const router = useRouter();
let merchantData = ref([]);
const merchantEndPoint =
  "https://loyalty-linxapi.vercel.app/api/merchant/get-all";
const userData = JSON.parse(localStorage.getItem("u_data"));

const creditsHistory = ref([]);
creditsHistory.value = userData.transactionHistory;
const formattedCreditAmount = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(creditAmount);
});

onMounted(() => {
  initTabs();
});
const balancesCredits = ref([
  {
    name: "Current credits history",
    label: "Available credits",
    value: formattedCreditAmount,
    id: 1,
  },
]);

const balancesPoints = ref([
  {
    name: "Points earned history",
    label: "Available points",
    value: "2,000.20",
    id: 2,
  },
]);

const servicesItem = ref([
  {
    id: 1,
    name: "Apply Credit",
    path: ApplyCreditPath,
  },
  {
    id: 2,
    name: "Pay Credits",
    path: PayCreditsPath,
  },
  {
    id: 3,
    name: "Convert Points",
    path: CovertPointsPath,
  },
  {
    id: 4,
    name: "Redeem",
    path: RedeemPath,
  },
  {
    id: 5,
    name: "Discover Deals",
    path: DiscoverDealsPath,
  },
  {
    id: 6,
    name: "more",
    path: MorePath,
  },
]);

const creditHistory = ref([
  {
    name: "Money transfer",
    points: "3.5k",
    dateAndTime: "August 2, 2024 : 09:42 p.m",
    action: "Transfer money to (jp amando) ",
  },
  {
    name: "Loan",
    points: 2.2,
    dateAndTime: "August 2, 2024 : 08:27 p.m",
    action: "SM loan express",
  },
  {
    name: "Purchase",
    points: 2.1,
    dateAndTime: "August 4, 2024 : 06:34 a.m",
    action: "Bearbrand (1.5 liter)",
  },
  {
    name: "Purchase",
    points: 1.5,
    dateAndTime: "July 18, 2024 : 07:12 a.m",
    action: "Chicken Nuggets (Pure Foods)",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "August 5, 2024 : 12:00 p.m",
    action: "Sleepers (SM)",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "June 19, 2024 : 02:27 p.m",
    action: "Hotdog (7/11)",
  },
  {
    name: "Redemption",
    points: 3.5,
    dateAndTime: "July 21, 2024 : 05:42 a.m",
    action: "From Groceries",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "August 4, 2024 : 10:21 p.m",
    action: "Keyboard (SM)",
  },
]);
const pointsHistory = ref([
  {
    name: "Points",
    points: 3.5,
    dateAndTime: "August 2, 2024 : 09:42 p.m",
    action: "Chatime (Down Town Market) ",
  },
  {
    name: "Purchase",
    points: 2.2,
    dateAndTime: "August 2, 2024 : 08:27 p.m",
    action: "Chatime (Down Town Market)",
  },
  {
    name: "Purchase",
    points: 2.1,
    dateAndTime: "August 4, 2024 : 06:34 a.m",
    action: "Bearbrand (1.5 liter)",
  },
  {
    name: "Purchase",
    points: 1.5,
    dateAndTime: "July 18, 2024 : 07:12 a.m",
    action: "Chicken Nuggets (Pure Foods)",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "August 5, 2024 : 12:00 p.m",
    action: "Sleepers (SM)",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "June 19, 2024 : 02:27 p.m",
    action: "Hotdog (7/11)",
  },
  {
    name: "Redemption",
    points: 3.5,
    dateAndTime: "July 21, 2024 : 05:42 a.m",
    action: "From Groceries",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "August 4, 2024 : 10:21 p.m",
    action: "Keyboard (SM)",
  },
]);

const props = {
  item: Object,
  index: Number,
  history: Array,
};
const showModal = ref(false);

const unHide = (service) => {
  switch (service.id) {
    case 1:
      applyCredit();
      break;
    case 2:
      payCredits();
      break;
    case 3:
      convertPoints();
      break;
    case 4:
      redeem();
      break;
    case 5:
      discoverDeals();
      break;
    case 6:
      more();
      break;
    default:
      console.error(`Unknown service ID: ${service.id}`);
    // You could also perform some other default action here
  }
};
const applyCredit = () => {
  // Code for applying credit
  showModal.value = true;

  console.log("Applying credit...");
};

const payCredits = () => {
  // Code for paying credits
  router.push({ name: "selection/payment" });
  console.log("Paying credits...");
};

const convertPoints = () => {
  // Code for converting points
  console.log("Converting points...");
};

const redeem = () => {
  // Code for redeeming
  console.log("Redeeming...");
};

const discoverDeals = () => {
  // Code for discovering deals
  console.log("Discovering deals...");
};

const more = () => {
  // Code for more
  console.log("Showing more...");
};

const getAllMerchant = async (token) => {
  try {
    const response = await fetch(merchantEndPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      merchantData.value = data.merchants;
      console.log(data.merchants[0]._id);
      localStorage.setItem("m_data", JSON.stringify(data.merchants));
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.groupEnd(error);
  }
};
const hideModal = () => {
  showModal.value = false;
};

onMounted(async () => {
  const userStore = useUserStore();
  const token = userStore.token;
  await getAllMerchant(token);
});
</script>

<template>
  <div class="container-services">
    <ul
      id="homeCard"
      class="bg-white mx-3 pb-6 rounded-sm flex flex-row justify-evenly"
    >
      <div
        id="tab-options"
        class="mb-4 border-b border-gray-200 dark:border-gray-700 w-11/12"
      >
        <ul
          class="flex flex-wrap flex-row -mb-px text-sm font-medium text-center w-full"
          id="default-styled-tab"
          data-tabs-toggle="#default-styled-tab-content"
          data-tabs-active-classes="text-amber-600 hover:text-amber-600 dark:text-amber-500 dark:hover:text-amber-500 border-amber-600 dark:border-amber-500"
          data-tabs-inactive-classes="dark:border-transparent text-amber-500 hover:text-amber-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
          role="tablist"
        >
          <li class="me-2" role="presentation">
            <button
              class="p-4 border-b-2 rounded-t-lg hover:border-gray-300 dark:hover:text-gray-300"
              id="profile-styled-tab"
              data-tabs-target="#styled-profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              <h2 class="font-bold">Credits</h2>
            </button>
          </li>
          <li class="me-2" role="presentation">
            <button
              class="p-4 border-b-2 rounded-t-lg hover:border-gray-300 dark:hover:text-gray-300"
              id="dashboard-styled-tab"
              data-tabs-target="#styled-dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              <h2 class="font-bold">Points</h2>
            </button>
          </li>
        </ul>
      </div>
      <div id="tab-contents" class="w-full">
        <div
          class="hidden dark:bg-gray-800"
          id="styled-profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <template v-for="balance in balancesCredits" :key="balance.id">
            <div
              class="mx-auto px-2 justify-center rounded-2xl items-center flex flex-col mt-3"
            >
              <Card
                v-for="(balanceItem, index) in balancesCredits"
                :key="index"
                :item="balanceItem"
                :index="index"
                :history="creditsHistory"
              />

              <div class="w-full flex flex-row">
                <HistoryTable id="table" :history="creditHistory" />
              </div>
            </div>
          </template>
        </div>
        <div
          class="hidden dark:bg-gray-800"
          id="styled-dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <template v-for="history in balancesPoints" :key="history.name">
            <div
              class="mx-auto px-2 justify-center rounded-2xl items-center flex flex-col mt-3"
            >
              <Card
                v-for="(balancePoint, index) in balancesPoints"
                :key="index"
                :item="balancePoint"
                :index="index"
                :history="creditsHistory"
              />
              <div class="w-full flex flex-row">
                <HistoryTable id="table" :history="creditsHistory" />
              </div>
            </div>
          </template>
        </div>
      </div>
      <template v-for="balance in balancesCredits" :key="balance.id">
        <div
          id="container"
          class="px-2 justify-center rounded-2xl items-center flex flex-col mt-3"
        >
          <Card
            v-for="(balanceItem, index) in balancesCredits"
            :key="index"
            :item="balanceItem"
            :index="index"
            :history="creditsHistory"
          />

          <div class="w-full flex flex-row">
            <HistoryTable id="table" :history="creditsHistory" />
          </div>
        </div>
      </template>
      <div id="vertical" class="border mt-4"></div>
      <template v-for="history in balancesPoints" :key="history.name">
        <div
          id="container"
          class="px-2 justify-center rounded-2xl items-center flex flex-col mt-3"
        >
          <Card
            v-for="(balancePoint, index) in balancesPoints"
            :key="index"
            :item="balancePoint"
            :index="index"
            :history="creditHistory"
          />
          <div class="w-full flex flex-row">
            <HistoryTable id="table" :history="creditHistory" />
          </div>
        </div>
      </template>
    </ul>
    <Services :services="servicesItem" @serviceClicked="unHide" />
    <!-- <TransactionHistoryModal /> -->

    <div class="mx-3">
      <HomeCarousel />
    </div>
  </div>
  <div class="h-[4rem]"></div>
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

<style>
#default-styled-tab {
  width: 100%;
  justify-content: space-between;
  gap: 0;
}

#default-styled-tab li {
  flex: 1;
}

#default-styled-tab button {
  width: 100%;
  text-align: center;
}

@media (max-width: 1550px) {
  #carousel {
    margin: auto;
    width: 85%;
  }
}
@media (min-width: 1100px) {
  .container-services {
    padding: 0rem 8rem;
  }
}
@media (max-width: 995px) {
  #vertical {
    display: none;
  }
}
@media (max-width: 690px) {
  #homeCard {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #container {
    width: 90%;
    display: none;
  }
}
@media (min-width: 690px) {
  #tab-options {
    display: none;
  }
  #tab-contents {
    display: none;
  }
}
</style>
