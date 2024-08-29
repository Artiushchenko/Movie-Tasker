<template>
    <section>
        <h1>Error 404 | Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Button @click="goBack">Go back</Button>
    </section>
</template>

<script>
import {defineComponent} from "vue";
import Button from "../../UI/Button/Button.vue";
import {useRouter} from "vue-router";

export default defineComponent({
    components: {
        Button
    },
    setup() {
        const router = useRouter();

        const goBack = () => {
            router.back();
        };

        return {
            goBack
        }
    }
})
</script>

<style src="../../../styles/Screens/NotFound/NotFound.scss" scoped lang="scss"></style>
