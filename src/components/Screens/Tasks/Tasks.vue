<template>
    <section>
        <h1>Tasks</h1>

        <div class="task-list">
            <div
                class="task-item"
                v-for="task in tasks"
                :key="task.id"
                :class="{ completed: task.completed }"
            >
                <div class="item-header">
                    <div class="item-stats">
                        <span class="item-label">{{ task.category }}</span>
                        <span>Total Time: </span>
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
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tasks: [
                {
                    'id': 1,
                    'title': 'GrowthBusters: Hooked on Growth',
                    'description': 'GrowthBusters description',
                    'category': 'Film',
                    'completed': false,
                    'editing': false
                },
                {
                    'id': 2,
                    'title': 'Game of Thrones',
                    'description': 'Game of Thrones description',
                    'category': 'Serial',
                    'completed': false,
                    'editing': false
                }
            ]
        }
    }
}
</script>

<style src="./Tasks.scss"></style>