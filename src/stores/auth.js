import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

const authStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
    token: null,
  }),
  actions: {
    login(token) {
      this.isAuthenticated = true;
      this.token = token;
      localStorage.setItem("a_TOK", token);
    },
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem("a_TOK");
    },
  },
  persist: useStorage("auth"),
});

export default authStore;
