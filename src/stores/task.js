export default {
    state: {
        tasks: [
            {
                'id': 1,
                'title': 'GrowthBusters: Hooked on Growth',
                'description': 'GrowthBusters description',
                'category': 'Film',
                'completed': false,
                'editing': false
            },
            {
                'id': 2,
                'title': 'Game of Thrones',
                'description': 'Game of Thrones description',
                'category': 'Serial',
                'completed': true,
                'editing': false
            }
        ]
    },
    mutations: {
        newTask (state, payload) {
            payload.id = Math.random();
            state.tasks.push(payload);
        }
    },
    actions: {
        newTask ({ commit }, payload) {
            commit('newTask', payload);
        }
    },
    getters: {
        tasks (state) {
            return state.tasks
        },

        taskCompleted (state) {
            return state.tasks.filter(task => {
                return task.completed
            })
        },

        taskNotCompleted (state) {
            return state.tasks.filter(task => {
                return task.completed === false;
            })
        },
    }
}