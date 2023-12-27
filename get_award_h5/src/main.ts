import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Popup, Toast } from "vant";
import "vant/lib/index.css";

const app = createApp(App);
app.component(Popup.name, Popup);
app.use(Toast);
app.use(router);
app.mount("#app");
