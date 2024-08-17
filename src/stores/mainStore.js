import { createStore } from "vuex";

import task from "./task.js";
import tags from "./tags.js";

const mainStore = createStore({
    modules: {
        task,
        tags
    }
})

export default mainStore;