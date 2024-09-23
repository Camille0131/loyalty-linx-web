<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ModalPhoto from "../modal/ModalPhoto.vue";

const router = useRouter();
const selectedId = ref("");
const video = ref(null);
const canvas = ref(null);
const photo = ref(null);
const previewModal = ref(false); // New ref for the preview modal

const handelClose = () => {
  // router.replace({ name: "choose/id" });
  router.back();
};
const takePhoto = () => {
  // const canvase = canvas.value;
  // const videos = video.value;
  // const ctx = canvase.getContext("2d");
  // ctx.fillRect(0, 0, canvase.width, canvase.height); // Fill the canvas with transparent color
  // ctx.drawImage(videos, 0, 0, canvase.width, canvase.height);
  // const imageData = canvase.toDataURL("image/jpeg", 1);
  // photo.value = imageData;
  // console.log("Photo taken:", photo.value);
  // // previewModal.value = true;
  // // Save the photo to local storage
  // const photoBlob = dataURLtoBlob(imageData);
  // const photoFile = new File([photoBlob], `photo_${Date.now()}.jpg`, {
  //   type: "image/jpeg",
  // });
  // localStorage.setItem("takenPhoto", photoFile);
  // router.push({ name: "preview/id", params: { photo: imageData } });
  const canvase = canvas.value;
  const videos = video.value;
  const ctx = canvase.getContext("2d");

  // Clear the canvas with a transparent fill
  ctx.fillStyle = "rgba(0, 0, 0, 0)"; // Transparent fill
  ctx.clearRect(0, 0, canvase.width, canvase.height);

  // Draw the video frame onto the canvas
  ctx.drawImage(videos, 0, 0, canvase.width, canvase.height);

  // Get the image data from the canvas
  const imageData = canvase.toDataURL("image/jpeg", 1);
  photo.value = imageData;
  // console.log("Photo taken:", photo.value);

  // Save the photo to local storage
  const photoBlob = dataURLtoBlob(imageData);
  const photoFile = new File([photoBlob], `photo_${Date.now()}.jpg`, {
    type: "image/jpeg",
  });


  // Navigate to the preview page
  router.push({ name: "preview/id", params: { photo: imageData } });
};

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
onMounted(() => {
  selectedId.value = JSON.parse(sessionStorage.getItem("idType"));

  navigator.mediaDevices
    .getUserMedia({ video: { width: 1280, height: 720 } })

    .then((stream) => {
      video.value.srcObject = stream;
      video.value.play(); // Access the video element using video.value
    })
    .catch((error) => {
      console.error("Error accessing camera:", error);
    });
});
</script>

<template>
  <div>
    <ModalPhoto v-if="selectedId" @close="selectedId = null">
      <template #header>
        <div class="py-6">
          <svg
            @click="handelClose"
            fill="#000000"
            class="w-8"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1792 1792"
            xml:space="preserve"
          >
            <path
              d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4
	c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1
	c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"
            />
          </svg>
        </div>
        <h2 class="font-bold text-lg">
          Take a photo of your {{ selectedId }}:
        </h2>
      </template>
      <template #body>
        <div class="camera-guide">
          <video ref="video"></video>
          <div class="guide-overlay">
            <div class="guide-bg">
              <div class="flex justify-center mt-10">
                <button @click="takePhoto" class="bg-white rounded-full p-4">
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
            <div class="guide-text mt-6">
              Place your Front ID within the frame
            </div>
            <div class="guide-frame"></div>
          </div>
        </div>

        <canvas
          ref="canvas"
          width="1280"
          height="720"
          style="display: none"
        ></canvas>
      </template>
    </ModalPhoto>
  </div>
</template>
<style>
video {
  object-fit: cover;
  width: 100%;
  height: 80vh; /* or set a specific height */
}
.camera-guide {
  position: relative;
}

.guide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

.guide-text {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
}

.guide-frame {
  margin-top: 2rem;
  width: 95%;
  height: 30%;
  border: 2px solid #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10000px rgba(0, 0, 0, 9);
}

.guide-bg {
  width: 110%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.frame-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
}
</style>
