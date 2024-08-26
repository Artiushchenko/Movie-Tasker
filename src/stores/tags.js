import {database, ref, push, set, get, remove} from "../firebase/firebase.js";

export default {
    state: {
        tags: []
    },
    mutations: {
        newTag (state, payload) {
            state.tags.push(payload);
        },
        loadTags (state, payload) {
            state.tags = payload;
        },
        deleteTag (state, title) {
            state.tags = state.tags.filter(tag => tag.title !== title);
        }
    },
    actions: {
        async loadTags({commit}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const tagsRef = ref(database, "tags");
                const snapshot = await get(tagsRef);

                if(snapshot.exists()) {
                    const tagsData = snapshot.val();
                    const tagsArray = Object.keys(tagsData).map(key => ({
                        ...tagsData[key],
                        id: key
                    }));

                    commit("loadTags", tagsArray);
                } else {
                    commit("loadTags", []);
                }

                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        },
        async newTag ({ commit }, payload) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const tagsRef = ref(database, "tags");
                const newTagRef = push(tagsRef);

                await set(newTagRef, payload);

                commit("newTag", { id: newTagRef.key, ...payload });
                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        },
        async deleteTag({commit}, title) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const tagsRef = ref(database, "tags");
                const snapshot = await get(tagsRef);

                if (snapshot.exists()) {
                    const tagsData = snapshot.val();
                    const tagKey = Object.keys(tagsData).find(key => tagsData[key].title === title);

                    if (tagKey) {
                        const tagRef = ref(database, `tags/${tagKey}`);
                        await remove(tagRef);
                        commit("deleteTag", title);
                    }
                }

                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        }
    },
    getters: {
        tags (state) {
            return state.tags;
        }
    }
}