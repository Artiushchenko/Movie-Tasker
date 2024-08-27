import {fetchData, addData, deleteData} from "../utils/firebaseUtils.js";

export default {
    state: {
        tags: []
    },
    mutations: {
        newTag: (state, payload) => state.tags.push(payload),
        loadTags: (state, payload) => state.tags = payload,
        deleteTag: (state, title) => state.tags = state.tags.filter(tag => tag.title !== title)
    },
    actions: {
        async loadTags({commit, getters}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const tagsData = await fetchData("tags");
                const tagsArray = tagsData ? Object.keys(tagsData).map(key => {
                    const tag = tagsData[key];

                    if (tag.user === getters.user.id) {
                        return {
                            ...tag,
                            id: key
                        }
                    }
                }).filter(Boolean) : [];

                commit("loadTags", tagsArray);
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
        async newTag({commit, getters}, payload) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const newTag = {
                    ...payload,
                    user: getters.user.id
                }

                const id = await addData("tags", newTag);

                commit("newTag", {id, ...newTag});
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        },
        async deleteTag({commit}, title) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const tagsData = await fetchData("tags");
                const tagKey = tagsData ? Object.keys(tagsData).find(
                    key => tagsData[key].title === title
                ) : null;

                if (tagKey) {
                    await deleteData(`tags/${tagKey}`);
                    commit("deleteTag", title);
                }
            } catch (error) {
                commit("setError", error.message);
                throw error;
            } finally {
                commit("setLoading", false);
            }
        }
    },
    getters: {
        tags: state => state.tags
    }
}