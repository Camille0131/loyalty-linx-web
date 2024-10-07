import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import index from "./router/index";
import { createPinia } from "pinia";
import "sweetalert2/src/sweetalert2.scss";
import persist from "pinia-plugin-persist";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const globalOptions = {
  mode: "auto",
};

const app = createApp(App);
const pinia = createPinia();
pinia.use(persist);
app.use(VueTelInput, globalOptions); // Define default global options here (optional)
app.use(pinia);
app.use(index);
app.mount("#app");
