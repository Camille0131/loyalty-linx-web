<script setup>
import { ref, onMounted } from "vue";
import CameraModal from "./CameraModal.vue";

const cameraModal = ref(null);

function showCameraModal() {
  cameraModal.value.showCameraModal();
}
</script>
<template>
  <div class="px-4 py-2">
    <router-link to="/profile">
      <svg
        fill="#111827"
        class="w-8"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 26.676 26.676"
        xml:space="preserve"
      >
        <g>
          <path
            d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
		c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
		C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
		c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
		C26.18,21.891,26.141,21.891,26.105,21.891z"
          />
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </g>
      </svg>
    </router-link>
  </div>
  <div class="px-4 py-6">
    <div class="flex">
      <div
        class="w-20 mx-1 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-gray-200 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
      <div
        class="w-20 mx-1 bg-gray-300 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-yellow-400 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
      <div
        class="w-20 mx-1 bg-gray-300 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-gray-200 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
    </div>
    <h2 class="font-bold text-2xl">Face Identity :</h2>
    <div class="container">
      <h1 class="font-semibold text-xl">
        Ready for taking photo selfie with your ID
      </h1>
      <div>
        <img src="../../assets/img/Verification/photo_with_id.png" alt="" />
      </div>
    </div>
    <div class="px-2">
      <p class="mt-2 font-medium text-sm">
        Ensure all details on the ID are visible, including your name, photo,
        and relevant information.
      </p>
      <p class="mt-2 font-medium text-sm">
        Hold your ID next to your face, making sure both are visible in the
        frame and keep a neutral expression and avoid covering any details on
        the ID.
      </p>
      <p class="mt-2 font-medium text-sm">
        Make sure the background is simple and not too cluttered. A plain wall
        or a tidy room works well.
      </p>
    </div>
    <div class="text-center py-10">
      <button
        @click="showCameraModal"
        class="py-2 bg-amber-600 px-20 text-white font-medium rounded-sm hover:bg-amber-700"
      >
        Take ID Selfie
      </button>
      <CameraModal ref="cameraModal" />
    </div>
  </div>
</template>
