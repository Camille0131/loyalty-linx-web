<script setup>
import { ref, onMounted } from "vue";
import html2canvas from "html2canvas";

// import VueQrcode from "vue-qrcode";
const text = ref("");
const qrCode = ref(null);
const token = ref("");
const refreshQrEndPoint =
  "https://loyalty-linxapi.vercel.app/api/user/refresh-qr";
const qrCodeContainer = ref(null);

async function handleSaveQr() {
  const qrCodeElement = qrCodeContainer.value;
  const canvas = await html2canvas(qrCodeElement, {
    useCORS: true,
    logging: true,
    scale: 4,
  });
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "my_qr_code.png";
  link.click();
}

const generateQR = () => {
  qrCode.value = JSON.parse(localStorage.getItem("qrCode"));
};

// console.log(JSON.parse(sessionStorage.getItem("qrCode")));
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
async function getCookieTokenAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      token.value = JSON.parse(decodeURIComponent(cookieValue));
    } else {
      console.log("userProfile cookie not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}

const handleRefreshQr = async () => {
  try {
    const response = await fetch(refreshQrEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem("qrCode", JSON.stringify(data.qrCode));
      qrCode.value = data.qrCode;
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getCookieTokenAsync("u_TOK");
  generateQR();
});
</script>

<template>
  <div class="qr-page">
    <h1 class="m-8 font-bold text-2xl bg-white rounded-sm p-2 shadow-2">
      My QR Code
    </h1>
    <!-- <form @submit.prevent="generateQR">
      <input type="text" v-model="text" placeholder="Enter text to encode" />
      <button type="submit">Generate QR Code</button>
    </form> -->
    <div class="bg-white px-2 py-10">
      <div v-if="qrCode" class="qr-code-container" ref="qrCodeContainer">
        <!-- <VueQrcode
          type="image/png"
          :value="qrCode"
          class="w-100"
          background="#fff"
          :color="{ dark: '#000', light: '#fff' }"
        /> -->
        <div class="qr-code-overlay">
          <!-- <img src="logo.png" alt="Logo" class="qr-code-logo" /> -->
        </div>
      </div>
      <div class="flex justify-evenly">
        <button @click="handleSaveQr" class="p-2 bg-amber-500 rounded-sm">
          <h2 class="text-white">Save Qr</h2>
        </button>
        <button @click="handleRefreshQr" class="p-2 bg-amber-500 rounded-sm">
          <h2 class="text-white">Generate Qr</h2>
        </button>
      </div>
    </div>

    <p class="qr-code-label">{{ text }}</p>
  </div>
</template>

<style>
.qr-page {
  text-align: center;
}

.qr-code-container {
  border-radius: 2px;
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  margin: 20px auto;
}

.qr-code {
  width: 100%;
  height: 100%;
}

.qr-code-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

.qr-code-logo {
  width: 100%;
  height: 100%;
}

.qr-code-label {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
