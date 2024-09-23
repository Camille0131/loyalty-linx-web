<script setup>
import { ref, computed, watch, onMounted } from "vue";
import LoanStatus from "./LoanStatus.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const credits = ref([]);

onMounted(() => {
  getCookieUserCredsAsync("u_CREDREQ");
  getCookieUserPaymentLogAsync("userPaymentLog");
});

const paymentLogs = ref("");

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

async function getCookieUserCredsAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      credits.value = JSON.parse(decodeURIComponent(cookieValue));
    } else {
      console.log("userProfile cookie not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}

async function getCookieUserPaymentLogAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      // paymentLogs.value = JSON.parse(decodeURIComponent(cookieValue));
      handleGetNearestDate(JSON.parse(decodeURIComponent(cookieValue)));
    } else {
      console.log("userProfile cookie not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}

const today = new Date();

// async function hanldeUnpaids(data) {
//   const creditsWithNearestUnpaidDate = data.map((credit) => {
//     const unpaidPaymentLogs = credit.paymentLog.filter(
//       (payment) => payment.status === "unpaid"
//     );
//     const nearestUnpaidDate = unpaidPaymentLogs.reduce(
//       (min, current) => {
//         const diff = Math.abs(new Date(today) - new Date(current.paymentDate));
//         return diff < min.diff
//           ? { diff, paymentDate: current.paymentDate }
//           : min;
//       },
//       { diff: Infinity, paymentDate: null }
//     ).paymentDate;
//     return { ...credit, nearestUnpaidDate };
//   });
// }

// const handleGetNearestDate = async (data) => {
//   const nearestPaymentDates = data.map((paymentLog, index) => {
//     const paymentDates = paymentLog.map((payment) => payment.paymentDate);
//     const nearestDate = paymentDates.reduce(
//       (nearest, date) => {
//         const diffNearest = Math.abs(today - nearest);
//         const diffDate = Math.abs(today - date);
//         return diffDate < diffNearest ? { date, index } : nearest;
//       },
//       { date: paymentDates[0], index: 0 }
//     );
//     const paidPaymentLog = paymentLog.filter((paid) => paid.status === "paid");
//     return nearestDate;
//   });
//   paymentLogDate.value = nearestPaymentDates;
// };

async function handleGetNearestDate(data) {
  const nearestPaymentDates = data.map((paymentLog, index) => {
    const paymentDates = paymentLog.map((payment) => payment.paymentDate);
    const nearestDate = paymentDates.reduce(
      (nearest, date) => {
        const diffNearest = Math.abs(today - nearest);
        const diffDate = Math.abs(today - date);
        return diffDate < diffNearest ? { date, index } : nearest;
      },
      { date: paymentDates[0], index: 0 }
    );
    const paidPaymentLog = paymentLog.filter((paid) => paid.status === "paid");
    return nearestDate;
  });

  // Update credits with paymentLog data
  credits.value = credits.value.map((credit, index) => {
    credit.paymentLog = data[index];
    return credit;
  });
  handleUnpaidStatus(credits.value);
}

// async function handleUnpaidStatus(data) {
//   for (let item of credits.value) {
//     const unpaidPaymentLogs = item.paymentLog.filter(
//       (payment) => payment.status === "unpaid"
//     );
//     console.log(unpaidPaymentLogs);
//     const nearestUnpaidDate = unpaidPaymentLogs.reduce(
//       (min, current) => {
//         const diff = Math.abs(new Date(today) - new Date(current.paymentDate));
//         return diff < min.diff
//           ? { diff, paymentDate: current.paymentDate }
//           : min;
//       },
//       { diff: Infinity, paymentDate: null }
//     ).paymentDate;
//   }
// }
// async function handleUnpaidStatus() {
//   credits.value.forEach((credit) => {
//     const unpaidPaymentLogs = credit.paymentLog.filter(
//       (payment) => payment.status === "unpaid"
//     );
//     if (unpaidPaymentLogs.length > 0) {
//       const nearestUnpaidDate = getNearestDate(unpaidPaymentLogs);
//       console.log(
//         `Nearest unpaid date for credit ${credit.id}: ${nearestUnpaidDate}`
//       );
//     } else {
//       console.log(`No unpaid payment logs for credit ${credit.id}`);
//     }
//   });
// }
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
  return paymentLogs.reduce(
    (min, current) => {
      const diff = Math.abs(new Date(today) - new Date(current.paymentDate));
      return diff < min.diff ? { diff, paymentDate: current.paymentDate } : min;
    },
    { diff: Infinity, paymentDate: null }
  ).paymentDate;
}
// const nearestUnpaidDateUpdate = unpaidPayments.reduce(
//   (min, current) => {
//     const diff = Math.abs(today - new Date(current.paymentDate));
//     return diff < min.diff ? { diff, paymentDate: current.paymentDate } : min;
//   },
//   { diff: Infinity, paymentDate: null }
// ).paymentDate;

const handleLoanStatus = (item, index) => {
  // const paymentLog = paymentLogs.value[index];
  // if (paymentLog) {
  //   item.paymentLog = paymentLog;
  // }
  sessionStorage.setItem("loanMonitorStatus", JSON.stringify(item));

  router.push({ name: "loan/monitor" });
};
</script>
<template>
  <div class="px-2">
    <div class="p-5">
      <router-link to="/credits">
        <svg
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
      </router-link>
    </div>

    <div
      @click="handleLoanStatus(item, index)"
      v-for="(item, index) in credits"
      :key="index"
    >
      <div
        class="flex relative my-2 p-4 items-center justify-between min-h-45 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div class="border-2 rounded-sm">
          <img
            class="object-fit w-20 m-2 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            :src="item.merchantLogo"
            alt=""
          />
          <h5
            class="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ item.merchantName }}
          </h5>
        </div>
        <div class="flex px-5 text-left w-[62%] flex-col justify-center">
          <p class="text-xs">DUE PAYMENT</p>
          <p class="font-medium text-xl">
            {{
              new Intl.NumberFormat("en-PH", {
                style: "decimal",
                minimumFractionDigits: 2,
              }).format(item.monthlyInstallment)
            }}
          </p>
          <p class="text-xs mt-4">Pay on date</p>

          <p v-if="item.nearestUnpaidDate">
            {{
              new Intl.DateTimeFormat("en-PH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(item.nearestUnpaidDate))
            }}
          </p>

          <p class="mb-3 font-medium text-lg text-gray-700 dark:text-gray-400">
            <!-- {{
              paymentLogDate[index] && paymentLogDate[index].date
                ? new Intl.DateTimeFormat("en-PH", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(paymentLogDate[index].date))
                : "Invalid date"
            }} -->
          </p>
        </div>
        <div>
          <div>
            <h2
              class="text-xs absolute top-2 text-gray-600 right-2 bg-green-300 rounded-sm p-1"
            >
              {{ item.status }}
            </h2>
          </div>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="w-8"
            viewBox="0 0 32 32"
            enable-background="new 0 0 32 32"
            xml:space="preserve"
          >
            <g>
              <path
                fill="#374151"
                d="M16,32c8.822,0,16-7.178,16-16S24.822,0,16,0S0,7.178,0,16S7.178,32,16,32z M16,1c8.271,0,15,6.729,15,15
		s-6.729,15-15,15S1,24.271,1,16S7.729,1,16,1z"
              />
              <path
                fill="#374151"
                d="M13.224,21.2c0.098,0.098,0.226,0.146,0.354,0.146s0.256-0.049,0.354-0.146l4.846-4.846
		c0.195-0.195,0.195-0.512,0-0.707L13.931,10.8c-0.195-0.195-0.512-0.195-0.707,0s-0.195,0.512,0,0.707L17.716,16l-4.492,4.493
		C13.028,20.688,13.028,21.004,13.224,21.2z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
