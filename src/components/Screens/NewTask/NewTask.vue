<template xmlns="http://www.w3.org/1999/html">
    <section>
        <h1>Home Page</h1>

        <form @submit.prevent="onSubmit">
            <div
                :class="{ errorInput: v$.taskTitle.$error }"
            >
                <input
                    type="text"
                    placeholder="What we will watch?"
                    v-model="taskTitle"
                    :class="inputClass(v$.taskTitle.$error)"
                    @change="v$.taskTitle.$touch()"
                />

                <div
                    v-for="error of v$.taskTitle.$errors"
                    :key="error.$uid"
                >
                    <p class="error-message">{{ error.$message }}</p>
                </div>
            </div>

            <textarea
                placeholder="Enter description here"
                v-model="taskDescription"
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
                <Button :onClick="newTag">Add new tag</Button>
            </div>

            <div class="tag-list">
                <transition-group
                    enter-active-class="animate__animated animate__fadeInRight"
                    leave-active-class="animate__animated animate__fadeOutDown"
                >
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
                            <span class="remove-tag-icon" @click.stop="deleteTag(tag.title)">
                                <i class="fa-solid fa-xmark"></i>
                            </span>
                        </div>
                    </div>
                </transition-group>
            </div>

            <Button
                type="submit"
                class="sendTask"
                :disabled="v$.$invalid"
            >
                Create
            </Button>
        </form>
    </section>
</template>

<script>
import {required, helpers} from '@vuelidate/validators';
import useVuelidate from "@vuelidate/core";

import Button from "../../UI/Button/Button.vue";

import {toastMixin} from "../../../mixins/toastsMixin.js";

export default {
    mixins: [toastMixin],
    components: {
        Button
    },
    data() {
        return {
            v$: useVuelidate(),
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

    validations() {
        return {
            taskTitle: {
                required: helpers.withMessage('Task title is required field!', required)
            }
        }
    },

    methods: {
        onSubmit() {
            this.v$.$touch();

            if(!this.v$.$invalid) {
                this.newTask();
            }
        },

        loadTags() {
            this.$store.dispatch('loadTags');
        },

        newTag() {
            if (this.tagTitle.trim() !== '') {
                const tag = {
                    title: this.tagTitle,
                    use: false,
                }

                this.$store.dispatch('newTag', tag)
                    .then(() => {
                        this.loadTags();
                    });

                this.showSuccessToast(`Tag "${this.tagTitle}" has been created successfully!`);
                this.tagTitle = "";
            }
        },

        deleteTag(tagTitle) {
            this.$store.dispatch("deleteTag", tagTitle)
                .then(() => {
                    this.showSuccessToast(`Tag "${tagTitle}" has been deleted successfully!`);
                    this.loadTags();
                });
        },

        newTask() {
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

                this.showSuccessToast("New task has been created successfully!");
                this.resetParams();
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

        resetParams() {
            this.taskTitle = '';
            this.taskDescription = '';
            this.tagsUsed = [];
            this.filmHours = 0;
            this.filmMinutes = 0;
            this.tagTitle = '';

            this.v$.$reset();
        },

        inputClass(error) {
            return {
                'animate__animated animate__shakeX': error,
                errorMessage: error
            }
        }
    },
    computed: {
        tags() {
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
    },
    mounted() {
        this.loadTags();
    }
}
</script>

<style src="./NewTask.scss" scoped lang="scss"></style>