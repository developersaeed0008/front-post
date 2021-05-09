import { getData, postData } from "@/plugins/axios";

const actions = {
    async getPosts({ commit, state }) {
        try {
            if (state.loading) return;

            commit('setLoading', true);

            const { data } = await getData(`posts?p=${state.limit}`).catch(err => {
                throw new Error(err.response.data.message);
            });

            data.posts.forEach((post) => {
                post.edit = false;
                post.liked = post.liked ? true : false;
            });

            commit('setPosts', data.posts);
            commit('setLimit', state.limit + 10);
            commit('setLoading', false);

        } catch (err) {

            commit('setLoading', false);
            commit('setMsg', {
                text: err.message,
                show: true,
                color: "red",
            });
        }
    },
    async createPost({ commit }, post) {
        try {

            await postData("add-post", JSON.stringify(post)).catch(err => {
                throw new Error(err.response.data.message);
            });

            commit('createPost', post);


        } catch (err) {

            commit('setLoading', false);
            commit('setMsg', {
                text: err.message,
                show: true,
                color: "red",
            });
        }
    },
    async updatePost({ commit }, post) {
        try {
            post.id = post._id;
            await postData("update-post", JSON.stringify(post)).catch(err => {
                throw new Error(err.response.data.message);
            });
            post.edit = false;

            commit('updatePost', post);
            commit('setMsg', {
                text: "post update success",
                show: true,
                color: "success",
            });

        } catch (err) {

            commit('setLoading', false);
            commit('setMsg', {
                text: err.message,
                show: true,
                color: "red",
            });
        }
    },
    async likePost({ commit }, post) {
        try {

            post.liked = !post.liked;
            await postData(
                "like-post",
                JSON.stringify({ id: post._id, liked: post.liked })
            );

            commit('updatePost', post);

        } catch (err) {
            commit('setMsg', {
                text: err.message,
                show: true,
                color: "red",
            });
        }
    },
    deletePost({ commit }, id) {

        postData("delete-post", JSON.stringify({ id })).then(() => {

            commit('deletePost', id);

            commit('setMsg', {
                text: "post has been deleted",
                show: true,
                color: "success",
            });
        }).catch(err => {
            commit('setMsg', {
                text: err.message,
                show: true,
                color: "red",
            });
        });
    }
};

export default actions;