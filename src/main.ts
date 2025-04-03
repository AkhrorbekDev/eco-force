import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import {createPinia} from "pinia";
import i18n from "./i18n";
import Toast, {PluginOptions, POSITION} from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const pinia = createPinia()
const app = createApp(App)

const options: PluginOptions = {
    position: POSITION.TOP_RIGHT,
    timeout: 2970,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    transition: "Vue-Toastification__fade",
    maxToasts: 5,
    newestOnTop: true,
    filterBeforeCreate: (toast, toasts) => {
        if (toasts.filter(
            t => t.type === toast.type
        ).length !== 0) {
            // Returning false discards the toast
            return false;
        }
        // You can modify the toast if you want
        return toast;
    }
};

app.use(Toast, options);
app.use(i18n)
app.use(pinia).use(router).mount('#app')
