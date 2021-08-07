import Vue from 'vue'
import Vuex from 'vuex'
import Posts from "./posts/index"
import Auth from "./auth/index"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: [Posts, Auth]
})
