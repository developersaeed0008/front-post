import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

const Posts = {
    state: {
        posts: [],
        loading: false,
        limit: 0,
        msg: {
            show: false,
            text: "",
            color: "success",
        },
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

export default Posts
