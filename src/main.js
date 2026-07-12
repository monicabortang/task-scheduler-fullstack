import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Import Vuex store (bukan Pinia)

// Bootstrap & Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Global CSS
import "./assets/main.css";

const app = createApp(App);

app.use(store); // Gunakan Vuex
app.use(router);
app.mount("#app");