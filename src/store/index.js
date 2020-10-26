import Vue from 'vue'
import Vuex from 'vuex'

import notify from './notify'
import errors from './errors'
import loading from './loading'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notify, errors, loading
    }
})