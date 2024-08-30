<script setup>
import { ref } from "vue";
const props = defineProps(["item"]);
</script>

<template>
  <div v-for="item in item" :key="item.title">
    <h1 class="text-xl text-center px-6 font-bold">{{ item.title }}</h1>
    <h2 class="text-md text-center px-4 font-medium">{{ item.text }}</h2>
  </div>
</template>
