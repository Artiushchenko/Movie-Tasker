<template>
    <header>
        <router-link class="logo" to="/">Movie Tasker</router-link>

        <nav>
            <ul>
                <li v-for="link in linksMenu" :key="link.title">
                    <router-link :to="link.url">{{link.title}}</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                linksMenu: [
                    { title: 'Create new task', url: '/' },
                    { title: 'Tasks', url: '/tasks' },
                    { title: 'Login', url: '/login' },
                    { title: 'Registration', url: '/registration' }
                ]
            }
        }
    }
</script>

<style src="./Header.scss"></style>
