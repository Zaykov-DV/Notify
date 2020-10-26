import axios from 'axios'
import loadMore from "../assets/js/loadMore";

export default {
    state: {
        messages: [],
        messagesMain: []
    },
    mutations: {
        setMessage(state, payload) {
            state.messages = payload
        },
        setMessageMain(state, payload) {
            state.messagesMain = payload
        },
        loadMessages(state, payload) {
            state.messagesMain = [...state.messagesMain, ...payload]
        }
    },
    actions: {
        setMessage ({commit}, payload) {
            commit('setMessage', payload)
        },
        setMessageMain ({commit}, payload) {
            commit('setMessageMain', payload)
        },
        loadMessages ({commit, getters}) {
            let res = getters.getMessageFilter
            commit('loadMessages', loadMore(res))
        },
        // dispatch from loading.js to -- NotifyPage.vue
        setNotifyLazy ({commit, dispatch}) {
            commit('setLoading', true)
            setTimeout(() => {
                dispatch('setLoading')
            }, 1800)
        },
        // loading
        setLoading({commit}) {
            // this.loading = true
            axios
                .get('https://www.eclipsesite.site/api/notifyApi.php')
                .then(response => {
                    let res = response.data.notify,
                        messages = [],
                        messagesMain = []

                    //filter
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].main) messagesMain.push(res[i])
                        else messages.push(res[i])
                    }

                    commit('setMessage', messages)
                    commit('setMessageMain', messagesMain)
                })
                .catch(error => {
                    console.log(error)
                    commit('setError', 'Error: Network Error')
                })
                .finally( () => commit('setLoading', false) )
        },
    },
    getters: {
        getMessage(state) {
            return state.messages
        },
        getMessageMain(state) {
            return state.messagesMain
        },
        getMessageFilter(state) {
            return state.messages.filter(mes => {
                return mes.main === false
            })
        }
    }
}