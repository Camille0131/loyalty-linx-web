<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import OTP from "../authentications/OTP.vue";
const router = useRouter();
const password = JSON.parse(sessionStorage.getItem("newPassword"));
const confirmPassword = ref("");
const error = ref(null);

const userId = JSON.parse(sessionStorage.getItem("userId"));
const apiUrlUpdatePass =
  "https://loyalty-linxapi.vercel.app/api/user/change-password";

const handleChangePassword = async () => {
  try {
    const response = await fetch(apiUrlUpdatePass, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
        newPasscode: password,
        confirmPasscode: confirmPassword.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("mobileNo");
      sessionStorage.removeItem("newPassword");
      router.push({ name: "signin" });
    } else {
      error.value = data.message;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="px-4 mt-20 h-[40rem] justify-center flex flex-col">
    <div class="mt-6">
      <label
        for="password"
        class="block text-center text-xl font-medium leading-5 text-gray-700"
      >
        Confirm New Password
      </label>

      <div class="mt-10 rounded-md shadow-sm relative">
        <OTP :digit-count="6" @update:otp="confirmPassword = $event"></OTP>
      </div>
    </div>

    <div class="mt-6">
      <div class="mt-2">
        <p
          v-if="error"
          style="font-size: 0.7rem; color: red"
          class="shadow-none"
        >
          {{ error }}
        </p>
        <p v-else style="font-size: 0.7rem; color: red"></p>
      </div>
    </div>
    <div class="mt-10">
      <button
        @click="handleChangePassword"
        type="submit"
        class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
      >
        Submit
      </button>
    </div>
  </div>
</template>
