import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

const Auth = {
    state: {
        isAuth: localStorage.getItem("jwt"),
        token: ''
    },
    getters:
        getters
    ,
    mutations:
        mutations
    ,
    actions:
        actions

};

export default Auth
