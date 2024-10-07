<script setup>
import { ref } from "vue";
import LandingText from "./Landing/LandingText.vue";

import LandingCarousel from "./Landing/LandingCarousel.vue";

const carouselImages = ref([
  {
    carouselItem: [
      {
        name: "image1",
        path: new URL(
          "../assets/img/carousel/cash-back-offer-web-banner.jpg",
          import.meta.url
        ).href,
      },
      {
        name: "image2",
        path: "https://as2.ftcdn.net/v2/jpg/02/48/39/75/1000_F_248397538_OsyBnjShqT7IRsCRIgVSkq5dSWbwRN0g.jpg",
      },
      {
        name: "image3",
        path: "https://static.vecteezy.com/system/resources/previews/015/181/366/large_2x/earn-points-concept-for-loyal-customers-loyalty-program-and-get-rewards-suitable-for-web-landing-page-ui-mobile-app-banner-template-vector.jpg",
      },
      {
        name: "image4",
        path: new URL("../assets/img/carousel/winbanner.jpg", import.meta.url)
          .href,
      },
    ],
  },
]);
const carouselImagesOne = ref([
  {
    carouselItem: [
      {
        name: "image2",
        path: "https://as2.ftcdn.net/v2/jpg/02/48/39/75/1000_F_248397538_OsyBnjShqT7IRsCRIgVSkq5dSWbwRN0g.jpg",
      },
      {
        name: "image1",
        path: new URL(
          "../assets/img/carousel/cash-back-offer-web-banner.jpg",
          import.meta.url
        ).href,
      },

      {
        name: "image4",
        path: new URL("../assets/img/carousel/winbanner.jpg", import.meta.url)
          .href,
      },

      {
        name: "image3",
        path: "https://static.vecteezy.com/system/resources/previews/015/181/366/large_2x/earn-points-concept-for-loyal-customers-loyalty-program-and-get-rewards-suitable-for-web-landing-page-ui-mobile-app-banner-template-vector.jpg",
      },
    ],
  },
]);

const textTitle = ref([
  {
    title: "Seamless Rewards, Simple Credits and Endless Benifits",
    text: "Your Gate Way to Exclusive Rewards and Easy Credit Access",
  },
]);
const text = ref([
  {
    title: "Boost Your Business Collaboration",
    text: "Join forces with other merchants to onlock new potentilas and increase your sales expotentionally!",
  },
]);
</script>

<template>
  <nav class="mt-5 border-gray-200 dark:bg-gray-900">
    <div
      class="max-w-screen-xl shadow-md bg-white rounded-3xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="/src/assets/img/authimages/loyaltilinx-web-favicon.png"
          class="h-8"
          alt="Flowbite Logo"
        />

        <span
          style="font-family: poppins"
          class="text-amber-600 self-center text-xl font-extrabold whitespace-nowrap dark:text-white"
          >Loyalty Linx</span
        >
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <router-link to="/signin">
          <button
            class="text-amber-600 px-2 text-md font-medium hover:text-amber-700"
          >
            Signin
          </button>
        </router-link>
      </div>
    </div>
  </nav>

  <div class="px-2 sm:px-20 md:px-30 lg:px-40 xl:px-90">
    <div class="bg-white mt-4 rounded-sm px-2 py-2">
      <div class="justify-center xl:flex flex-row-reverse">
        <LandingCarousel :item="carouselImagesOne" />
        <div class="my-auto">
          <LandingText :item="textTitle" />
          <div class="flex justify-center">
            <router-link to="/register">
              <button
                class="mx-auto px-5 py-2 my-2 text-lg font-medium bg-amber-600 rounded-md text-white hover:bg-amber-700"
              >
                Join Now
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white mt-4 rounded-sm px-2 py-2">
      <div class="justify-center xl:flex">
        <LandingCarousel :item="carouselImages" />
        <div class="my-auto">
          <LandingText :item="text" />
          <div class="flex justify-center">
            <!-- <router-link to="/register/merchant"> -->
            <button
              class="mx-auto px-5 py-2 my-2 text-lg font-medium bg-amber-600 rounded-md text-white hover:bg-amber-700"
            >
              Join as Partner Merchant
            </button>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
