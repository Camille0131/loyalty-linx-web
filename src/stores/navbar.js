import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useNavBarStore = defineStore("navbar", () => {
  const selected = useStorage("selected", ref("Services"));
  const page = useStorage("page", ref("Dashboard"));

  return { selected, page };
});
