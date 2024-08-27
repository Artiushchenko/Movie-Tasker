import {createApp} from "vue";

import "./styles/main.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";
import "vue-toastification/dist/index.css";

import VueToastificationPlugin from "vue-toastification";
import {toastsConfig} from "./config/toastConfig.js";

import setFocus from "./directives/setFocus.js";

import App from "./App.vue"
import router from "./router/router.js";
import mainStore from "./stores/mainStore.js";

createApp(App)
    .use(mainStore)
    .use(router)
    .use(VueToastificationPlugin, toastsConfig)
    .directive("focus", setFocus)
    .mount('#app')
