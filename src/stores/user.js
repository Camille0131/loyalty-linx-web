import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    removeToken() {
      this.token = null;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "token",
        storage: localStorage,
      },
    ],
  },
});
