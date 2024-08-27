import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebaseSettings.js";

const handleAuthStateChanged = store => {
    onAuthStateChanged(auth, user => {
        if (user) {
            store.dispatch("loggedUser", user);
        }

        store.dispatch("loadTasks");
    });
}

export default handleAuthStateChanged;