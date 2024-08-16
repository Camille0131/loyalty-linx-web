<script setup>
import { useRoute } from "vue-router";
import { useNavBarStore } from "..//../stores/navbar";
import { onMounted } from "vue";

const navbarStore = useNavBarStore();

const props = defineProps(["item", "index"]);
const currentPage = useRoute().name;

const handleItemClick = () => {
  const pageName =
    navbarStore.page === props.item.label ? "" : props.item.label;
  navbarStore.page = pageName;
  // if (navbarStore.page !== label) {
  //   navbarStore.page = label;
  // } else {
  //   navbarStore.page = "";
  // }
  // if (props.item.children) {
  //   return props.item.children.some(
  //     /**
  //      *  @param {Object} child
  //      *  @param {string} child.label
  //      */
  //     (child) => navbarStore.selected === child.label
  //   );
  // }
};
</script>

<template>
  <li>
    <router-link
      :to="item.route"
      class="block py-2 px-3 font-semibold md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-700 md:dark:hover:text-amber-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
      aria-current="page"
      :class="{
        'underline underline-offset-8 text-amber-900 decoration-amber-500 decoration-2 ':
          navbarStore.page === item.label,
      }"
      @click.prevent="handleItemClick(item.label)"
      >{{ item.label }}
    </router-link>
  </li>
</template>
