import { createRouter, createWebHistory } from "vue-router";

import mainStore from "../stores/mainStore.js";

import NewTask from "../components/Screens/NewTask/NewTask.vue";
import Tasks from "../components/Screens/Tasks/Tasks.vue";
import Login from "../components/Screens/Auth/Login/Login.vue";
import Register from "../components/Screens/Auth/Register/Register.vue";

const routes = [
    {
        path: '/',
        name: 'Create new task',
        component: NewTask,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: Tasks,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Register
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = mainStore.getters.checkUser;

    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!isAuthenticated) {
            localStorage.setItem('redirectAfterLogin', to.fullPath);
            next("/login");
        } else {
            next();
        }
    } else {
        next();
    }
});

mainStore.dispatch("loadTasks");

export default router;