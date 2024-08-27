import {fetchData, addData, updateData, deleteData} from "../utils/firebaseUtils.js";

import Task from "../services/task_help.js";

export default {
    state: {
        tasks: []
    },
    mutations: {
        newTask: (state, payload) => state.tasks.push(payload),
        loadTasks: (state, payload) => state.tasks = payload,
        editTask(state, {id, title, description}) {
            const task = state.tasks.find(t => t.id === id);

            if (task) {
                task.title = title;
                task.description = description;
            }
        },
        completeTask(state, {id, completed}) {
            const task = state.tasks.find(t => t.id === id);

            if (task) {
                task.completed = completed;
            }
        }
    },
    actions: {
        async loadTasks({commit}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const tasksData = await fetchData("tasks");
                const tasksArray = tasksData ? Object.keys(tasksData).map(key => {
                    const task = tasksData[key];

                    return new Task(
                        task.title,
                        task.description,
                        task.category,
                        task.time,
                        task.tags,
                        task.completed,
                        task.editing,
                        task.user,
                        key
                    );
                }) : [];

                commit("loadTasks", tasksArray);
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        async newTask({commit, getters}, payload) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const newTask = new Task(
                    payload.title,
                    payload.description,
                    payload.category,
                    payload.time,
                    payload.tags,
                    payload.completed,
                    payload.editing,
                    getters.user.id
                );

                const id = await addData("tasks", newTask);

                commit("newTask", {id, ...newTask});
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        async editTask({commit}, {id, title, description}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                await updateData(`tasks/${id}`, {title, description});

                commit("editTask", {id, title, description});
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        async deleteTask({commit}, id) {
            commit("clearError");
            commit("setLoading", true);

            try {
                await deleteData(`tasks/${id}`);
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        async completeTask({commit}, {id, completed}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                await updateData(`tasks/${id}`, {completed})

                commit("completeTask", {id, completed});
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        }
    },
    getters: {
        tasks: (state, getters) => state.tasks.filter(task => task.user === getters.user.id),
        taskCompleted: getters => getters.tasks.filter(task => task.completed),
        taskNotCompleted: getters => getters.tasks.filter(task => !task.completed)
    }
}