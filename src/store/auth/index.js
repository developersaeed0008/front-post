import getters from "../auth/getters"
import actions from "../auth/actions"
import mutations from "../auth/mutations"

const Auth = {

    state: {
        isAuth: localStorage.getItem("jwt") != '',
        token: localStorage.getItem("jwt"),
        user: localStorage.getItem("user")
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
