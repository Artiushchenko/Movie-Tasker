<template>
    <div :class="['task-item', { completed: task.completed }]">
        <div class="item-header">
            <div class="item-stats">
                <span class="item-label">{{ task.category }}</span>
                <span>
                    <strong>Total Time</strong>: {{ task.time }}
                </span>
            </div>

            <span
                class="remove-task-icon"
                @click="$emit('delete-task', task.id)"
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
                <Button class="edit-button" @click="$emit('edit-task', task.id, task.title, task.description)">Edit</Button>
                <Button @click="$emit('toggle-completion', task.id, task.completed)">Done</Button>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "../../../../UI/Button/Button.vue";

export default {
    components: {
        Button
    },
    props: {
        task: {
            type: Object,
            required: true
        }
    }
}
</script>

<style src="../../../../../styles/Screens/Tasks/TaskItem.scss" scoped lang="scss" />