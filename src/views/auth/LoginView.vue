<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import authStore from "../../stores/auth";
import { useUserStore } from "../../stores/user";
// import "intl-tel-input/build/css/intlTelInput.css";
// import intlTelInput from "intl-tel-input";

// const urlLogin = "http://localhost:5000/api/user/login";
const urlLogin = "http://localhost:5000/api/user/login/mobileNo";
const urlProfile = "http://localhost:5000/api/user/profile";

const email = ref("");
const mobileNo = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();
const generetedOtp = ref("");
// const iti = ref({});
const userStore = useUserStore();

const mobieNoInput = ref(null);

onMounted(() => {
  // intlTelInput(mobieNoInput.value, {
  //   utilsScript: "/node_modules/intl-tel-input/build/js/utils.js",
  //   containerClass: "w-full",
  //   initialCountry: "PH",
  //   strictMode: true,
  // });
});

let passwordVisible = ref(false);
const handlePasswordVisible = () => (passwordVisible.value ^= true);

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

// Usage example
async function saveUserData(data, name) {
  try {
    const userDataString = JSON.stringify(data);

    // Attempt to save the cookie
    const success = await setCookieAsync(name, userDataString, 7);

    if (success) {
      // console.log("Cookie saved successfully");
    }
  } catch (error) {
    console.error("Error saving cookie:", error);
  }
}
// test
// Start of Signin function
const handleSubmit = async (e) => {
  // e.preventDefault();

  try {
    // Fetch method
    const response = await fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNo: mobileNo.value,
        role: "user",
      }),
    });

    // Handle data store response from API request SIGNIN
    const data = await response.json();
    if (response.ok) {
      generetedOtp.value = generatedToken();
      // sessionStorage.setItem("mobileNo", mobileNo.value);
      saveUserData(data.userId, "u_ID");
      saveUserData(mobileNo.value, "u_NO");
      router.push({
        path: "/verification",
        query: { gen: generetedOtp.value },
      });
 

      return data;
    } else {
      error.value = data.message;
      // console.log(data.message);
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

// End of Get User Profile API request

const generatedToken = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const tokenLength = 18; // adjust the length of the token as needed
  let token = "";

  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
};

// Validation mobile number
const validateMobileNo = () => {
  const mobileNumber = mobileNo.value.replace(/\s+/g, ""); // remove all spaces
  mobileNo.value = mobileNumber;
  handleSubmit();
};
</script>

