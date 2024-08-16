import { createRouter, createWebHistory } from "vue-router";

import NewTask from "../components/Screens/NewTask/NewTask.vue";
import Tasks from "../components/Screens/Tasks/Tasks.vue";
import Login from "../components/Screens/Auth/Login/Login.vue";
import Register from "../components/Screens/Auth/Register/Register.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Create new task',
            component: NewTask
        },
        {
            path: '/tasks',
            name: 'Tasks',
            component: Tasks
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
    ]
})