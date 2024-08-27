import {auth} from "../firebase/firebaseSettings.js";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import "../firebase/authStateChanged.js";

import User from "../services/user_help.js";

export default {
    state: {
        user: null
    },
    mutations: {
        setUser: (state, payload) => state.user = payload
    },
    actions: {
        async registerUser({commit, dispatch}, {email, password}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                commit("setUser", new User(userCredential.user.uid));

                dispatch("loadTasks");
                dispatch("loadTags");
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        async loginUser({commit, dispatch}, {email, password}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                commit("setUser", new User(userCredential.user.uid));

                dispatch("loadTasks");
                dispatch("loadTags");
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        loggedUser({commit, dispatch}, payload) {
            commit("setUser", new User(payload.uid));

            dispatch("loadTasks");
            dispatch("loadTags");
        },
        logoutUser({commit}) {
            auth.signOut();
            commit("setUser", null);
        }
    },
    getters: {
        user: state => state.user,
        checkUser: state => state.user !== null
    }
}