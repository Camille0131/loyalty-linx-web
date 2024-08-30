<script setup>
import { ref, onMounted } from "vue";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();
const mobileNo = ref("");
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref(null);

let confirmPasswordVisible = ref(false);
let passwordVisible = ref(false);

const iti = ref({});
const urlRegister = "http://localhost:5000/api/user/register";

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

// ----------------------- END OF COOKIE FUNCTION -----------------------

//Handle visiblity of password
const handlePasswordVisible = () => (passwordVisible.value ^= true);
const handleConfirmPasswordVisible = () =>
  (confirmPasswordVisible.value ^= true);
//Handle mounted intl mobile phone number input
onMounted(() => {
  const input = document.querySelector("#mobieNo");
  iti.value = intlTelInput(input, {
    utilsScript: "/node_modules/intl-tel-input/build/js/utils.js",
    containerClass: "w-full",
    initialCountry: "PH",
    strictMode: true,
  });
});
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//Handle register method
const handleRegister = async (e) => {
  // e.preventDefault();
  console.log("bineub");

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    // return;
  } else if (!passwordRegex.test(password.value)) {
    error.value =
      "Password must be at least 6 characters, contain at least one special character, and at least one number";
    // return;
  } else {
    error.value = null;
    // console.log("GO");
    try {
      // Fetch method
      const response = await fetch(urlRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          middleName: middleName.value,
          lastName: lastName.value,
          mobileNo: mobileNo.value,
        }),
      });

      // Handle data store response from API request SIGNIN
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Registration complete!",
          text: "Please signin your account!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            saveUserData(mobileNo.value, "u_NO");
            router.push("/signin");
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
  }
};
//Validaation of mobile number
const validateMobileNo = () => {
  if (iti.value.isValidNumber()) {
    handleRegister();
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-5 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <img
          class="m-2 h-17 w-auto"
          src="/src/assets/img/authimages/loyaltilinx-web-favicon.png"
          alt="Workflow"
        />
        <span
          class="self-center text-[2rem] font-bold whitespace-nowrap dark:text-white"
          >Loyalty Linx</span
        >
      </div>
      <!-- <h2
        class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
      >
        Create a new account
      </h2> -->
      <p class="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
        Or
        <RouterLink
          to="/signin"
          class="font-medium text-amber-600 hover:text-amber-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          login to your account
        </RouterLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-1/2 sm:max-w-md sm:mb-2 w-[80%] mx-auto">
      <div class="bg-white rounded-md py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="validateMobileNo" method="POST" action="#">
          <div>
            <label
              for="mobieNo"
              class="mt-6 block text-sm font-medium leading-5 text-gray-700"
              >Mobile No</label
            >
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                v-model="mobileNo"
                id="mobieNo"
                name="mobieNo"
                placeholder=""
                type="tel"
                required="true"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
          </div>
          <div class="mt-6">
            <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Email address
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                v-model="email"
                id="email"
                name="email"
                placeholder="user@example.com"
                type="email"
                required="true"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
          </div>
          <div>
            <label
              for="firstName"
              class="mt-6 block text-sm font-medium leading-5 text-gray-700"
              >First Name</label
            >
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                v-model="firstName"
                id="firstName"
                name="firstName"
                placeholder=""
                type="text"
                required="true"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex-auto w-64 mr-4">
              <label
                for="lastName"
                class="mt-6 block text-sm font-medium leading-5 text-gray-700"
                >Last Name</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  v-model="lastName"
                  id="lastName"
                  name="lastName"
                  placeholder=""
                  type="text"
                  required="true"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
            </div>
            <div class="flex-auto w-24">
              <label
                for="middleName"
                class="mt-6 block text-sm font-medium leading-5 text-gray-700"
                >M.I</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  v-model="middleName"
                  id="middleName"
                  name="middleName"
                  placeholder=""
                  type="text"
                  required="true"
                  class="w-full appearance-none block px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
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
            </div>
          </div>
          <div class="mt-6">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
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
              Confirm Password
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

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Register
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.iti {
  --iti-path-flags-1x: url("/node_modules/intl-tel-input/build/img/flags.webp");
  --iti-path-flags-2x: url("/node_modules/intl-tel-input/build/img/flags@2x.webp");
  --iti-path-globe-1x: url("/node_modules/intl-tel-input/build/img/globe.webp");
  --iti-path-globe-2x: url("/node_modules/intl-tel-input/build/img/globe@2x.webp");
}
</style>
