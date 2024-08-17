<template xmlns="http://www.w3.org/1999/html">
    <section>
        <h1>Home Page</h1>

        <input
            type="text"
            placeholder="What we will watch?"
            v-model="taskTitle"
            @keyup.enter="newTask"
        />

        <textarea
            v-model="taskDescription"
            placeholder="Enter description here"
        />

        <div class="option-list">
            <div class="option-group">
                <input
                    type="radio"
                    id="radioFilm"
                    value="Film"
                    v-model="taskCategory"
                />
                <label for="radioFilm">Film</label>
            </div>

            <div class="option-group">
                <input
                    type="radio"
                    id="radioSerial"
                    value="Serial"
                    v-model="taskCategory"
                />
                <label for="radioSerial">Serial</label>
            </div>
        </div>

        <div class="total-time">
            <div class="total-time-settings" v-if="taskCategory === 'Film'">
                <div class="total-time-group">
                    <span>Hours</span>
                    <input
                        type="number"
                        v-model="filmHours"
                    />
                </div>

                <div class="total-time-group">
                    <span>Minutes</span>
                    <input
                        type="number"
                        v-model="filmMinutes"
                    />
                </div>

                <p>{{ filmTime }}</p>
            </div>

            <div class="total-time-settings" v-if="taskCategory === 'Serial'">
                <div class="total-time-group">
                    <span>How many seasons?</span>
                    <input
                        type="number"
                        v-model="serialSeasons"
                    />
                </div>

                <div class="total-time-group">
                    <span>How many series?</span>
                    <input
                        type="number"
                        v-model="serialSeries"
                    />
                </div>

                <div class="total-time-group">
                    <span>How long is one series?</span>
                    <input
                        type="number"
                        v-model="serialSeriesMinutes"
                    />
                </div>

                <p>{{ serialTime }}</p>
            </div>
        </div>

        <div class="tag-list">
            <div
                class="tag-wrapper"
                @click="tagMenuShow = !tagMenuShow"
            >
                <div class="tag">
                    <span>Add New</span>
                    <span class="add-new-tag-icon" :class="{ rotated: tagMenuShow }">
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </div>
            </div>
        </div>

        <div class="tag-list" v-if="tagMenuShow">
            <input
                type="text"
                placeholder="Name of the new tag"
                v-model="tagTitle"
            />
            <button @click="newTag">Add new tag</button>
        </div>

        <div class="tag-list">
            <div
                class="tag-wrapper"
                v-for="tag in tags"
                :key="tag.title"
            >
                <div
                    class="tag"
                    @click="addTagUsed(tag)"
                    :class="{ used: tag.use }"
                >
                    <span>{{ tag.title }}</span>
                    <span class="remove-tag-icon">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
            </div>
        </div>

        <button class="sendTask" @click="newTask">Create</button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            taskTitle: '',
            taskDescription: '',
            taskCategory: 'Film',
            filmHours: 0,
            filmMinutes: 0,
            serialSeasons: 0,
            serialSeries: 0,
            serialSeriesMinutes: 0,
            tagsUsed: [],
            tagMenuShow: false,
            tagTitle: ''
        }
    },
    methods: {
        newTag() {
            if (this.tagTitle.trim() !== '') {
                const tag = {
                    title: this.tagTitle,
                    use: false,
                }

                this.$store.dispatch('newTag', tag);
            }
        },

        newTask() {
            if (this.taskTitle.trim() !== '') {
                let time;

                if (this.taskCategory === 'Film') {
                    time = this.filmTime;
                } else {
                    time = this.serialTime;
                }

                const task = {
                    title: this.taskTitle,
                    description: this.taskDescription,
                    category: this.taskCategory,
                    time,
                    tags: this.tagsUsed,
                    completed: false,
                    editing: false
                }

                this.$store.dispatch('newTask', task);

                this.tags.forEach(tag => {
                    tag.use = false;
                });

                this.resetParams();
            }
        },

        addTagUsed(tag) {
            tag.use = !tag.use;

            if (tag.use) {
                this.tagsUsed.push({
                    title: tag.title
                });
            } else {
                this.tagsUsed.splice(tag.title, 1);
            }
        },

        getHoursAndMinutes(minutes) {
            const hours = Math.trunc(minutes / 60);
            const min = minutes % 60;

            return hours + ' Hours ' + min + ' Minutes'
        },

        resetParams () {
            this.taskTitle = '';
            this.taskDescription = '';
            this.tagsUsed = [];
            this.filmHours = 0;
            this.filmMinutes = 0;
            this.tagTitle = '';
        }
    },
    computed: {
        tags () {
            return this.$store.getters.tags;
        },

        filmTime() {
            const minutes = this.filmHours * 60 + this.filmMinutes;
            return this.getHoursAndMinutes(minutes)
        },

        serialTime() {
            const minutes = this.serialSeasons * this.serialSeries * this.serialSeriesMinutes;
            return this.getHoursAndMinutes(minutes)
        },
    }
}
</script>

<style src="./NewTask.scss"></style>