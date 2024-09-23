<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const showModal = ref(false);
const cameraPreview = ref(null);
const photo = ref(null);

onMounted(() => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: "user", // Access front camera
      },
    })
    .then((stream) => {
      cameraPreview.value.srcObject = stream;
      cameraPreview.value.play();
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
});

function takePhoto() {
  // Create a canvas element to capture the photo
  const canvas = document.createElement("canvas");
  canvas.width = cameraPreview.value.videoWidth;
  canvas.height = cameraPreview.value.videoHeight;
  const ctx = canvas.getContext("2d");

  // Draw the camera preview on the canvas
  ctx.drawImage(cameraPreview.value, 0, 0, canvas.width, canvas.height);

  // Get the photo data URL

  const imageData = canvas.toDataURL("image/jpeg", 1);
  photo.value = imageData;

  // Do something with the photo data URL (e.g., upload it to a server)

  const photoBlob = dataURLtoBlob(imageData);
  const photoFile = new File([photoBlob], `photo_${Date.now()}.jpg`, {
    type: "image/jpeg",
  });
  router.push({ name: "selfie/preview", params: { photo: imageData } });
  // Hide the modal
  // showModal.value = false;
  // localStorage.setItem("takenPhoto", photoFile);
}
function dataURLtoBlob(dataURL) {
  const bytes = dataURL.split(",");
  const mime = bytes[0].match(/:(.*?);/)[1];
  const byteString = atob(bytes[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mime });
}
function showCameraModal() {
  showModal.value = true;
}

defineExpose({ showCameraModal });
</script>
<template>
  <div
    class="fixed bottom-0 left-0 w-full h-screen bg-white shadow-md rounded-t-lg"
    :class="{ 'translate-y-full': !showModal, 'translate-y-0': showModal }"
  >
    <div class="p-4">
      <video id="camera-preview" ref="cameraPreview"></video>
      <button
        @click="takePhoto"
        class="bg-white rounded-full p-4 border shadow-1 hover:bg-gray-50"
      >
        <div>
          <img
            class="w-10"
            src="../../assets/img/Verification/photo-camera-photocamera-svgrepo-com.svg"
            alt=""
          />
        </div>
      </button>
    </div>
  </div>
</template>
<style>
video {
  object-fit: cover;
  width: 100%;
  height: 80vh; /* or set a specific height */
}
</style>
