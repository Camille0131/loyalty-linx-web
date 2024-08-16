<script setup>
// initialize components based on data attribute selectors
import { onMounted } from "vue";
import { ref } from "vue";

import { initFlowbite } from "flowbite";
import { RouterLink } from "vue-router";
import DefaultLayouts from "../../../layouts/DefaultLayouts.vue";
import Home from "../../../components/Home.vue";

const pageTitle = ref("Home");

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <DefaultLayouts>
    <div class="mx-auto max-w-screen-2xl py-6">
      <Home />
    </div>
  </DefaultLayouts>
</template>
