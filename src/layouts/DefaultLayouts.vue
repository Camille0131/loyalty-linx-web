<script setup>
import NavbarArea from "../components/NavBar/NavbarArea.vue";
import BottomNavigation from "../components/NavBar/BottomNavigation.vue";
</script>

<template>
  <!-- Page Wrapper Start -->
  <div>
    <!-- Content Wrapper Start -->
    <div>
      <div class="flex bg-gray-100 flex-1 flex-col">
        <!-- Header Start -->
        <NavbarArea />
        <!-- Header End -->
      </div>

      <!-- Main Content Start -->
      <main>
        <div class="bg-gray-100">
          <div class="mx-auto">
            <slot></slot>
          </div>
        </div>
      </main>
      <!-- Main Content End -->
    </div>
    <!-- Content Wrapper End -->
  </div>
  <BottomNavigation />

  <!-- Page Wrapper End -->
</template>
