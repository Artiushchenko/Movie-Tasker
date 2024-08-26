<template>
    <div class="auth">
        <div class="auth-banner">
            <img src="../../../../assets/login_photo.jpg">
        </div>

        <div class="auth-form">
            <span>Log In</span>

            <form @submit.prevent="onSubmit">
                <div
                    :class="{ errorInput: v$.email.$error }"
                >
                    <input
                        type="email"
                        placeholder="E-mail"
                        v-model="email"
                        :class="inputClass(v$.email.$error)"
                        @change="v$.email.$touch()"
                    />

                    <div
                        v-for="error of v$.email.$errors"
                        :key="error.$uid"
                    >
                        <p class="error-message">{{ error.$message }}</p>
                    </div>
                </div>

                <div
                    :class="{ errorInput: v$.password.$error }"
                >
                    <input
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        :class="inputClass(v$.password.$error)"
                        @change="v$.password.$touch()"
                    />

                    <div
                        v-for="error of v$.password.$errors"
                        :key="error.$uid"
                    >
                        <p class="error-message">{{ error.$message }}</p>
                    </div>
                </div>

                <Button type="submit" :disabled="v$.$invalid" >Log In</Button>
            </form>

            <p v-if="submitStatus" class="submitStatus">{{ submitStatus }}</p>

            <div class="navigate">
                <span>Don't have an account yet?</span>
                <router-link to="/registration">Sign In</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {required, email, helpers} from '@vuelidate/validators';
import useVuelidate from "@vuelidate/core";

import Button from "../../../UI/Button/Button.vue";

import {getErrorMessage} from "../../../../services/getErrorMessage.js";

export default {
    components: {
        Button
    },
    data() {
        return {
            v$: useVuelidate(),
            email: '',
            password: '',
            submitStatus: null
        }
    },

    validations () {
        return {
            email: {
                required: helpers.withMessage('E-mail field is required!', required),
                email: helpers.withMessage('The E-mail address is not valid!', email)
            },
            password: {
                required: helpers.withMessage('Password field is required!', required)
            }
        }
    },

    methods: {
        onSubmit () {
            this.v$.$touch();

            if (!this.v$.$invalid) {
                const user = {
                    email: this.email,
                    password: this.password
                }

                this.$store.dispatch("loginUser", user)
                    .then(() => {
                        this.$router.push("/");
                    })
                    .catch(error => {
                        this.submitStatus = getErrorMessage(error.code);
                    })
            }
        },

        inputClass(error) {
            return {
                'animate__animated animate__shakeX': error,
                errorMessage: error
            }
        }
    }
}
</script>

<style src="./Login.scss" scoped lang="scss"></style>
