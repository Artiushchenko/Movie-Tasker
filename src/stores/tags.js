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
        async loadTags({commit}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const tagsData = await fetchData("tags");
                const tagsArray = tagsData ? Object.keys(tagsData).map(key => ({
                    ...tagsData[key],
                    id: key
                })) : [];

                commit("loadTags", tagsArray);
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        async newTag({commit}, payload) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const id = await addData("tags", payload);

                commit("newTag", {id, ...payload});
            } catch (error) {
                commit("setError", error.message);
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
            } finally {
                commit("setLoading", false);
            }
        }
    },
    getters: {
        tags: state => state.tags
    }
}