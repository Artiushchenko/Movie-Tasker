<template>
    <section>
        <div class="tasks-header">
            <h1>Tasks</h1>

            <div class="filter-list">
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

                    <span class="remove-task-icon">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>

                <div class="item-content">
                    <div class="item-name">
                        <input type="checkbox" v-model="task.completed"/>
                        <h1>{{ task.title }}</h1>
                    </div>

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
            filter: 'active'
        }
    },
    computed: {
        tasksFilter () {
            if(this.filter === 'active') {
                return this.$store.getters.taskNotCompleted;
            } else if (this.filter === 'completed') {
                return this.$store.getters.taskCompleted;
            } else if (this.filter === 'all') {
                return this.$store.getters.tasks;
            }

            return this.filter === 'active';
        }
    }
}
</script>

<style src="./Tasks.scss" scoped lang="scss"></style>