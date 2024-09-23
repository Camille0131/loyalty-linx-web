<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import OtpPassocode from "./otpPassocode.vue";

const router = useRouter();
const otpValue = ref("");
const createPassCode = () => {
  sessionStorage.setItem("passCode", JSON.stringify(otpValue.value));
  router.push({ name: "confirmpasscode" });
};
</script>
<template>
  <div class="px-4">
    <div class="p-4 mt-10">
      <h1 class="text-center font-bold text-xl">Create your passcode</h1>
    </div>
    <div class="flex flex-col justify-between">
      <form @submit.prevent="createPassCode">
        <div id="otp-input " class="mt-15">
          <OtpPassocode
            :digit-count="6"
            @update:otp="otpValue = $event"
          ></OtpPassocode>
        </div>
        <div>
          <div class="mt-[90%]">
            <span class="block w-full rounded-md shadow-sm">
              <button
                @click="createPassCode"
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:border-amber-700 focus:shadow-outline-indigo active:bg-amber-700 transition duration-150 ease-in-out"
              >
                Next
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
