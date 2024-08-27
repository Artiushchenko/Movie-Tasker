import {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "../firebase/firebase.js";

import User from "../services/user_help.js";

export default {
    state: {
        user: null
    },
    mutations: {
        setUser: (state, payload) => state.user = payload
    },
    actions: {
        async registerUser({commit}, {email, password}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                commit("setUser", new User(userCredential.user.uid));
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        async loginUser({commit}, {email, password}) {
            commit("clearError");
            commit("setLoading", true);

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                commit("setUser", new User(userCredential.user.uid));
            } catch (error) {
                commit("setError", error.message);
            } finally {
                commit("setLoading", false);
            }
        },
        loggedUser: ({commit}, payload) => commit("setUser", new User(payload.uid)),
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