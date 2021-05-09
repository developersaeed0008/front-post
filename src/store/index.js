import Vue from 'vue'
import Vuex from 'vuex'
import Posts from "./posts/index"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: [Posts]
})
