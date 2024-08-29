import {createRouter, createWebHistory} from "vue-router";

import handleAuthStateChanged from "../firebase/authStateChanged.js";
import mainStore from "../stores/mainStore.js";

const authRoutes = [
    {
        path: '/',
        name: 'Create new task',
        component: () => import("../components/Screens/NewTask/NewTask.vue"),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/tasks/:page?',
        name: 'Tasks',
        component: () => import("../components/Screens/Tasks/Tasks.vue"),
        meta: {
            requiresAuth: true
        }
    }
];

const publicRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import("../components/Screens/Auth/Login/Login.vue")
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import("../components/Screens/Auth/Register/Register.vue")
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import("../components/Screens/NotFound/NotFound.vue")
    }
];

const routes = [...authRoutes, ...publicRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    const user = await handleAuthStateChanged(mainStore);

    if (requiresAuth && !user) {
        next('/login');
    } else {
        next();
    }
});

export default router;