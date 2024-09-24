import "./assets/main.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { VueFire, VueFireAuth } from "vuefire";
import App from "./App.vue";
import router from "./router";
import { firebaseApp } from "./firebase/init";
import Ripple from "primevue/ripple";
// componentes
import { importComponents } from "@/utils/importComponents.js";
import ToastService from 'primevue/toastservice';

const app = createApp(App);
// componentes
importComponents(app);
app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.directive("ripple", Ripple);
app.use(VueFire, {
	// imported above but could also just be created here
	firebaseApp,
	modules: [
		// we will see other modules later on
		VueFireAuth(),
	],
});
app.mount("#app");
