<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <div class="mt-6 py-2">
    <label :for="id" class="block text-sm font-medium leading-5 text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :id="id"
        :value="value"
        :readonly="readonly"
        :name="name"
        :type="type"
        :required="required"
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
</template>
