<!-- ModalPreview.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const photo = ref(null);

const handleRetake = () => {
  router.back();
};

const photoUrl = route.params.photo;

const handleConfirm = () => {
  fetch(photoUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Store the base64 string in localStorage or use it as needed
        localStorage.setItem("takenSelfiePhoto", base64String);
      };
      reader.readAsDataURL(blob);
    });
  router.push({ name: "fill/information" });
};

onMounted(() => {
  photo.value = route.params.photo;
});
</script>

<template>
  <div class="py-20">
    <img :src="$route.params.photo" alt="Taken photo" />
  </div>

  <div class="flex justify-evenly px-10 py-20">
    <button>
      <p>
        <svg
          @click="handleRetake"
          class="w-15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5 15C18.9558 18.0448 15.7622 21 12 21C7.14776 21 3.58529 17.5101 3 13"
            stroke="#323232"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M3.5 9C4.89106 5.64934 8.0647 3 12 3C16.7819 3 20.4232 6.48993 21 11"
            stroke="#323232"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M21 21L21 15.6C21 15.2686 20.7314 15 20.4 15V15L15 15"
            stroke="#323232"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 9L3.6 9V9C3.26863 9 3 8.73137 3 8.4L3 3"
            stroke="#323232"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </p>
    </button>
    <button>
      <p>
        <svg
          @click="handleConfirm"
          fill="#000000"
          class="w-15"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 492 492"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M484.128,104.478l-16.116-16.116c-5.064-5.068-11.816-7.856-19.024-7.856c-7.208,0-13.964,2.788-19.028,7.856
			L203.508,314.81L62.024,173.322c-5.064-5.06-11.82-7.852-19.028-7.852c-7.204,0-13.956,2.792-19.024,7.852l-16.12,16.112
			C2.784,194.51,0,201.27,0,208.47c0,7.204,2.784,13.96,7.852,19.028l159.744,159.736c0.212,0.3,0.436,0.58,0.696,0.836
			l16.12,15.852c5.064,5.048,11.82,7.572,19.084,7.572h0.084c7.212,0,13.968-2.524,19.024-7.572l16.124-15.992
			c0.26-0.256,0.48-0.468,0.612-0.684l244.784-244.76C494.624,132.01,494.624,114.966,484.128,104.478z"
              />
            </g>
          </g>
        </svg>
      </p>
    </button>
  </div>
</template>

<style>
.modal-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-preview img {
  max-width: 100%;
  max-height: 100vh;
  object-fit: contain;
}
</style>