<template>
  <div class="font-[sans-serif]">
    <div
      class="min-h-screen py-6 px-1 sm:flex sm:justify-center sm:item-center"
    >
      <div
        class="grid mt-26 sm:mt-0 md:grid-cols-2 items-center gap-4 max-w-6xl w-full"
      >
        <div
          class="border mx-auto w-full border-none shadow-none px-10 border-gray-300 rounded-lg p-6 max-w-sm sm:w-full sm:border sm:shadow-2"
        >
          <form class="space-y-4" @submit.prevent="validateMobileNo">
            <div class="flex justify-center mb-10">
              <img
                class="m-1 h-12 w-auto"
                src="/src/assets/img/authimages/loyaltilinx-web-favicon.png"
                alt="Workflow"
              />
              <span
                style="font-family: poppins"
                class="text-amber-700 self-center text-3xl font-extrabold whitespace-nowrap dark:text-white"
                >Loyalty Linx</span
              >
            </div>
            <!-- <div class="mb-8">
              <h3 class="text-gray-800 text-3xl font-extrabold">Sign in</h3>
            </div> -->

            <div>
              <div>
                <label
                  for="mobieNo"
                  class="mt-6 block text-sm font-medium leading-5 text-gray-700"
                  >Mobile No</label
                >
                <div
                  id="mobileNoCon"
                  class="mt-1 relative rounded-md shadow-sm"
                >
                  <!-- <input
                    v-model="mobileNo"
                    id="mobieNo"
                    ref="mobieNoInput"
                    name="mobieNo"
                    placeholder=""
                    type="tel"
                    required="true"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  /> -->
                  <vue-tel-input
                    inputmode="numeric"
                    pattern="[0-9]*"
                    :inputOptions="{
                      maxlength: 11,
                    }"
                    required
                    v-model="mobileNo"
                    class="border border-gray-300 p-1 focus:border-amber-500 focus:ring-amber-500"
                  ></vue-tel-input>
                  <div
                    class="hidden absolute inset-y-0 right-0 pr-3 items-center pointer-events-none"
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
              <!-- <label class="text-gray-800 text-sm mb-2 block">Email</label>
              <div class="relative flex items-center">
                <input
                  v-model="mobileNo"
                  name="mobileNo"
                  required
                  class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-amber-500"
                  placeholder="Email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div> -->
            </div>
            <!-- <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <div class="relative flex items-center">
                <input
                  v-model="password"
                  name="password"
                  required
                  :type="passwordVisible ? 'text ' : 'password'"
                  class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-amber-500"
                  placeholder="Enter password"
                />
                <svg
                  @click="handlePasswordVisible"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="gray"
                  class="cursor-pointer hover:shadow-2 rounded-md size-6 absolute top-3 right-3"
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
            </div> -->
            <p style="font-size: 0.7rem; color: red" v-if="error">
              {{ error }}
            </p>

            <div class="flex flex-wrap items-center justify-between gap-4">
              <!-- <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 shrink-0 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  class="ml-3 block text-sm text-gray-800"
                >
                  Remember me
                </label>
              </div> -->

              <!-- <div class="text-sm">
                <router-link to="/forgotpassword">
                  <p
                    @click="generateOtpTokens"
                    href="jajvascript:void(0);"
                    class="text-amber-500 hover:underline font-semibold cursor-pointer"
                  >
                    Forgot your password?
                  </p>
                </router-link>
              </div> -->
            </div>

            <div class="!mt-8">
              <!-- <router-link to="/home"> -->
              <button
                type="submit"
                class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
              >
                Submit
              </button>
              <!-- </router-link> -->
            </div>
            <!-- <div
              class="flex w-full items-center gap-2 py-6 text-sm text-slate-600"
            >
              <div class="h-px w-full bg-slate-200"></div>
              OR
              <div class="h-px w-full bg-slate-200"></div>
            </div> -->

            <div class="mt-7 flex flex-col gap-2">
              <div>
                <!-- <router-link to="/home"> -->
                <!-- <button
                  type="submit"
                  class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-amber-600 hover:bg-amber-700 focus:outline-none"
                >
                  Log in via OTP
                </button> -->
                <!-- </router-link> -->
              </div>
              <!-- <a
                class="cursor-pointer hover:bg-gray-100 inline-flex h-10 w-full items-center justify-center rounded-lg gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  class="h-[18px] w-[18px]"
                  
                />
                <div class="w-[1.4rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xml:space="preserve"
                    viewBox="0 0 40 40"
                  >
                    <linearGradient
                      id="a"
                      x1="-277.375"
                      x2="-277.375"
                      y1="406.6018"
                      y2="407.5726"
                      gradientTransform="matrix(40 0 0 -39.7778 11115.001 16212.334)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#0062e0" />
                      <stop offset="1" stop-color="#19afff" />
                    </linearGradient>
                    <path
                      fill="url(#a)"
                      d="M16.7 39.8C7.2 38.1 0 29.9 0 20 0 9 9 0 20 0s20 9 20 20c0 9.9-7.2 18.1-16.7 19.8l-1.1-.9h-4.4l-1.1.9z"
                    />
                    <path
                      fill="#fff"
                      d="m27.8 25.6.9-5.6h-5.3v-3.9c0-1.6.6-2.8 3-2.8H29V8.2c-1.4-.2-3-.4-4.4-.4-4.6 0-7.8 2.8-7.8 7.8V20h-5v5.6h5v14.1c1.1.2 2.2.3 3.3.3 1.1 0 2.2-.1 3.3-.3V25.6h4.4z"
                    />
                  </svg>
                </div>
                Continue with Facebook
              </a> -->

              <!-- <a
                class="inline-flex cursor-pointer hover:bg-gray-100 h-10 w-full items-center justify-center rounded-lg gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  class="h-[18px] w-[18px]"
                />Continue with Google
              </a> -->
            </div>
            <p class="text-sm !mt-8 text-center text-gray-800">
              Don't have an account
              <RouterLink
                to="/register"
                class="text-amber-500 font-semibold hover:underline ml-1 whitespace-nowrap"
                >Register here</RouterLink
              >
            </p>
          </form>
        </div>
        <div id="image" class="lg:h-[400px] md:h-[300px] max-md:mt-8">
          <img
            src="../../assets/img/authimages/login-image.jpg"
            class="w-full h-full max-md:w-4/5 mx-auto block object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
input:focus {
  border: none;
  box-shadow: none;
}

#mobieNo:focus {
  border: 1px #ffb300 solid;
  box-shadow: none;
}

/* .iti { */
/* --iti-path-flags-1x: url("https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/dist/img/flags.webp");
  --iti-path-flags-2x: url("https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/dist/img/flags@2x.webp"); */
/* --iti-path-flags-1x: url("/public/img/flags.webp");
  --iti-path-flags-2x: url("/public/img/flags@2x.webp"); */
/* --iti-path-flags-1x: url("https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/dist/img/globe.webp");
  --iti-path-flags-2x: url("https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/dist/img/globe@2x.webp"); */
/* --iti-path-globe-1x: url("/public/img/globe.webp");
  --iti-path-globe-2x: url("/public/img/globe@2x.webp"); */
/* } */

@media (max-width: 768px) {
  #image {
    display: none;
  }
}
</style>

<!-- /* --iti-path-flags-1x: url("/node_modules/intl-tel-input/build/img/flags.webp"); */ -->
<!-- /* --iti-path-flags-2x: url("/node_modules/intl-tel-input/build/img/flags@2x.webp"); */ -->
