<template>
    <div class="pagination">
        <Button
            @click="prevPage"
            :disabled="currentPage === 1"
        >
            «
        </Button>

        <span>Page {{currentPage}} of {{totalPages}}</span>

        <Button
            @click="nextPage"
            :disabled="currentPage === totalPages"
        >
            »
        </Button>
    </div>
</template>

<script>
import Button from "../Button/Button.vue";

export default {
    components: {
        Button
    },
    props: {
        totalItems: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            default: 5
        },
        modelValue: {
            type: Number,
            default: 1
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        currentPage() {
            return this.modelValue;
        }
    },
    methods: {
        prevPage() {
            if(this.currentPage > 1) {
                this.$emit("update:modelValue", this.currentPage - 1);
            }
        },
        nextPage() {
            if(this.currentPage < this.totalPages) {
                this.$emit("update:modelValue", this.currentPage + 1);
            }
        }
    }
}
</script>

<style src="./Pagination.scss" scoped lang="scss" />