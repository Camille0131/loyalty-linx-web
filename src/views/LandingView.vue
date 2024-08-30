<script setup>
import { ref, onMounted } from "vue";
import Landing from "../components/Landing.vue";
const count = ref(0);
let show = true;

function showText() {
  show = !show;
}
</script>

<template>
  <div class="bg-slate-100 py-4 px-2">
    <Landing />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
