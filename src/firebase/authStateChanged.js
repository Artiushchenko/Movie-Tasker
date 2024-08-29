import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebaseSettings.js";

const handleAuthStateChanged = store => {
    return new Promise(resolve => {
        onAuthStateChanged(auth, user => {
            if (user) {
                store.dispatch("loggedUser", user);
            }

            store.dispatch("loadTasks");
            resolve(user);
        });
    })
}

export default handleAuthStateChanged;