import {createApp} from "vue";

import "./styles/main.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css";

import App from "./App.vue"
import router from "./router/router.js";
import mainStore from "./stores/mainStore.js";

createApp(App)
    .use(router)
    .use(mainStore)
    .mount('#app')
