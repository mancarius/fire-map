import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Datepicker from "vue3-date-time-picker";
import VueToast from "vue-toast-notification";
import "vue3-date-time-picker/dist/main.css";
import "@/assets/styles/style.scss";
import "vue-toast-notification/dist/theme-default.css";

const app = createApp(App).use(store).use(router).use(VueToast);

app.component("Datepicker", Datepicker);

app.mount("#app");
