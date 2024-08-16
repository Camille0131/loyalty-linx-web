<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import authStore from "../../stores/auth";
import otp from "../../components/authentications/OTP.vue";

const urlLogin = "https://loyalty-linxapi.vercel.app/api/user/login";
const urlProfile = "https://loyalty-linxapi.vercel.app/api/user/profile";

const email = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();
const token = ref(null);
const generetedOtp = ref("");

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
      console.log("Cookie saved successfully");
    }
  } catch (error) {
    console.error("Error saving cookie:", error);
  }
}

// Start of Get User Profile API request
const getUserProfile = async (token) => {
  try {
    const response = await fetch(urlProfile, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const authStores = authStore();

      // Handle data store response from API request SIGNIN
      const data = await response.json();
      saveUserData(data.userProfile, "u_PRO");
      authStores.login();
      router.push("/home");
    } else {
      error.value = "Error fetching user profile";
    }
  } catch (error) {
    console.log(error);
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

// Start of Signin function
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Fetch method
    const response = await fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        role: "user",
      }),
    });

    // Handle data store response from API request SIGNIN
    const data = await response.json();
    if (response.ok) {
      generetedOtp.value = generatedToken();
      //save data in cookies
      saveUserData(data.token, "u_TOK");
      console.log(data.token);
      if (data.isFirstTimeLogin) {
        router.push({
          path: "/verification",
          query: { gen: generetedOtp.value },
        });
      } else {
        getUserProfile(data.token);
      }

      // Get user profile data
      // getUserProfile(data.token);

      return data;
    } else {
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
  <div class="font-[sans-serif]">
    <div
      class="min-h-screen flex fle-col items-center justify-center py-6 px-4"
    >
      <div class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
        <div
          class="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] sm:w-full"
        >
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="mb-8">
              <h3 class="text-gray-800 text-3xl font-extrabold">Sign in</h3>
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">User name</label>
              <div class="relative flex items-center">
                <input
                  v-model="email"
                  name="email"
                  type="text"
                  required
                  class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-amber-500"
                  placeholder="Enter user name"
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
              </div>
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <div class="relative flex items-center">
                <input
                  v-model="password"
                  name="password"
                  type="password"
                  required
                  class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-amber-500"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <p style="font-size: 0.7rem; color: red" v-if="error">
              {{ error }}
            </p>

            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center">
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
              </div>

              <div class="text-sm">
                <p
                  @click="generateOtpTokens"
                  href="jajvascript:void(0);"
                  class="text-amber-500 hover:underline font-semibold cursor-pointer"
                >
                  Forgot your password?
                </p>
              </div>
            </div>

            <div class="!mt-8">
              <!-- <router-link to="/home"> -->
              <button
                type="submit"
                class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
              >
                Log in
              </button>
              <!-- </router-link> -->
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
        <div class="lg:h-[400px] md:h-[300px] max-md:mt-8">
          <img
            src="../../assets/img/authimages/login-image.jpg"
            class="w-full h-full max-md:w-4/5 mx-auto block object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
