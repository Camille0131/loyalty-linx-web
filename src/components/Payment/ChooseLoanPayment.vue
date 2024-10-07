<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userData = JSON.parse(localStorage.getItem("u_data"));

const credits = ref([]);
credits.value = userData.creditRequests;

onMounted(() => {
  handleUnpaidStatus();
});

const today = new Date();

async function handleUnpaidStatus() {
  credits.value.forEach((credit) => {
    const unpaidPaymentLogs = credit.paymentLog.filter(
      (payment) => payment.status === "unpaid"
    );
    if (unpaidPaymentLogs.length > 0) {
      const nearestUnpaidDate = getNearestDate(unpaidPaymentLogs);
      credit.nearestUnpaidDate = nearestUnpaidDate;
    } else {
      credit.nearestUnpaidDate = null;
    }
  });
}

function getNearestDate(paymentLogs) {
  const nearestDate = paymentLogs.reduce(
    (min, current) => {
      const diff = Math.abs(new Date(today) - new Date(current.paymentDate));
      return diff < min.diff ? { diff, paymentDate: current.paymentDate } : min;
    },
    { diff: Infinity, paymentDate: null }
  ).paymentDate;

  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(nearestDate));
}

const handlePay = (item) => {
  const unpaid = item.paymentLog.filter((log) => log.status === "unpaid");
  localStorage.setItem("paymentItem", JSON.stringify(item));
  sessionStorage.setItem(
    "unpaidStatus",
    JSON.stringify(item.nearestUnpaidDate)
  );
  router.push({ name: "payment/method" });
};

const handleBack = () => {
  router.back();
};
</script>

<template>
  <div>
    <div class="p-5">
      <svg
        @click="handleBack"
        fill="#111827"
        class="w-8"
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
    <div>
      <h1 class="text-xl font-bold text-center pb-5">Payment</h1>
    </div>
    <div v-if="credits.length > 0">
      <div v-for="(item, index) in credits" :key="index">
        <div
          v-if="item.status === `approved`"
          class="flex justify-between m-2 border-2 p-4 relative rounded-sm bg-white shadow"
        >
          <div class="w-20 text-center">
            <img class="px-2" :src="item.merchantLogo" alt="" />
            <h2 class="text-lg font-semibold">{{ item.merchantName }}</h2>
            <p class="text-xs font-medium">
              {{
                new Intl.DateTimeFormat("en-PH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(item.applicationDate))
              }}
            </p>
          </div>
          <div class="item">
            <div>
              <p v-if="item.nearestUnpaidDate" class="text-sm">
                Due:
                <span class="font-semibold text-md">{{
                  item.nearestUnpaidDate
                }}</span>
              </p>
            </div>
            <p class="text-sm">
              Payments:
              <span class="font-semibold text-md">{{
                item.paymentLog.length
              }}</span>
            </p>
            <div>
              <p class="text-sm">
                Credit :
                <span class="font-semibold text-md">
                  {{
                    new Intl.NumberFormat("en-PH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                    }).format(item.creditAmount)
                  }}
                </span>
              </p>
              <p class="text-sm">
                Paid:
                <span class="font-semibold text-md">
                  {{
                    item.paymentLog.filter((log) => log.status === "paid")
                      .length
                  }}</span
                >
              </p>
            </div>
            <div>
              <p class="text-gray-600 text-sm">
                Amount:
                <span class="font-semibold text-md">
                  {{
                    new Intl.NumberFormat("en-PH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                    }).format(item.monthlyInstallment)
                  }}</span
                >
              </p>
            </div>
          </div>

          <div class="flex items-center">
            <button
              @click="handlePay(item)"
              class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center font-bold text-xl text-gray-500">No record</h1>
    </div>
  </div>
</template>
<style>
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
