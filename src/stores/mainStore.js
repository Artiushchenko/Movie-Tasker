import { createStore } from "vuex";

import task from "./task.js";
import tags from "./tags.js";
import user from "./user.js";
import loading from "./loading.js";

const mainStore = createStore({
    modules: {
        task,
        tags,
        user,
        loading
    }
})

export default mainStore;