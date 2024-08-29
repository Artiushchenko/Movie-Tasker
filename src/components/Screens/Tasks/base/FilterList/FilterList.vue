<template>
    <div class="filter-list">
        <input
            type="text"
            v-model="localSearchQuery"
            placeholder="Search task by title..."
            @input="onSearch"
        />

        <Button
            v-for="option in filterOptions"
            :key="option.value"
            @click="changeFilter(option.value)"
        >
            {{option.label}}
        </Button>
    </div>
</template>

<script>
import Button from "../../../../UI/Button/Button.vue";

export default {
    components: {
        Button
    },
    props: {
        filter: {
            type: String,
            default: "all"
        },
        searchQuery: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            localFilter: this.filter,
            localSearchQuery: this.searchQuery,
            filterOptions: [
                {value: "active", label: "Active"},
                {value: "completed", label: "Completed"},
                {value: "all", label: "All"}
            ]
        }
    },
    methods: {
        changeFilter(newFilter) {
            this.localFilter = newFilter;
            this.$emit("update:filter", newFilter);
        },
        onSearch() {
            this.$emit("update:searchQuery", this.localSearchQuery);
        }
    },
    watch: {
        filter(newFilter) {
            this.localFilter = newFilter;
        },
        searchQuery(newQuery) {
            this.localSearchQuery = newQuery;
        }
    }
}
</script>

<style src="../../../../../styles/Screens/Tasks/FilterList.scss" scoped lang="scss" />