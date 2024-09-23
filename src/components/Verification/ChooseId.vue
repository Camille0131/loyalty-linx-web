<script setup>
import { ref, onMounted } from "vue";
import ModalPhoto from "../modal/ModalPhoto.vue";
import { useRouter } from "vue-router";

const video = ref(null);
const router = useRouter();

onMounted(() => {
  video.value = document.getElementById("video");
});

const ids = ref([
  "Driver's License",
  "UMID",
  "Passport",
  "Nationals ID",
  "SSS ID",
  "TIN ID",
  "Voters ID",
  "Philhealth Card",

  // add more IDs to the list
]);

const selectedId = ref(null);
const canvas = ref(null);
const photo = ref(null);

const handleSelectId = (id) => {
  sessionStorage.setItem("idType", JSON.stringify(id));
  router.push({ name: "take/id" });
  // selectedId.value = id;
  // navigator.mediaDevices
  //   .getUserMedia({ video: true })
  //   .then((stream) => {
  //     video.value.srcObject = stream;
  //     video.value.play();
  //   })
  //   .catch((error) => console.error("Error accessing camera:", error));
};

// const takePhoto = () => {
//   canvas.value
//     .getContext("2d")
//     .drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
//   const imageData = canvas.value.toDataURL();
//   photo.value = imageData;
//   console.log("Photo taken:", photo.value);
//   // selectedId.value = null; // close the modal after taking a photo
// };
</script>

