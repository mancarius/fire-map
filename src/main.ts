import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import "@/assets/styles/style.scss";

const app = createApp(App).use(store).use(router);

app.component("Datepicker", Datepicker);

app.mount("#app");