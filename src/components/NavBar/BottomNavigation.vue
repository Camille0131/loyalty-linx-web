<script setup></script>

<template>
  <div
    class="fixed z-40 w-full h-16 max-w-lg -translate-x-1/2 bg-white rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
      <router-link
        to="/home"
        class="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <button :class="{ 'active-page': $route.name === 'home' }">
          <svg
            class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-amber-700 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
            />
          </svg>
          <span class="sr-only">Home</span>
        </button>
      </router-link>
      <router-link
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        to="/credits"
      >
        <button
          to="/credits"
          :class="{ 'active-page': $route.name === 'credits' }"
        >
          <svg
            class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-amber-700 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z"
            />
            <path
              d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z"
            />
          </svg>
          <span class="sr-only">Credits</span>
        </button>
      </router-link>
      <div class="flex items-center justify-center">
        <router-link to="/qr">
          <button
            to="/qr"
            :class="{ 'active-page': $route.name === 'qr' }"
            type="button"
            class="p-2 inline-flex items-center justify-center w-10 h-10 font-medium bg-amber-600 rounded-full hover:bg-amber-700 group focus:ring-4 focus:ring-gray-100 focus:outline-none dark:focus:ring-blue-800"
          >
            <svg
              class="w-[2rem] h-[rem]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 4C23 2.34315 21.6569 1 20 1H16C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 21.4477 9 22 9C22.5523 9 23 8.55228 23 8V4Z"
                fill="#FFFFFF
"
              />
              <path
                d="M23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23H20C21.6569 23 23 21.6569 23 20V16Z"
                fill="#FFFFFF
"
              />
              <path
                d="M4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16V20C1 21.6569 2.34315 23 4 23H8C8.55228 23 9 22.5523 9 22C9 21.4477 8.55228 21 8 21H4Z"
                fill="#FFFFFF
"
              />
              <path
                d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8V4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1H4C2.34315 1 1 2.34315 1 4V8Z"
                fill="#FFFFFF
"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 6C11 5.44772 10.5523 5 10 5H6C5.44772 5 5 5.44772 5 6V10C5 10.5523 5.44772 11 6 11H10C10.5523 11 11 10.5523 11 10V6ZM9 7.5C9 7.22386 8.77614 7 8.5 7H7.5C7.22386 7 7 7.22386 7 7.5V8.5C7 8.77614 7.22386 9 7.5 9H8.5C8.77614 9 9 8.77614 9 8.5V7.5Z"
                fill="#FFFFFF
"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18 13C18.5523 13 19 13.4477 19 14V18C19 18.5523 18.5523 19 18 19H14C13.4477 19 13 18.5523 13 18V14C13 13.4477 13.4477 13 14 13H18ZM15 15.5C15 15.2239 15.2239 15 15.5 15H16.5C16.7761 15 17 15.2239 17 15.5V16.5C17 16.7761 16.7761 17 16.5 17H15.5C15.2239 17 15 16.7761 15 16.5V15.5Z"
                fill="#FFFFFF"
              />
              <path
                d="M14 5C13.4477 5 13 5.44772 13 6C13 6.55229 13.4477 7 14 7H16.5C16.7761 7 17 7.22386 17 7.5V10C17 10.5523 17.4477 11 18 11C18.5523 11 19 10.5523 19 10V6C19 5.44772 18.5523 5 18 5H14Z"
                fill="#FFFFFF"
              />
              <path
                d="M14 8C13.4477 8 13 8.44771 13 9V10C13 10.5523 13.4477 11 14 11C14.5523 11 15 10.5523 15 10V9C15 8.44772 14.5523 8 14 8Z"
                fill="#FFFFFF"
              />
              <path
                d="M6 13C5.44772 13 5 13.4477 5 14V16C5 16.5523 5.44772 17 6 17C6.55229 17 7 16.5523 7 16V15.5C7 15.2239 7.22386 15 7.5 15H10C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13H6Z"
                fill="#FFFFFF"
              />
              <path
                d="M10 17C9.44771 17 9 17.4477 9 18C9 18.5523 9.44771 19 10 19C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17Z"
                fill="#FFFFFF"
              />
            </svg>
            <span class="sr-only">New item</span>
          </button>
        </router-link>
      </div>
      <router-link
        to="/points"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <button
          to="/points"
          :class="{ 'active-page': $route.name === 'points' }"
        >
          <!-- <svg
            class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
            />
          </svg> -->
          <svg
            class="w-7 h-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10.8613 9.36335L10.7302 9.59849C10.5862 9.85677 10.5142 9.98591 10.402 10.0711C10.2897 10.1563 10.1499 10.188 9.87035 10.2512L9.61581 10.3088C8.63195 10.5314 8.14001 10.6427 8.02297 11.0191C7.90593 11.3955 8.2413 11.7876 8.91204 12.572L9.08557 12.7749C9.27617 12.9978 9.37147 13.1092 9.41435 13.2471C9.45722 13.385 9.44281 13.5336 9.41399 13.831L9.38776 14.1018C9.28635 15.1482 9.23565 15.6715 9.54206 15.9041C9.84847 16.1367 10.3091 15.9246 11.2303 15.5005L11.4686 15.3907C11.7304 15.2702 11.8613 15.2099 12 15.2099C12.1387 15.2099 12.2696 15.2702 12.5314 15.3907L12.7697 15.5005C13.6909 15.9246 14.1515 16.1367 14.4579 15.9041C14.7644 15.6715 14.7136 15.1482 14.6122 14.1018L14.586 13.831C14.5572 13.5336 14.5428 13.385 14.5857 13.2471C14.6285 13.1092 14.7238 12.9978 14.9144 12.7749L15.088 12.572C15.7587 11.7876 16.0941 11.3955 15.977 11.0191C15.86 10.6427 15.3681 10.5314 14.3842 10.3088L14.1296 10.2512C13.8501 10.188 13.7103 10.1563 13.598 10.0711C13.4858 9.98592 13.4138 9.85678 13.2698 9.5985L13.1387 9.36335C12.6321 8.45445 12.3787 8 12 8C11.6213 8 11.3679 8.45446 10.8613 9.36335Z"
              fill="#6b7280"
              class="group-hover:fill-amber-700"
            />
          </svg>
          <span class="sr-only">Points</span>
        </button>
      </router-link>
      <router-link
        to="/profile"
        class="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <button
          to="/profile"
          :class="{ 'active-page': $route.name === 'profile' }"
        >
          <svg
            class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-amber-700 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
            />
          </svg>
          <span class="sr-only">Profile</span>
        </button>
      </router-link>
    </div>
  </div>
</template>
<style>
.active-page svg {
  fill: #e5641e; /* Change the fill color to your desired color */
}
.active-page svg path {
  fill: #e5641e; /* Change the fill color to your desired blue color */
}
</style>
