import {createRouter, createWebHistory} from "vue-router";

import user from "../stores/user.js";

function requireAuth(to, from, next) {
    const isAuthenticated = user.getters.checkUser;

    if (!isAuthenticated) {
        next("/login");
    } else {
        next();
    }
}

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

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        return requireAuth(to, from, next);
    }

    next();
});

export default router;