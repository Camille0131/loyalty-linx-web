<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import InputComponent from "./InputComponent.vue";

const router = useRouter();

const takenPhoto = localStorage.getItem("takenPhoto");
const takenSelfirePhoto = localStorage.getItem("takenPhoto");
const bDay = JSON.parse(localStorage.getItem("b-day"));
const address = JSON.parse(localStorage.getItem("address"));
const municipal = JSON.parse(localStorage.getItem("municipal"));
const province = JSON.parse(localStorage.getItem("province"));
const zipcode = JSON.parse(localStorage.getItem("z-code"));
const gender = JSON.parse(localStorage.getItem("gender"));
const incomeSource = JSON.parse(localStorage.getItem("i-source"));
const monthlyIncome = JSON.parse(localStorage.getItem("m-income"));

const verificationEndPoint =
  "http://localhost:5000/api/user/account-verification/update";

console.log(takenPhoto);

const handleBack = () => {
  router.back();
};

const handleSubmit = async () => {
  try{
  }catch(error){

  }
};
</script>

<template>
  <div>
    <div class="bg-white px-2 pb-6">
      <div class="p-6">
        <svg
          @click="handleBack"
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
      </div>
      <h1 class="font-bold text-lg px-2">Personal info</h1>
      <!-- <div class="mt-6">
        <label for="takenSelfie " class="text-md font-medium px-2">
          Selfie with id
        </label>
      </div>
      <img id="takenSelfie" :src="takenSelfirePhoto" alt="" />
      <div>
        <label for="takenId" class="text-md font-medium px-2"> Valid ID </label>
      </div>
      <img id="takenSelfie" :src="takenPhoto" alt="" /> -->

      <div class="px-2 bg-white">
        <div class="flex">
          <div class="mt-6 py-2">
            <label
              for="bDay"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Birth Date
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input
                id="bDay"
                :value="bDay"
                readonly
                name="bDay"
                type="bDay"
                required="true"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
              <div
                class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="px-2">
            <div class="mt-6 py-2">
              <label
                for="Gender"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Gender
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="Gender"
                  :value="gender"
                  readonly
                  name="Gender"
                  type="Gender"
                  required="true"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <div
                  class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <InputComponent
            id="Address"
            label="Address"
            :value="address"
            readonly
            name="Address"
            type="Address"
            required
          />
        </div>
        <div>
          <InputComponent
            id="Province"
            label="Province"
            :value="province"
            readonly
            name="Province"
            type="Province"
            required
          />
        </div>
        <div class="flex">
          <div>
            <InputComponent
              id="Municipal"
              label="Municipal"
              :value="municipal"
              readonly
              name="Municipal"
              type="Municipal"
              required
            />
          </div>
          <div class="px-2">
            <InputComponent
              id="zipCode"
              label="Zip Code"
              :value="zipcode"
              readonly
              name="zipCode"
              type="zipCode"
              required
            />
          </div>
        </div>
        <div>
          <InputComponent
            id="incomeSource"
            label="Income Source"
            :value="incomeSource"
            readonly
            name="incomeSource"
            type="incomeSource"
            required
          />
        </div>
        <div>
          <InputComponent
            id="monthlyIncome"
            label="Monthly Income"
            :value="monthlyIncome"
            readonly
            name="monthlyIncome"
            type="monthlyIncome"
            required
          />
        </div>

        <div class="mt-6 mb-6">
          <button
            @click="handleSubmit"
            type="submit"
            class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
