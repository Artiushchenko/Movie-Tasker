<template>
    <section>
        <div class="tasks-header">
            <h1>Tasks</h1>

            <div class="filter-list">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search task by title..."
                    @input="tasksFilter"
                />

                <Button :on-click="() => filter = 'active'">Active</Button>
                <Button :on-click="() => filter = 'completed'">Completed</Button>
                <Button :on-click="() => filter = 'all'">All</Button>
            </div>
        </div>

        <div class="task-list">
            <div
                class="task-item"
                v-for="task in tasksFilter"
                :key="task.id"
                :class="{ completed: task.completed }"
            >
                <div class="item-header">
                    <div class="item-stats">
                        <span class="item-label">{{ task.category }}</span>
                        <span>
                            <strong>Total Time</strong>: {{ task.time }}
                        </span>
                    </div>

                    <span
                        class="remove-task-icon"
                        @click="deleteTask(task.id)"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>

                <div class="item-content">
                    <h1>{{ task.title }}</h1>

                    <p>{{ task.description }}</p>

                    <div class="tag-list">
                        <div
                            class="tag-wrapper"
                            v-for="tag in task.tags"
                            :key="tag.title"
                        >
                            <div class="tag">
                                <span>{{ tag.title }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="task-buttons-container">
                        <Button @click="taskEdit(task.id, task.title, task.description)">Edit</Button>
                        <Button @click="toggleCompletion(task.id, task.completed)">Done</Button>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="modal-overlay"
            @click="cancelTaskEdit"
            v-if="editing"
        >
            <div
                class="modal-content animate__animated animate__jackInTheBox"
                @click.stop
            >
                <div class="modal-header">
                    <h2>{{ titleEditing }}</h2>

                    <button
                        class="close-button"
                        @click="cancelTaskEdit"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div class="modal-body">
                    <div>
                        <p>Title:</p>
                        <input
                            type="text"
                            v-model="titleEditing"
                        />
                    </div>

                    <div>
                        <p>Description:</p>
                        <textarea
                            v-model="descriptionEditing"
                        />
                    </div>
                </div>

                <div class="modal-footer">
                    <Button :on-click="cancelTaskEdit">Cancel</Button>
                    <Button :on-click="finishTaskEdit">OK</Button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import Button from "../../UI/Button/Button.vue";

export default {
    components: {
        Button
    },
    data() {
        return {
            filter: 'active',
            searchQuery: '',
            editing: false,
            titleEditing: '',
            descriptionEditing: '',
            taskId: null
        }
    },
    methods: {
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
        finishTaskEdit () {
            this.$store.dispatch("editTask", {
                id: this.taskId,
                title: this.titleEditing,
                description: this.descriptionEditing
            });

            this.editing = !this.editing;
        },
        deleteTask(id) {
            this.$store.dispatch("deleteTask", id)
                .then(() => {
                    this.$store.dispatch("loadTasks");
                });
        },
        toggleCompletion(id, completed) {
            this.$store.dispatch("completeTask", {
                id,
                completed: !completed
            });
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
        }
    }
}
</script>

<style src="./Tasks.scss" scoped lang="scss"></style>