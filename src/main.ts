import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import {createPinia} from "pinia";
import i18n from "./i18n";
import Toast, {PluginOptions} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const pinia = createPinia()
const app = createApp(App)

const options: PluginOptions = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(i18n)
app.use(pinia).use(router).mount('#app')
