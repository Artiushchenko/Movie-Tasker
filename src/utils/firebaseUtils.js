import {database, ref, push, set, get, update, remove} from "../firebase/firebase.js";

export async function fetchData(path) {
    const dataRef = ref(database, path);
    const snapShot = await get(dataRef);

    return snapShot.exists() ? snapShot.val() : null;
}

export async function addData(path, payload) {
    const dataRef = ref(database, path);
    const newRef = push(dataRef);

    await set(newRef, payload);

    return newRef.key;
}

export async function updateData(path, payload) {
    const dataRef = ref(database, path);

    await update(dataRef, payload);
}

export async function deleteData(path) {
    const dataRef = ref(database, path);

    await remove(dataRef);
}