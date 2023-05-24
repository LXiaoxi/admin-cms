import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import xxRequest from "./service";
import router from "./router";
import pinia from "./store";
import { registerIcons } from "./global/register-icon";
import "element-plus/es/components/message/style/css";

const app = createApp(App);
app.use(registerIcons);
app.use(pinia);

app.use(router);
app.mount("#app");