<template>
  <div class="p-5">
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
  <div class="px-4 py-8">
    <div class="flex">
      <div
        class="w-20 mx-1 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-yellow-400 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
      <div
        class="w-20 mx-1 bg-gray-300 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-gray-200 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
      <div
        class="w-20 mx-1 bg-gray-300 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-gray-200 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
    </div>
    <div>
      <h2 class="font-bold text-lg">Choose your id</h2>
    </div>
    <div class="flex items-center p-2 mt-8">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512.001 512.001"
        xml:space="preserve"
        class="w-8"
      >
        <rect
          x="221.871"
          y="81.104"
          style="fill: #f95428"
          width="68.26"
          height="65.353"
        />
        <path
          style="fill: #2ba5f7"
          d="M163.233,335.169v36.026H98.765v-36.026c0-17.798,14.436-32.234,32.234-32.234
	c8.912,0,16.964,3.615,22.791,9.443C159.63,318.205,163.233,326.27,163.233,335.169z"
        />
        <path
          style="fill: #f7b239"
          d="M130.999,238.48c17.811,0,32.234,14.423,32.234,32.234c0,17.798-14.423,32.221-32.234,32.221
	c-17.798,0-32.234-14.423-32.234-32.221C98.765,252.903,113.201,238.48,130.999,238.48z"
        />
        <path
          style="fill: #f95428"
          d="M200.523,202.454v168.741h-37.29v-36.026c0-8.899-3.603-16.964-9.443-22.791
	c-5.827-5.827-13.88-9.443-22.791-9.443c17.811,0,32.234-14.423,32.234-32.221c0-17.811-14.423-32.234-32.234-32.234
	c-17.798,0-32.234,14.423-32.234,32.234c0,17.798,14.436,32.221,32.234,32.221c-17.798,0-32.234,14.436-32.234,32.234v36.026H65.911
	V202.454L200.523,202.454L200.523,202.454z"
        />
        <path
          style="fill: #f7b239"
          d="M502.523,185.452v206.449c0,21.54-17.47,38.997-39.009,38.997H48.48
	c-21.54,0-38.997-17.457-38.997-38.997V185.452c0-21.54,17.457-38.997,38.997-38.997h173.393h68.26h173.381
	C485.054,146.455,502.523,163.912,502.523,185.452z M200.523,371.195V202.454H65.911v168.742h32.853h64.468H200.523z"
        />
        <path
          style="fill: #e09b2d"
          d="M39.974,391.901V185.452c0-21.54,17.457-38.997,38.997-38.997h-30.49
	c-21.54,0-38.997,17.457-38.997,38.997v206.449c0,21.54,17.457,38.997,38.997,38.997h30.49
	C57.429,430.898,39.974,413.441,39.974,391.901z"
        />
        <g>
          <path
            style="fill: #ffffff"
            d="M470.921,370.74c-5.237,0-9.481-4.245-9.481-9.481V187.309c-4.24-0.946-7.406-4.729-7.406-9.253
		c0-5.236,4.243-9.481,9.481-9.481c9.311,0,16.887,7.571,16.887,16.875V361.26C480.402,366.495,476.158,370.74,470.921,370.74z"
          />
          <path
            style="fill: #ffffff"
            d="M176.998,253.181c-5.237,0-9.481-4.245-9.481-9.481v-16.433c0-5.236,4.243-9.481,9.481-9.481
		c5.237,0,9.481,4.245,9.481,9.481v16.433C186.479,248.936,182.235,253.181,176.998,253.181z"
          />
          <path
            style="fill: #ffffff"
            d="M264.852,129.934c-5.237,0-9.481-4.245-9.481-9.481V104.02c0-5.236,4.244-9.481,9.481-9.481
		s9.481,4.245,9.481,9.481v16.433C274.332,125.689,270.089,129.934,264.852,129.934z"
          />
          <circle style="fill: #ffffff" cx="470.919" cy="391.902" r="9.481" />
        </g>
        <g>
          <path
            style="fill: #333333"
            d="M463.52,136.97H299.609V81.105c0-5.236-4.243-9.481-9.481-9.481h-68.256
		c-5.237,0-9.481,4.245-9.481,9.481v55.865H48.481C21.748,136.97,0,158.719,0,185.451v206.445c0,26.731,21.748,48.481,48.481,48.481
		H463.52c26.731,0,48.481-21.748,48.481-48.481V185.451C512,158.719,490.252,136.97,463.52,136.97z M231.352,90.586h49.295v46.384
		h-49.295V90.586z M493.039,391.896c0,16.276-13.242,29.52-29.52,29.52H48.481c-16.278,0-29.52-13.242-29.52-29.52V185.451
		c0-16.276,13.242-29.52,29.52-29.52H463.52c16.277,0,29.52,13.242,29.52,29.52v206.445H493.039z"
          />
          <path
            style="fill: #333333"
            d="M200.524,192.971H65.908c-5.237,0-9.481,4.245-9.481,9.481v168.745c0,5.236,4.243,9.481,9.481,9.481
		h134.616c5.237,0,9.481-4.245,9.481-9.481V202.451C210.005,197.215,205.76,192.971,200.524,192.971z M108.253,361.716v-26.544
		c0-12.545,10.206-22.752,22.751-22.752c12.546,0,22.752,10.206,22.752,22.752v26.544H108.253z M131.004,293.458
		c-12.546,0-22.752-10.206-22.752-22.752s10.206-22.752,22.752-22.752s22.752,10.206,22.752,22.752S143.55,293.458,131.004,293.458z
		 M191.044,361.716h-18.327v-26.544c0-12.978-5.961-24.589-15.286-32.245c9.318-7.656,15.286-19.247,15.286-32.219
		c0-23-18.713-41.713-41.713-41.713s-41.713,18.712-41.713,41.713c0,12.972,5.966,24.565,15.284,32.221
		c-9.323,7.657-15.283,19.266-15.283,32.243v26.544H75.388V211.932h115.655V361.716z"
          />
          <path
            style="fill: #333333"
            d="M441.951,227.098H288.374c-5.237,0-9.481,4.245-9.481,9.481c0,5.236,4.243,9.481,9.481,9.481
		h153.578c5.237,0,9.481-4.245,9.481-9.481C451.432,231.343,447.188,227.098,441.951,227.098z"
          />
          <path
            style="fill: #333333"
            d="M441.951,260.595h-94.802c-5.237,0-9.481,4.245-9.481,9.481c0,5.236,4.243,9.481,9.481,9.481h94.802
		c5.237,0,9.481-4.245,9.481-9.481C451.432,264.84,447.188,260.595,441.951,260.595z"
          />
          <path
            style="fill: #333333"
            d="M441.951,294.09H288.374c-5.237,0-9.481,4.245-9.481,9.481s4.243,9.481,9.481,9.481h153.578
		c5.237,0,9.481-4.245,9.481-9.481S447.188,294.09,441.951,294.09z"
          />
          <path
            style="fill: #333333"
            d="M441.951,327.587h-94.802c-5.237,0-9.481,4.245-9.481,9.481c0,5.236,4.243,9.481,9.481,9.481h94.802
		c5.237,0,9.481-4.245,9.481-9.481C451.432,331.832,447.188,327.587,441.951,327.587z"
          />
        </g>
      </svg>
      <span class="px-2 font-semibold"> RECOMMENDED ID</span>
    </div>
    <ul>
      <li
        class="px-2 py-4 text-lg font-medium border-t-2 flex justify-between hover:bg-gray-200"
        v-for="id in ids"
        :key="id"
        @click="handleSelectId(id)"
      >
        <h2>{{ id }}</h2>
        <svg
          fill="#000000"
          class="w-5"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xml:space="preserve"
        >
          <path
            id="XMLID_222_"
            d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z"
          />
        </svg>
      </li>
    </ul>
    <ModalPhoto v-if="selectedId" @close="selectedId = null">
      <template #header>
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
            <div class="guide-text">Place your ID within the frame</div>
            <div class="guide-frame"></div>
          </div>
        </div>

        <canvas
          ref="canvas"
          width="100%"
          height="80vh"
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
  box-shadow: 0 0 10000px rgba(0, 0, 0, 3);
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
