import { postData } from "@/plugins/axios";

const actions = {
    async getPosts({ commit, state }) {
        try {
            if (state.loading) return;

            commit('setLoading', true);

            let { posts } = await postData(`posts`, { 'p': state.limit }).catch(err => {
                throw new Error(err.response.data.message);
            });

            /*   const posts = [
                  {
                      id: 1,
                      _id: 1,
                      text: 'test post',
                      postDate: '2021-08-04'
                  }
              ]; */

            posts.forEach((post) => {
                post.showMore = false;
                post.liked = post.liked ? true : false;
                post.color = post.color ? post.color : '#fff';
            });

            commit('setPosts', posts);
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

            const resp = await postData("add-post", JSON.stringify(post)).catch(err => {
                throw new Error(err.response.data.message);
            });

            commit('createPost', resp.createdPost);


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
    async updateColor({ commit }, post) {
        try {
            await postData(
                "update-post-color",
                JSON.stringify({ id: post._id, color: post.color })
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