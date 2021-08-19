import getters from "../posts/getters"
import actions from "../posts/actions"
import mutations from "../posts/mutations"

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
