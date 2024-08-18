<template xmlns="http://www.w3.org/1999/html">
    <section>
        <h1>Home Page</h1>

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

        <div
            :class="{ errorInput: v$.taskDescription.$error }"
        >
            <textarea
                placeholder="Enter description here"
                v-model="taskDescription"
                :class="inputClass(v$.taskDescription.$error)"
                @change="v$.taskDescription.$touch()"
            />

            <div
                v-for="error of v$.taskDescription.$errors"
                :key="error.$uid"
            >
                <p class="error-message">{{ error.$message }}</p>
            </div>
        </div>

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
                    <div
                        :class="{ errorInput: v$.filmHours.$error }"
                    >
                        <input
                            type="number"
                            v-model="filmHours"
                            :class="inputClass(v$.filmHours.$error)"
                            @change="v$.filmHours.$touch()"
                        />

                        <div
                            v-for="error of v$.filmHours.$errors"
                            :key="error.$uid"
                        >
                            <p class="error-message">{{ error.$message }}</p>
                        </div>
                    </div>
                </div>

                <div class="total-time-group">
                    <span>Minutes</span>
                    <div
                        :class="{ errorInput: v$.filmMinutes.$error }"
                    >
                        <input
                            type="number"
                            v-model="filmMinutes"
                            :class="inputClass(v$.filmMinutes.$error)"
                            @change="v$.filmMinutes.$touch()"
                        />

                        <div
                            v-for="error of v$.filmMinutes.$errors"
                            :key="error.$uid"
                        >
                            <p class="error-message">{{ error.$message }}</p>
                        </div>
                    </div>
                </div>

                <p>{{ filmTime }}</p>
            </div>

            <div class="total-time-settings" v-if="taskCategory === 'Serial'">
                <div class="total-time-group">
                    <span>How many seasons?</span>
                    <div
                        :class="{ errorInput: v$.serialSeasons.$error }"
                    >
                        <input
                            type="number"
                            v-model="serialSeasons"
                            :class="inputClass(v$.serialSeasons.$error)"
                            @change="v$.serialSeasons.$touch()"
                        />

                        <div
                            v-for="error of v$.serialSeasons.$errors"
                            :key="error.$uid"
                        >
                            <p class="error-message">{{ error.$message }}</p>
                        </div>
                    </div>
                </div>

                <div class="total-time-group">
                    <span>How many series?</span>
                    <div
                        :class="{ errorInput: v$.serialSeries.$error }"
                    >
                        <input
                            type="number"
                            v-model="serialSeries"
                            :class="inputClass(v$.serialSeries.$error)"
                            @change="v$.serialSeries.$touch()"
                        />

                        <div
                            v-for="error of v$.serialSeries.$errors"
                            :key="error.$uid"
                        >
                            <p class="error-message">{{ error.$message }}</p>
                        </div>
                    </div>
                </div>

                <div class="total-time-group">
                    <span>How long is one series?</span>
                    <div
                        :class="{ errorInput: v$.serialSeriesMinutes.$error }"
                    >
                        <input
                            type="number"
                            v-model="serialSeriesMinutes"
                            :class="inputClass(v$.serialSeriesMinutes.$error)"
                            @change="v$.serialSeriesMinutes.$touch()"
                        />

                        <div
                            v-for="error of v$.serialSeriesMinutes.$errors"
                            :key="error.$uid"
                        >
                            <p class="error-message">{{ error.$message }}</p>
                        </div>
                    </div>
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
            <div
                :class="{ errorInput: v$.tagTitle.$error }"
            >
                <input
                    type="text"
                    placeholder="Name of the new tag"
                    v-model="tagTitle"
                    :class="inputClass(v$.tagTitle.$error)"
                    @change="v$.tagTitle.$touch()"
                />

                <div
                    v-for="error of v$.tagTitle.$errors"
                    :key="error.$uid"
                >
                    <p class="error-message">{{ error.$message }}</p>
                </div>
            </div>
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
                        <span class="remove-tag-icon">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                    </div>
                </div>
            </transition-group>
        </div>

        <Button class="sendTask" :onClick="newTask">Create</Button>
    </section>
</template>

<script>
import {required, email, minLength, maxLength, helpers, minValue} from '@vuelidate/validators';
import useVuelidate from "@vuelidate/core";

import Button from "../../UI/Button/Button.vue";

export default {
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
            },
            taskDescription: {
                required: helpers.withMessage('Task description is required field!', required),
                maxLengthDescription: helpers.withMessage('Description should not exceed 250 characters!', maxLength(250))
            },
            filmHours: {
                required: helpers.withMessage('Film hours is required field!', required),
                minValueHours: helpers.withMessage('Value must be at least 0!', minValue(0))
            },
            filmMinutes: {
                required: helpers.withMessage('Film minutes is required field!', required),
                minValueMinutes: helpers.withMessage('Value must be at least 1!', minValue(1))
            },
            serialSeasons: {
                required: helpers.withMessage('Serial seasons is required field!', required),
                minValueSerialSeasons: helpers.withMessage('Value must be at least 1!', minValue(1))
            },
            serialSeries: {
                required: helpers.withMessage('Serial series is required field!', required),
                minValueSerialSeries: helpers.withMessage('Value must be at least 1!', minValue(1))
            },
            serialSeriesMinutes: {
                required: helpers.withMessage('Serial series minutes is required field!', required),
                minValueSeriesMinutes: helpers.withMessage('Value must be at least 1!', minValue(1))
            },
            tagTitle: {
                required: helpers.withMessage('Tag title is required field!', required),
                minValueTagTitle: helpers.withMessage('Tag must be at least 1 character long!', minLength(1))
            }
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

        resetParams() {
            this.taskTitle = '';
            this.taskDescription = '';
            this.tagsUsed = [];
            this.filmHours = 0;
            this.filmMinutes = 0;
            this.tagTitle = '';
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
    }
}
</script>

<style src="./NewTask.scss" scoped lang="scss"></style>