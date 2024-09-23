<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const password = ref("");
const confirmPassword = ref("");
const error = ref(null);
const userId = JSON.parse(sessionStorage.getItem("userId"));
const apiUrlUpdatePass = "http://localhost:5000/api/user/change-password";

let confirmPasswordVisible = ref(false);
let passwordVisible = ref(false);

const handleChangePassword = async () => {
  try {
    const response = await fetch(apiUrlUpdatePass, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userId,
        newPassword: password.value,
        confirmPassword: confirmPassword.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("mobileNo");
      router.push({ name: "signin" });
    } else {
      error.value = data.message;
    }
  } catch (error) {
    console.log(error);
  }
};

const handlePasswordVisible = () => (passwordVisible.value ^= true);
const handleConfirmPasswordVisible = () =>
  (confirmPasswordVisible.value ^= true);
</script>

<template>
  <div class="px-4 mt-20">
    <div class="mt-6">
      <label
        for="password"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        New Password
      </label>
      <div class="mt-1 rounded-md shadow-sm relative">
        <input
          v-model="password"
          id="password"
          name="password"
          :type="passwordVisible ? 'text ' : 'password'"
          required="true"
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
        <svg
          @click="handlePasswordVisible"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="cursor-pointer hover:shadow-2 rounded-md size-6 absolute top-2 right-2"
        >
          <path
            v-if="passwordVisible"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            v-if="passwordVisible"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </div>
    </div>

    <div class="mt-6">
      <label
        for="password_confirmation"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        Confirm New Password
      </label>
      <div class="mt-1 rounded-md shadow-sm relative">
        <input
          v-model="confirmPassword"
          id="password_confirmation"
          name="password_confirmation"
          :type="confirmPasswordVisible ? 'text' : 'password'"
          required="true"
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
        <svg
          @click="handleConfirmPasswordVisible"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="cursor-pointer hover:shadow-2 rounded-md size-6 absolute top-2 right-2"
        >
          <path
            v-if="confirmPasswordVisible"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            v-if="confirmPasswordVisible"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </div>
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
