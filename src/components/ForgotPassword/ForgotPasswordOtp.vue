<script setup>
import { ref, watch } from "vue";
import otp from "../authentications/OTP.vue";
import { useRouter } from "vue-router";
const otpValue = ref("");

const router = useRouter();
const mobileNo = JSON.parse(sessionStorage.getItem("mobileNo"));
const userId = JSON.parse(sessionStorage.getItem("userId"));
const error = ref(null);
const urlRefreshCode = "http://localhost:5000/api/user/refresh-code";

const validateCode = "http://localhost:5000/api/user/validate-code";

const handleRefreshCode = async (idUser) => {
  try {
    const response = await fetch(urlRefreshCode, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: idUser }),
    });

    const data = await response.json();
    // console.log(data.message);
    if (response.ok) {
      // console.log(data.message);
    } else {
      // console.log(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
const verify = async () => {
  try {
    const response = await fetch(validateCode, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId, secretCode: otpValue.value }),
    });
    const data = await response.json();
    if (response.ok) {
      handleRefreshCode(userId);
      router.push({ name: "confirm/password" });
    } else {
      error.value = data.message;
    }
  } catch (error) {
    console.log(error);
  }
};
watch(otpValue, (newVal) => {
  if (newVal.length === 6) {
    verify();
  }
});
</script>

<template>
  <div class="px-6">
    <div class="py-5 mt-10">
      <h2 class="font-medium text-center text-lg text-gray-400">
        We sent code to
      </h2>
      <h3 class="font-medium text-center text-lg text-blue-500">
        <span class="text-gray-400 font-medium">Mobile No:</span>{{ mobileNo }}
      </h3>
    </div>

    <div class="my-10">
      <otp :digit-count="6" @update:otp="otpValue = $event"></otp>
      <p style="font-size: 0.7rem; color: red" v-if="error">
        {{ error }}
      </p>
    </div>

    <!-- Move the button to the bottom -->
    <div class="mt-10">
      <button
        type="submit"
        class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
      >
        Resend
        <!-- Remove the router-link, as it's not needed here -->
      </button>
    </div>
  </div>
</template>
