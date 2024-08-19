<script setup>
import { ref, onMounted } from "vue";
import { initCollapses } from "flowbite";
import { initCarousels } from "flowbite";

onMounted(() => {
  initCarousels();
});
const carouselImages = ref([
  {
    carouselItem: [
      {
        name: "image1",
        path: new URL(
          "../../assets/img/carousel/carousel-01.jpg",
          import.meta.url
        ).href,
      },
      {
        name: "image2",
        path: new URL(
          "../../assets/img/carousel/carousel-02.jpg",
          import.meta.url
        ).href,
      },
      {
        name: "image3",
        path: new URL(
          "../../assets/img/carousel/carousel-03.jpg",
          import.meta.url
        ).href,
      },
      {
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
  <div class="p-2 bg-white">
    <h2 class="font-bold">Whats new?</h2>
    <p class="text-[.8rem] md:text-[.9rem] font-semibold">
      Experience and join our exciting updates!
    </p>
    <div class="h-px w-full bg-slate-200"></div>
  </div>
  <div id="default-carousel " class="w-full" data-carousel="slide">
    <!-- Carousel wrapper -->

    <div class="relative bg-white h-40 mb-5 overflow-hidden rounded-lg md:h-96">
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
            class="object-contain absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
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
