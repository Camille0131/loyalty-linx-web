<script setup>
import { ref, onMounted } from "vue";
// import "intl-tel-input/build/css/intlTelInput.css";
// import intlTelInput from "intl-tel-input";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const error = ref(null);
const findAccount = "http://localhost:5000/api/user/find-account";

const iti = ref({});

onMounted(() => {
  const input = document.querySelector("#mobieNo");
  // iti.value = intlTelInput(input, {
  //   utilsScript: "/node_modules/intl-tel-input/build/js/utils.js",
  //   containerClass: "w-full",
  //   initialCountry: "PH",
  //   strictMode: true,
  // });
});

const submit = async () => {
  try {
    const response = await fetch(findAccount, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // sessionStorage.setItem("mobileNo", JSON.stringify(mobileNo.value));
      sessionStorage.setItem("email", JSON.stringify(email.value));
      sessionStorage.setItem("userId", JSON.stringify(data.userId));
      router.push({ name: "forgotpassword/otp" });
    } else {
      error.value = data.message;
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};
const validateMobileNo = () => {
  // const mobileNumber = mobileNo.value.replace(/\s+/g, ""); // remove all spaces
  // mobileNo.value = mobileNumber;
  // if (iti.value.isValidNumber()) {
  submit();
  // }
};
</script>
<template>
  <div class="px-6 flex flex-col justify-center h-[20rem]">
    <h2 class="font-bold mx-4 text-xl mt-6">Enter your Email</h2>

    <div class="mt-4 relative rounded-md shadow-sm">
      <input
        v-model="email"
        id="email"
        name="email"
        placeholder=""
        type="email"
        required="true"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      />
      <div
        class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
    <p style="font-size: 0.7rem; color: red" v-if="error">
      {{ error }}
    </p>
    <div class="mt-7">
      <button
        @click="validateMobileNo"
        type="submit"
        class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<style>
#mobieNo:focus {
  border: 1px #ffb300 solid;
  box-shadow: none;
}

input:focus {
  border: none;
  box-shadow: none;
}
.iti {
  --iti-path-flags-1x: url("../node_modules/intl-tel-input/build/img/flags.webp");
  --iti-path-flags-2x: url("../node_modules/intl-tel-input/build/img/flags@2x.webp");
  --iti-path-globe-1x: url("../node_modules/intl-tel-input/build/img/globe.webp");
  --iti-path-globe-2x: url("../node_modules/intl-tel-input/build/img/globe@2x.webp");
}
</style>
