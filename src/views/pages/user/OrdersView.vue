<script setup>
import DefaultLayouts from "../../../layouts/DefaultLayouts.vue";
import Orders from "../../../components/Orders.vue";
import SideBarLayOut from "../../../layouts/SideBarLayOut.vue";
</script>

<template>
  <DefaultLayouts>
    <div class="containers">
      <Orders />
    </div>
  </DefaultLayouts>
</template>

<style>
@media (min-width: 1000px) {
  .containers {
    padding: 0rem 5rem;
  }
}
@media (min-width: 1400px) {
  .containers {
    padding: 0rem 20rem;
  }
}
</style>
