import "./assets/main.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";
import Button from "primevue/button";

const app = createApp(App);
app.component("Button", Button);

app.use(createPinia());
app.use(router);

app.use(PrimeVue);
app.mount("#app");
