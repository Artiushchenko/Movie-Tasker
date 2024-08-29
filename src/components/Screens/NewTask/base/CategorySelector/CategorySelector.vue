<template>
    <div class="option-list">
        <div class="option-group">
            <input
                type="radio"
                id="radioFilm"
                value="Film"
                v-model="internalValue"
                @change="emitChange"
            />
            <label for="radioFilm">Film</label>
        </div>

        <div class="option-group">
            <input
                type="radio"
                id="radioSerial"
                value="Serial"
                v-model="internalValue"
                @change="emitChange"
            />
            <label for="radioSerial">Serial</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: "Film"
        }
    },
    data() {
        return {
            internalValue: this.modelValue
        }
    },
    watch: {
        modelValue(newValue) {
            this.internalValue = newValue;
        },
        internalValue(newValue) {
            this.$emit("update:modelValue", newValue);
        }
    },
    methods: {
        emitChange() {
            this.$emit("update:modelValue", this.internalValue);
        }
    }
}
</script>

<style src="../../../../../styles/Screens/NewTask/CategorySelector.scss" scoped lang="scss" />