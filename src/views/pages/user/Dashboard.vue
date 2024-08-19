<script setup>
// initialize components based on data attribute selectors
import { onMounted } from "vue";
import { ref } from "vue";

import { initFlowbite } from "flowbite";
import { RouterLink } from "vue-router";
import DefaultLayouts from "../../../layouts/DefaultLayouts.vue";
import Home from "../../../components/Home.vue";
import DataStatsOne from "../../../components/DataStats/DataStatsOne.vue";
import ChartOne from "../../../components/Charts/ChartOne.vue";
import ChartTwo from "../../../components/Charts/ChartTwo.vue";
import ChartThree from "../../../components/Charts/ChartThree.vue";

const pageTitle = ref("Home");
</script>

<template>
  <DefaultLayouts>
    <div class="mx-auto max-w-screen-2xl py-2">
      <Home />
    </div>
  </DefaultLayouts>
</template>
