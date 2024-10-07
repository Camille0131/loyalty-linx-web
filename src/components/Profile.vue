<script setup>
import { ref } from "vue";
import ProfileSettings from "./Profile/ProfileSettings.vue";
// getUserProfileFromCookie();
const userProfileData = ref("");

userProfileData.value = JSON.parse(localStorage.getItem("u_data"));

// async function getCookieAsync(name) {
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
// async function getUserProfileFromCookie() {
//   const userProfileCookie = await getCookieAsync("u_PRO");

//   if (userProfileCookie) {
//     // const userProfile = JSON.parse(decodeURIComponent(userProfileCookie));
//     userProfileData.value = userProfile;
//     console.log(userProfile);
//   } else {
//     console.log("User token cookie not found");
//   }
// }
</script>

<template>
  <div>
    <ProfileSettings :item="userProfileData" />
  </div>
</template>
