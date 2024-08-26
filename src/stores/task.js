import {database, ref, push, set, get, update, remove} from "../firebase/firebase.js";

import Task from "../services/task_help.js";

export default {
    state: {
        tasks: []
    },
    mutations: {
        newTask(state, payload) {
            state.tasks.push(payload);
        },
        loadTasks(state, payload) {
            state.tasks = payload;
        },
        editTask(state, {id, title, description}) {
            const task = state.tasks.find(t => {
                return t.id === id;
            });

            task.title = title;
            task.description = description;
        },
        completeTask(state, {id, completed}) {
            const task = state.tasks.find(t => t.id === id);

            if(task) {
                task.completed = completed;
            }
        }
    },
    actions: {
        async loadTasks({commit}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const tasksRef = ref(database, "tasks");
                const snapshot = await get(tasksRef);

                if (snapshot.exists()) {
                    const tasksData = snapshot.val();
                    const tasksArray = Object.keys(tasksData).map(key => {
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
                    });

                    commit("loadTasks", tasksArray);
                } else {
                    commit("loadTasks", []);
                }

                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
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

                const tasksRef = ref(database, "tasks");
                const newTaskRef = push(tasksRef);

                await set(newTaskRef, newTask);

                commit("newTask", {id: newTaskRef.key, ...newTask});
                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        },
        async editTask({commit}, {id, title, description}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const taskRef = ref(database, `tasks/${id}`);

                await update(taskRef, {
                    title,
                    description
                });

                commit("editTask", {id, title, description});
                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        },
        async deleteTask({commit}, id) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const taskRef = ref(database, `tasks/${id}`);

                await remove(taskRef);

                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        },
        async completeTask({commit}, {id, completed}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const taskRef = ref(database, `tasks/${id}`);

                await update(taskRef, {
                    completed
                });

                commit("completeTask", { id, completed });
                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        }
    },
    getters: {
        tasks(state, getters) {
            return state.tasks.filter(task => {
                return task.user === getters.user.id
            })
        },
        taskCompleted(state, getters) {
            return getters.tasks.filter(task => {
                return task.completed
            })
        },
        taskNotCompleted(state, getters) {
            return getters.tasks.filter(task => {
                return task.completed === false;
            })
        },
    }
}