<template>
    <section>
        <div class="tasks-header">
            <h1>Tasks</h1>

            <FilterList
                :filter="filter"
                :searchQuery="searchQuery"
                @update:filter="updateFilter"
                @update:searchQuery="updateSearchQuery"
            />
        </div>

        <div v-if="paginatedTasks.length === 0" class="no-tasks">
            <h1>No tasks available yet</h1>
        </div>

        <div v-else class="task-list">
            <TaskItem
                v-for="task in paginatedTasks"
                :key="task.id"
                :task="task"
                @delete-task="deleteTask"
                @edit-task="taskEdit"
                @toggle-completion="toggleCompletion"
            />
        </div>

        <Pagination
            v-if="showPagination"
            :total-items="tasksFilter.length"
            :items-per-page="itemsPerPage"
            v-model="currentPage"
        />

        <TaskEditModal
            :visible="editing"
            :title="titleEditing"
            :description="descriptionEditing"
            @close="cancelTaskEdit"
            @save="finishTaskEdit"
        />
    </section>
</template>

<script>

import Button from "../../UI/Button/Button.vue";
import Pagination from "../../UI/Pagination/Pagination.vue";
import TaskEditModal from "./base/TaskEditModal/TaskEditModal.vue";

import {toastMixin} from "../../../mixins/toastsMixin.js";
import FilterList from "./base/FilterList/FilterList.vue";
import TaskItem from "./base/TaskItem/TaskItem.vue";

export default {
    mixins: [toastMixin],
    components: {
        TaskItem,
        FilterList,
        TaskEditModal,
        Pagination,
        Button
    },
    data() {
        return {
            filter: 'active',
            searchQuery: '',
            editing: false,
            titleEditing: '',
            descriptionEditing: '',
            taskId: null,
            currentPage: parseInt(this.$route.params.page) || 1,
            itemsPerPage: 5
        }
    },
    watch: {
        "$route.params.page"(newPage) {
            this.currentPage = parseInt(newPage) || 1;
        },
        currentPage(newPage) {
            if(newPage !== parseInt(this.$route.params.page)) {
                this.$router.push({path: `/tasks/${newPage}`});
            }
        },
        tasksFilter(newTasksFilter) {
            if (newTasksFilter.length <= this.itemsPerPage) {
                this.$router.push({ path: '/tasks/1' });
            }
        }
    },
    methods: {
        updateFilter(newFilter) {
            this.filter = newFilter;
        },
        updateSearchQuery(newQuery) {
            this.searchQuery = newQuery;
        },
        taskEdit (id, title, description) {
            this.editing = !this.editing;
            this.taskId = id;
            this.titleEditing = title;
            this.descriptionEditing = description;
        },
        cancelTaskEdit () {
            this.editing = !this.editing;
            this.taskId = null;
            this.titleEditing = "";
            this.descriptionEditing = "";
        },
        finishTaskEdit (updatedData) {
            const { title, description } = updatedData;

            this.$store.dispatch("editTask", {
                id: this.taskId,
                title: title,
                description: description
            });

            this.editing = !this.editing;
        },
        deleteTask(id) {
            this.$store.dispatch("deleteTask", id)
                .then(() => {
                    this.showSuccessToast("Task has been deleted successfully.");
                    this.$store.dispatch("loadTasks");
                });
        },
        toggleCompletion(id, completed) {
            this.$store.dispatch("completeTask", {
                id,
                completed: !completed
            });

            this.showSuccessToast("Great job! Task has been completed!");
        }
    },
    created() {
        this.currentPage = parseInt(this.$route.params.page) || 1;
    },
    mounted() {
        if (this.tasksFilter.length <= this.itemsPerPage) {
            this.$router.push({ path: '/tasks/1' });
        }
    },
    computed: {
        tasksFilter () {
            let filteredTasks = [];

            if(this.filter === 'active') {
                filteredTasks = this.$store.getters.taskNotCompleted;
            } else if (this.filter === 'completed') {
                filteredTasks = this.$store.getters.taskCompleted;
            } else if (this.filter === 'all') {
                filteredTasks = this.$store.getters.tasks;
            }

            if (this.searchQuery.trim() !== '') {
                filteredTasks = filteredTasks.filter(task =>
                    task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

            return filteredTasks;
        },
        paginatedTasks() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;

            return this.tasksFilter.slice(start, end);
        },
        showPagination() {
            return this.tasksFilter.length > this.itemsPerPage;
        }
    }
}
</script>

<style src="../../../styles/Screens/Tasks/Tasks.scss" scoped lang="scss"></style>