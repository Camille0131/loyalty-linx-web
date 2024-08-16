<script setup>
// import { useNavbarStore } from "../../stores/navbar";

import DropDownUser from "./DropDownUser.vue";
import { ref, onMounted } from "vue";
import NavbarItem from "./NavbarItem.vue";
import { useRouter } from "vue-router";
import authStore from "../../stores/auth";
import { initCollapses } from "flowbite";
onMounted(() => {
  initCollapses();
});
getUserProfileFromCookie();
// const useAuthStore = authStore();

let userProfileData = ref("");
let fullName = ref("");
let email = ref("");
let profilePhoto = ref("");

// const navbarStore = useNavbarStore();
const router = useRouter();

const menuGroups = ref([
  {
    name: "MENU",
    menutItems: [
      {
        label: "Home",
        route: "/home",
      },
      {
        label: "Points",
        route: "/points",
      },
      {
        label: "Credits",
        route: "/credits",
      },
      {
        label: "Profile",
        route: "/profile",
      },
    ],
  },
]);

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

async function getUserProfileFromCookie() {
  const userTokenCookie = await getCookieAsync("u_TOK");
  const userProfileCookie = await getCookieAsync("u_PRO");

  if (userProfileCookie) {
    const token = JSON.parse(decodeURIComponent(userTokenCookie));
    const userProfile = JSON.parse(decodeURIComponent(userProfileCookie));
    userProfileData.value = userProfile;
    fullName.value = `${userProfile.firstName} ${userProfile.lastName}`;
    email.value = userProfile.email;
    profilePhoto.value = userProfile.profilePicture;
    // Perform additional actions with the user profile
  } else {
    console.log("User token cookie not found");
  }
}

function deleteAllCookies() {
  // Get all cookies as an array of name=value pairs
  const cookies = document.cookie.split(";");

  // Loop through each cookie
  for (let cookie of cookies) {
    // Get the cookie name by splitting the pair
    const cookieName = cookie.split("=")[0].trim();

    // Delete the cookie by setting its expiration date to the past
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}
</script>

<template>
  <nav class="mt-5 border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl shadow-md bg-white rounded-3xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="../../assets/img//authimages/loyaltilinx-web-favicon.png"
          class="h-8"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Loyalty</span
        >
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <DropDownUser :item="userProfileData" />

        <button
          data-collapse-toggle="navbar-cta"
          type="button"
          class="inline-flex bg-gray-100 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-cta"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <template v-for="menuGroup in menuGroups" :key="menuGroup.label">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <NavbarItem
              v-for="(menuItem, index) in menuGroup.menutItems"
              :item="menuItem"
              :key="index"
              :index="index"
            />
          </ul>
        </template>
      </div>
    </div>
  </nav>
</template>
