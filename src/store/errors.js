export default {
    state: {
        error: null
    },

    mutations: {
        setError(state, status) {
            state.error = status
        },
    },

    actions: {
        setError({commit}, status) {
            commit('setError', status)
        },
    },

    getters: {
        getError(state) {
            return state.error
        }
    }
}