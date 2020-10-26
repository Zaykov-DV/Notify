export default {
    state: {
        loading: false
    },
    mutations: {
        setLoading(state, status) {
            state.loading = status
        }
    },
    actions: {
        setLoading({commit}, status) {
            commit('setLoading', status);
        }
    },
    getters: {
        getLoading(state) {
            return state.loading
        }
    }
}