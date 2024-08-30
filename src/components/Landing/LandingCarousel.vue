<script setup>
import { ref, onMounted } from "vue";
import { initCarousels } from "flowbite";

const props = defineProps(["item"]);

onMounted(() => {
  initCarousels();
});


</script>

<template>
  <div id="default-carousel " class="w-full" data-carousel="slide">
    <!-- Carousel wrapper -->

    <div class="relative bg-white h-40 mb-5 overflow-hidden rounded-sm md:h-96">
      <template
        v-for="carouselImage in item"
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
  <!-- <div id="default-carousel" class="relative w-full" data-carousel="slide">
    <div class="relative h-100 overflow-hidden rounded-lg md:h-96">
      <div class="hidden duration-500 ease-in-out" data-carousel-item>
        <div class="carousel-card bg-white mx-auto">
          <div>
            <img src="../../assets/img/landing/blackman.png" alt="..." />
          </div>
          <div class="card-content">
            <h2>Card Title</h2>
            <p>Card description</p>
          </div>
        </div>
      </div>
      <div class="hidden duration-300 ease-in-out" data-carousel-item>
        <div class="carousel-card bg-white mx-auto">
          <img src="../../assets/img/landing/whiteman.png" alt="..." />
          <div class="card-content">
            <h2>Card Title</h2>
            <p>Card description</p>
          </div>
        </div>
      </div>
      <div class="hidden duration-300 ease-in-out" data-carousel-item>
        <div class="carousel-card bg-white mx-auto">
          <img src="../../assets/img/landing/women.png" alt="..." />
          <div class="card-content">
            <h2>Card Title</h2>
            <p>Card description</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"
    >
      <button
        type="button"
        class="w-3 h-3 rounded-full"
        aria-current="true"
        aria-label="Slide 1"
        data-carousel-slide-to="0"
      ></button>
      <button
        type="button"
        class="w-3 h-3 rounded-full"
        aria-current="false"
        aria-label="Slide 2"
        data-carousel-slide-to="1"
      ></button>
      <button
        type="button"
        class="w-3 h-3 rounded-full"
        aria-current="false"
        aria-label="Slide 3"
        data-carousel-slide-to="2"
      ></button>
    </div>
    <button
      type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div> -->
</template>

<style>
/* .carousel-card {
  @apply flex flex-col justify-center p-4;
  width: 100%;
  max-width: 300px;
  height: 100%;
  margin-block: 0 auto;
  border: 1px sold #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.carousel-card img {
  @apply w-full h-48 object-cover rounded-t-md;
}

.carousel-card .card-content {
  @apply p-4;
}

.carousel-card .card-content h2 {
  @apply text-lg font-bold;
}

.carousel-card .card-content p {
  @apply text-gray-600;
} */
</style>
