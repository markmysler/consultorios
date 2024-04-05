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
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import { firebaseApp } from "./firebase/init";
import Ripple from "primevue/ripple";

const app = createApp(App);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Password", Password);
app.component("FloatLabel", FloatLabel);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });
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
