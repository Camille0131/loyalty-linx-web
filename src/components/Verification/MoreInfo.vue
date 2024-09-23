<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { initFlowbite } from "flowbite";

const email = ref("");
const Address = ref("");
const birthDate = ref("");
const gender = ref("");
const province = ref("");
const municipality = ref("");
const barangay = ref("");
const incomeSource = ref("");
const monthlyIncome = ref("");
const zipcode = ref("");

const router = useRouter();

const handleBack = () => {
  router.replace({ name: "take/selfie/id" });
};

const provinces = ref([]);
const cities = ref([]);
const barangays = ref([]);

const incomeSources = ref([
  { value: "business", label: "Business" },
  { value: "investment", label: "Investment" },
  { value: "Employed", label: "Employed" },
  { value: "others", label: "Others" },
]);
const monthlyIncomeSalaries = ref([
  { value: "less_than_10k", label: "Less than 10,000" },
  { value: "10k_to_20k", label: "10,000 - 20,000" },
  { value: "20k_to_50k", label: "20,000 - 50,000" },
  { value: "50k_to_100k", label: "50,000 - 100,000" },
  { value: "more_than_100k", label: "More than 100,000" },
]);
async function fetchProvinces() {
  const url = "https://psgc.cloud/api/provinces";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    provinces.value = json;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchCities(provinceCode) {
  const url = `https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    cities.value = json;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchBarangays(citiesCode) {
  const url = `https://psgc.cloud/api/cities-municipalities/${citiesCode}/barangays`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    barangays.value = json;
  } catch (error) {
    console.error(error.message);
  }
}

onMounted(() => {
  fetchProvinces();
  initFlowbite();
});

function handleProvinceChange(value) {
  fetchCities(value);
}

function handleCityChange(value) {
  fetchBarangays(value);
}
const validId = localStorage.getItem("takenPhoto");
const selfie = localStorage.getItem("takenSelfiePhoto");

const handleSubmit = () => {
  localStorage.setItem("b-day", JSON.stringify(birthDate.value));
  localStorage.setItem("z-code", JSON.stringify(zipcode.value));
  localStorage.setItem("gender", JSON.stringify(gender.value));
  localStorage.setItem("province", JSON.stringify(province.value));
  localStorage.setItem("municipal", JSON.stringify(municipality.value));
  localStorage.setItem("address", JSON.stringify(Address.value));
  localStorage.setItem("m-income", JSON.stringify(monthlyIncome.value));
  localStorage.setItem("i-source", JSON.stringify(incomeSource.value));

  router.replace({ name: "fill/confirmation" });
};
</script>
<template>
  <div class="px-4 py-6">
    <div class="p-2">
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
    <div class="flex">
      <div
        class="w-20 mx-1 bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-gray-200 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
      <div
        class="w-20 mx-1 bg-gray-300 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-gray-200 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
      <div
        class="w-20 mx-1 bg-gray-300 rounded-full h-2.5 mb-4 dark:bg-gray-700"
      >
        <div class="bg-yellow-400 h-2.5 rounded-full" style="width: 100%"></div>
      </div>
    </div>
    <h2 class="font-medium">Tell us more about your self</h2>
    <p>Please fill up all the information</p>
    <div>
      <form action="" @submit.prevent="handleSubmit">
        <div class="mt-6">
          <label
            for="email"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Birth date
          </label>

          <div class="mt-1 relative max-w-sm">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                />
              </svg>
            </div>
            <input
              v-model="birthDate"
              id="datepicker-autohide"
              datepicker
              datepicker-autohide
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div class="mt-6">
          <label
            for="gender"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Gender
          </label>
          <select
            v-model="gender"
            id="gender"
            class="mt-1 block w-full pl-3 py-2 text-base border text-gray-700 border-gray-300 rounded-md sm:text-sm"
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div class="mt-6">
          <label
            for="Address"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Address
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              v-model="Address"
              id="Address"
              name="Address"
              type="Address"
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
          <p class="text-gray-400 text-xs">Block, Street, Brgy</p>
        </div>
        <div>
          <div class="mt-6">
            <label
              for="province"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Province
            </label>
            <select
              v-model="province"
              id="province"
              class="mt-1 w-full rounded-md border border-gray-300 outline-none"
              @change="handleProvinceChange($event.target.value)"
            >
              <option value="-1" selected></option>
              <option
                v-for="province in provinces"
                :value="province.name"
                :key="province.code"
              >
                {{ province.name }}
              </option>
            </select>
          </div>
          <div class="flex justify-between">
            <div class="mt-6 flex-1">
              <label
                for="municipal"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Municipalities
              </label>
              <select
                v-model="municipality"
                id="municipal"
                class="mt-1 w-full rounded-md border border-gray-300 outline-none"
                @change="handleCityChange($event.target.value)"
              >
                <option value="-1" selected></option>
                <option
                  v-for="city in cities"
                  :value="city.name"
                  :key="city.code"
                >
                  {{ city.name }}
                </option>
              </select>
            </div>
            <div class="mt-6 flex-1">
              <div class="px-4">
                <label
                  for="zip-input"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >ZIP code</label
                >
                <div class="relative mt-1">
                  <div
                    class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path
                        d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="zipcode"
                    type="text"
                    maxlength="4"
                    id="zip-input"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0000"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="mt-6">
            <label
              for="barangay"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Barangay
            </label>
            <select
              v-model="barangay"
              id="barangay"
              class="mt-1 w-full rounded-md border border-gray-300 outline-none"
            >
              <option value="-1" selected></option>
              <option
                v-for="barangay in barangays"
                :value="barangay.name"
                :key="barangay.code"
              >
                {{ barangay.name }}
              </option>
            </select>
          </div> -->
        </div>

        <div>
          <div class="mt-6">
            <label
              for="incomeSource"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Income Source
            </label>
            <select
              v-model="incomeSource"
              class="mt-1 w-full rounded-md border border-gray-300 outline-none"
              id="incomeSource"
            >
              <option value="-1" selected></option>
              <option
                v-for="incomeSource in incomeSources"
                :value="incomeSource.label"
                :key="incomeSource.value"
              >
                {{ incomeSource.label }}
              </option>
            </select>
          </div>

          <div class="mt-6 mb-20">
            <label
              for="monthlyIncome"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Monthly Income
            </label>
            <select
              v-model="monthlyIncome"
              class="mt-1 w-full rounded-md border border-gray-300 outline-none"
              id="monthlyIncome"
            >
              <option value="-1" selected></option>
              <option
                v-for="monthlyIncomeSalary in monthlyIncomeSalaries"
                :value="monthlyIncomeSalary.value"
                :key="monthlyIncomeSalary.value"
              >
                {{ monthlyIncomeSalary.label }}
              </option>
            </select>
            <div class="!mt-8">
              <button
                type="submit"
                class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
select:focus {
  border: none;
  box-shadow: none;
}

input:focus {
  border: none;
  box-shadow: none;
}

#Address:focus,
#Gender:focus,
#datepicker-autohide:focus {
  border: 1px #ffb300 solid;
  box-shadow: none;
}
</style>
