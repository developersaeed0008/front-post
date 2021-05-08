import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        loading: false,
        limit: 0
    },
    getters:
        getters
    ,
    mutations:
        mutations
    ,
    actions:
        actions

})
