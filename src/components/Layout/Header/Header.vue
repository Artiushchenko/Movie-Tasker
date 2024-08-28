<template>
    <header>
        <span class="logo">Movie Tasker</span>

        <nav>
            <ul>
                <li v-for="link in linkMenu" :key="link.title">
                    <router-link :to="link.url">{{link.title}}</router-link>
                </li>

                <li v-if="checkUser" @click="logout">
                    <span>Logout</span>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import {toastMixin} from "../../../mixins/toastsMixin.js";

    export default {
        mixins: [toastMixin],
        methods: {
            logout() {
                this.$store.dispatch("logoutUser");
                this.showInfoToast("You have been logged out successfully. See you next time!");
                this.$router.push("/login");
            }
        },
        computed: {
            checkUser() {
                return this.$store.getters.checkUser;
            },
            linkMenu () {
                if(this.checkUser) {
                    return [
                        { title: 'Create new task', url: '/' },
                        { title: 'Tasks', url: '/tasks' }
                    ]
                }

                return [
                    { title: 'Login', url: '/login' },
                    { title: 'Registration', url: '/registration' }
                ]
            }
        }
    }
</script>

<style src="./Header.scss" scoped lang="scss"></style>
