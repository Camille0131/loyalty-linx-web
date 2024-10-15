<script setup>
import Swal from "sweetalert2";
import OTP from "../../components/authentications/OTP.vue";
import { ref, watch, onMounted } from "vue";
import authStore from "../../stores/auth";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const route = useRouter();
const tokenCookie = ref(null);
const otpValue = ref("");
const resendOtpTimer = ref(300); // 5 minutes timer
const userId = ref("");
let resendOtpInterval = null;
const mobileNo = ref("");

const urlSendOtp = "https://loyalty-linxapi.vercel.app/api/user/send-otp";
const urlVerification =
  "https://loyalty-linxapi.vercel.app/api/user/validate-login";
const urlProfile = "https://loyalty-linxapi.vercel.app/api/user/profile";
const urlRefreshCode =
  "https://loyalty-linxapi.vercel.app/api/user/refresh-code";
// onMounted(() => {
getCookieTokenAsync("u_TOK");
getCookieMobileAsync("u_NO");
getCookieUserIdAsync("u_ID");
// });

// ------------------------- START OF COOKIE FUNCTIONS -------------------------

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

//  Get mobile from cookies

// async function getCookieMobile(name) {
//   return new Promise((resolve, reject) => {
//     const nameEQ = name + "=";
//     const cookiesArray = document.cookie.split(";");
//     for (let i = 0; i < cookiesArray.length; i++) {
//       let cookie = cookiesArray[i].trim();
//       if (cookie.indexOf(nameEQ) === 0) {
//         resolve(cookie.substring(nameEQ.length, cookie.length));
//         return;
//       }
//     }
//     resolve(null); // Return null if the cookie is not found
//   });
// }

// SaveCookie setter
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

//Get Token from cookies Function
async function getCookieTokenAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      tokenCookie.value = JSON.parse(decodeURIComponent(cookieValue));
      console.log("Token cookie value:");
    } else {
      console.log("Token cookie not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}
//Get mobileNo from cookies Function
async function getCookieMobileAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      // const mobileNos = JSON.parse(decodeURIComponent(cookieValue));
      mobileNo.value = JSON.parse(decodeURIComponent(cookieValue));
      // console.log(mobileNos);
      console.log(" Mobile value:");
      console.log(mobileNo.value);
    } else {
      console.log("Mobile not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}
//Get userId from cookies Function
async function getCookieUserIdAsync(name) {
  try {
    const cookieValue = await getCookieAsync(name);
    if (cookieValue) {
      userId.value = JSON.parse(decodeURIComponent(cookieValue));
      console.log("UseId value:");
    } else {
      console.log("Mobile not found");
    }
  } catch (error) {
    console.error("Error getting token cookie:", error);
  }
}
// Handle save user data after authentication success
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

// ------------------------- END OF COOKIE FUNCTIONS -------------------------

// ------------------------- START OF OTP FUNCTIONS -------------------------

// Handle Start Timer Resend Otp
const startResendOtpTimer = () => {
  resendOtpInterval = setInterval(() => {
    resendOtpTimer.value--;
    // storeTimer(); // store the timer value on each tick
    if (resendOtpTimer.value === 0) {
      clearInterval(resendOtpInterval);
    }
  }, 1000);
};

//Handle resend otp
const resendOtp = async (e) => {
  // API call to resend OTP
  // console.log("Resend OTP");
  getCookieMobileAsync("u_NO");
  refreshCode();
  startResendOtpTimer();
  resendOtpTimer.value = 300;

  // storeTimer(); // reset timer
};

//Handle refresh otp
const refreshCode = async (e) => {
  try {
    const response = await fetch(urlRefreshCode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      sendOtp();
    } else {
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Handle sendOtp API integrations
const sendOtp = async (e) => {
  try {
    const response = await fetch(urlSendOtp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookie.value}`,
      },
      body: JSON.stringify({
        number: mobileNo.value,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      // console.log(response.message);
      // console.log(data);
    } else {
      // console.log(response);
      // console.log(data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// ------------------------- END OF OTP FUNCTIONS -------------------------

// ------------------------- START OF AUTH FUNCTIONS -------------------------

// Start of Get User Profile API request
// const getUserProfile = async (token) => {
//   try {
//     const response = await fetch(urlProfile, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${tokenCookie.value}`,
//       },
//     });

//     if (response.ok) {
//       const authStores = authStore();

//       // Handle data store response from API request SIGNIN
//       const data = await response.json();
//       // saveUserData(data.userProfile, "u_PRO");
//       saveUserData(token, "u_TOK");
//       authStores.login();
//       route.push("/home");
//     } else {
//       error.value = "Error fetching user profile";
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

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

//verification account
const verify = async (e) => {
  // e.preventDefault();
  try {
    const response = await fetch(urlVerification, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretCode: otpValue.value,
        userId: userId.value,
      }),
    });
    console.log(otpValue.value);
    const data = await response.json();
    if (response.ok) {
      console.log("Go in home");
      handleRefreshCode(userId.value);
      saveUserData(data.token, "u_TOK");
      route.push({ name: "link/passcode" });
      // console.log(data);
      // getUserProfile(tokenCookie.value);
    } else {
      Swal.fire({
        title: "Authentication failed",
        text: "Invalid code",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    console.log(error.message);
  }
};

// ------------------------- END OF AUTH FUNCTIONS -------------------------

const test = () => {
  console.log(tokenCookie.value);
  console.log(mobileNo.value);
};

watch(otpValue, (newVal) => {
  if (newVal.length === 6) {
    verify();
  }
});
startResendOtpTimer();
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md my-40">
    <!-- <img
      class="mx-auto h-20 w-auto"
      src="/src/assets/img/authimages/loyaltilinx-web-favicon.png"
      alt="Workflow"
    /> -->
    <h2
      class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
    >
      Enter the OTP
    </h2>
    <p class="text-center">sent to {{ mobileNo }}</p>
  </div>
  <form action="">
    <div class="flex flex-col justify-center">
      <OTP :digit-count="6" @update:otp="otpValue = $event"></OTP>
      <!-- <p>{{ otpValue }}</p> -->
      <div class="!mt-8 flex justify-center">
        <button
          v-if="resendOtpTimer > 0"
          class="w-1/5 m-2 py-3 px-4 text-sm tracking-wide rounded-lg text-gray-500 font-medium focus:outline-none"
          disabled
        >
          Resend OTP ({{ resendOtpTimer }})
        </button>
        <button
          v-else
          class="w-1/5 m-2 py-3 px-4 text-sm tracking-wide rounded-lg text-gray-600 font-semibold focus:outline-none"
          @click="resendOtp"
        >
          Resend OTP
        </button>
      </div>
      <!-- <div class="!mt-2 flex justify-center">
        <button
          @click="test"
          type="submit"
          class="shadow-xl w-1/5 m-2 py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
        >
          Verify
        </button>
      </div> -->
    </div>
  </form>
</template>
