<script setup>
import { ref } from "vue";

const carouselImages = ref([
  {
    carouselItem: [
      {
        // url: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
        name: "image1",
        path: new URL(
          "../../assets/img/carousel/carousel-01.jpg",
          import.meta.url
        ).href,
      },
      {
        // url: "https://flowbite.com/docs/images/carousel/carousel-2.svg",
        name: "image2",
        path: new URL(
          "../../assets/img/carousel/carousel-02.jpg",
          import.meta.url
        ).href,
      },
      {
        // url: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
        name: "image3",
        path: new URL(
          "../../assets/img/carousel/carousel-03.jpg",
          import.meta.url
        ).href,
      },
      {
        // url: "https://flowbite.com/docs/images/carousel/carousel-4.svg",
        name: "image4",
        path: new URL(
          "../../assets/img/carousel/carousel-03.jpg",
          import.meta.url
        ).href,
      },
    ],
  },
]);
const activeIndex = ref(0);
</script>

<template>
  <div
    id="default-carousel"
    class="relative w-full relative"
    data-carousel="slide"
  >
    <div class="absolute z-40 w-full bg-yellow-500 rounded-sm p-2">
      <h1 class="text-2xl font-semibold text-white">
        Whats new? Heres our deals today!
      </h1>
    </div>
    <!-- Carousel wrapper -->

    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
      <template
        v-for="carouselImage in carouselImages"
        :key="carouselImage.name"
      >
        <!-- Item 1 -->
        <div
          v-for="(carouselItem, index) in carouselImage.carouselItem"
          :key="index"
          class="hidden duration-700 ease-in-out"
          data-carousel-item
        >
          <img
            :src="carouselItem.path"
            :index="index"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>

        <div
          class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"
        >
          <button
            v-for="(caroulItem, index) in carouselImage.carouselItem"
            :key="index"
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current="true"
            data-carousel-slide-to="0"
          ></button>
        </div>
      </template>
    </div>
  </div>
</template>
