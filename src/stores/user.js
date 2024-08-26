import {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "../firebase/firebase.js";

import User from "../services/user_help.js";

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async registerUser({commit}, {email, password}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                commit("setUser", new User(userCredential.user.uid));
                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        },
        async loginUser({commit}, {email, password}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                commit("setUser", new User(userCredential.user.uid));
                commit("setLoading", false);
            } catch (error) {
                commit("setLoading", false);
                commit("setError", error.message);
                throw error;
            }
        },
        loggedUser({commit}, payload) {
            commit("setUser", new User(payload.uid));
        },
        logoutUser({commit}) {
            auth.signOut();
            commit("setUser", null);
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        checkUser(state) {
            return state.user !== null
        }
    }
}