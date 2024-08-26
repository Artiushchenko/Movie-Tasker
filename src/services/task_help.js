export default class Task {
    constructor(title, description, category, time, tags, completed, editing, user = null, id = null) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.time = time;
        this.tags = tags;
        this.completed = completed;
        this.editing = editing;
        this.user = user;
        this.id = id;
    }
}