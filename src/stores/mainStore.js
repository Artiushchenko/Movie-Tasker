import { createStore } from "vuex";

import task from "./task.js";
import tags from "./tags.js";
import user from "./user.js";
import loading from "./loading.js";

import handleAuthStateChanged from "../firebase/authStateChanged.js";

const mainStore = createStore({
    modules: {
        task,
        tags,
        user,
        loading
    }
});

handleAuthStateChanged(mainStore);

export default mainStore;