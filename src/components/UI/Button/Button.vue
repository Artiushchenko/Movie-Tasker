<template>
    <button
        :type="type"
        :disabled="disabled"
        @click="handleClick"
    >
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            type: {
                type: String,
                default: "button"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            onClick: {
                type: Function,
                default: null
            }
        },
        methods: {
            handleClick (event) {
                if (this.onClick) {
                    this.onClick(event);
                }
            }
        }
    }
</script>

<style src="../../../styles/UI/Button.scss" scoped lang="scss"></style>