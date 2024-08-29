<template>
    <div
        class="modal-overlay"
        v-if="visible"
    >
        <div
            class="modal-content animate__animated animate__jackInTheBox"
            @click.stop
        >
            <div class="modal-header">
                <h2>{{ title }}</h2>

                <button
                    class="close-button"
                    @click="close"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="modal-body">
                <div>
                    <p>Title:</p>
                    <input
                        type="text"
                        v-model="localTitle"
                    />
                </div>

                <div>
                    <p>Description:</p>
                    <textarea
                        v-model="localDescription"
                    />
                </div>
            </div>

            <div class="modal-footer">
                <Button @click="close">Cancel</Button>
                <Button @click="save">OK</Button>
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
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            localTitle: this.title,
            localDescription: this.description
        }
    },
    watch: {
        title(newTitle) {
            this.localTitle = newTitle;
        },
        description(newDescription) {
            this.localDescription = newDescription;
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        save() {
            this.$emit("save", {
                title: this.localTitle,
                description: this.localDescription
            });
        }
    }
}
</script>

<style src="../../../../../styles/Screens/Tasks/TaskEditModal.scss" scoped lang="scss" />