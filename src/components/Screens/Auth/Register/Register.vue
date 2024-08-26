<template>
    <div class="auth">
        <div class="auth-banner">
            <img src="../../../../assets/register_photo.png">
        </div>

        <div class="auth-form">
            <span>Registration</span>

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

                <div
                    :class="{ errorInput: v$.confirmPassword.$error }"
                >
                    <input
                        type="password"
                        placeholder="Confirm password"
                        v-model="confirmPassword"
                        :class="inputClass(v$.confirmPassword.$error)"
                        @change="v$.confirmPassword.$touch()"
                    />

                    <div
                        v-for="error of v$.confirmPassword.$errors"
                        :key="error.$uid"
                    >
                        <p class="error-message">{{ error.$message }}</p>
                    </div>
                </div>

                <Button
                    type="submit"
                    :disabled="v$.$invalid"
                >
                    Register
                </Button>
            </form>

            <p v-if="submitStatus" class="submitStatus">{{ submitStatus }}</p>

            <div class="navigate">
                <span>Do you have an account?</span>
                <router-link to="/login">Log In</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {required, email, minLength, sameAs, helpers} from '@vuelidate/validators';
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
            confirmPassword: '',
            submitStatus: null
        }
    },

    validations() {
        return {
            email: {
                required: helpers.withMessage('E-mail field is required!', required),
                email: helpers.withMessage('The E-mail address is not valid!', email)
            },
            password: {
                required: helpers.withMessage('Password field is required!', required),
                minLength: helpers.withMessage('Password field should be at least 6 characters long', minLength(6))
            },
            confirmPassword: {
                sameAsPassword: helpers.withMessage('Passwords do not match!', sameAs(this.password))
            }
        }
    },

    methods: {
        onSubmit() {
            this.v$.$touch();

            if (!this.v$.$invalid) {

                const user = {
                    email: this.email,
                    password: this.password
                }

                this.$store.dispatch("registerUser", user)
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

<style src="./Register.scss" scoped lang="scss"></style>
