<script setup>
import Landing from "./views/Landing.vue";
import login from "./views/auth/Login.vue";
import register from "./views/auth/Register.vue";
import { RouterView } from "vue-router";


</script>

<template>
  <!-- <Landing msg="Loyaly Linx" /> -->
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
