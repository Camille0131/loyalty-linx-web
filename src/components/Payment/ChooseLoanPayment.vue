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
    <div class="px-2 pt-3 pb-4">
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
                Amortization:
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
