<script setup>
import { ref } from "vue";
import OtpPassocode from "./otpPassocode.vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const urlRegister = "http://localhost:5000/api/user/register";
const otpValue = ref("");
const router = useRouter();
const error = ref(null);
let email = ref("");
let mobileNo = ref("");
let firstName = ref("");
let lastName = ref("");
let middleName = ref("");
let passcode = ref("");

//Passcode Validation
const confirmPassCode = async () => {
  passcode.value = sessionStorage.getItem("passCode").replace(/["']/g, "");
  email.value = sessionStorage.getItem("email").replace(/["']/g, "");
  mobileNo.value = sessionStorage.getItem("mobileNo").replace(/["']/g, "");
  firstName.value = sessionStorage.getItem("firstName").replace(/["']/g, "");
  lastName.value = sessionStorage.getItem("lastName").replace(/["']/g, "");
  middleName.value = sessionStorage.getItem("middleName").replace(/["']/g, "");
  console.log(passcode.value);
  console.log(otpValue.value);
  if (passcode.value == otpValue.value) {
    console.log(passcode.value);
    console.log(email.value);
    console.log(mobileNo.value);
    console.log(firstName.value);
    console.log(lastName.value);
    console.log(middleName.value);
    handleRegister();
  } else {
    error.value = "Passcodes do not match";
  }
};

// ----------------------- START OF COOKIE FUNCTION -----------------------

async function setCookieAsync(name, value, days) {
  return new Promise((resolve, reject) => {
    // Set the expiration date for the cookie
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    const secure = "; secure";

    // Set the cookie
    document.cookie =
      name + "=" + encodeURIComponent(value) + expires + secure + "; path=/";

    // Verify the cookie was set
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    if (
      cookieValue &&
      cookieValue.split("=")[1] === encodeURIComponent(value)
    ) {
      resolve(true); // Cookie was set successfully
    } else {
      reject(new Error("Failed to save the cookie."));
    }
  });
}

async function saveUserData(data, name) {
  try {
    const userDataString = JSON.stringify(data);

    // Attempt to save the cookie
    const success = await setCookieAsync(name, userDataString, 7);

    if (success) {
      console.log("Cookie saved successfully");
    }
  } catch (error) {
    console.error("Error saving cookie:", error);
  }
}

//Handle register method
const handleRegister = async (e) => {
  // e.preventDefault();
  try {
    // Fetch method
    const response = await fetch(urlRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: passcode.value,
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
        mobileNo: mobileNo.value,
      }),
    });

    // Handle data store response from API request SIGNIN
    const data = await response.json();
    if (response.ok) {
      sessionStorage.removeItem("passCode");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("mobileNo");
      sessionStorage.removeItem("firstName");
      sessionStorage.removeItem("lastName");
      sessionStorage.removeItem("middleName");
      Swal.fire({
        title: "Registration complete!",
        text: "Please signin your account!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          saveUserData(mobileNo.value, "u_NO");
          router.replace("/signin");
        }
      });
      console.log(data);
    } else {
      Swal.fire({
        title: "Registration failed!",
        text: data.message,
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
      error.value = data.message;
      console.log(data.message);
    }
  } catch (error) {
    console.error(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      error.value = `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      error.value = "No response received from the server";
    } else {
      // Something happened in setting up the request that triggered an Error
      error.value = "Error setting up the request";
    }
  }
};
</script>
<template>
  <div class="px-4">
    <div class="p-4 mt-10">
      <h1 class="text-center font-bold text-xl">Confirm your passcode</h1>
    </div>
    <div class="flex flex-col justify-between">
      <div id="otp-input " class="mt-15">
        <OtpPassocode
          :digit-count="6"
          @update:otp="otpValue = $event"
        ></OtpPassocode>
      </div>
      <div class="mt-3">
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
    <div>
      <div class="mt-[90%]">
        <span class="block w-full rounded-md shadow-sm">
          <button
            @click="confirmPassCode"
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:border-amber-700 focus:shadow-outline-indigo active:bg-amber-700 transition duration-150 ease-in-out"
          >
            <router-link to="/passcode"> Submit </router-link>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
