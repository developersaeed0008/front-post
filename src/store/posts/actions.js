import { postData } from "@/plugins/axios";
import router from '@/router';

const actions = {
    async getPosts({ commit, state }) {
        try {

            if (state.loading) return;
            commit('setLoading', true);

            const liked = router.currentRoute ? router.currentRoute.name == 'Liked' : false;
            const keywords = router.currentRoute.query.keywords || '';

            let { posts } = await postData(`posts`, {
                'p': state.limit
                , liked
                , keywords
            });

            /*  
            const posts = [
                {
                    id: 1,
                    _id: 1,
                    text: 'test post',
                    postDate: '2021-08-04'
                }
            ];*/
            commit('setLoading', false);

            if (!posts) return;

            posts.forEach((post) => {
                post.showMore = false;
                post.liked = post.liked ? true : false;
                post.color = post.color ? post.color : '#fff';
            });

            commit('setPosts', posts);
            commit('setLimit', state.limit + 10);


        } catch (err) {

            commit('setLoading', false);
            console.error(err);
        }
    },
    async createPost({ commit }, post) {
        try {

            const resp = await postData("add-post", JSON.stringify(post)).catch(err => {
                console.error(err);
            });

            commit('setLoading', false);

            if (!resp) return;

            commit('createPost', resp.createdPost);

            return resp.createdPost;


        } catch (err) {

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

            const resp = await postData("update-post", JSON.stringify(post)).catch(err => {
                console.error(err);
            });

            post.edit = false;
            if (!resp) return;

            commit('updatePost', post);
            commit('setMsg', {
                text: "post update success",
                show: true,
                color: "success",
            });

            return resp;

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
    async deletePost({ commit }, id) {

        const resp = await postData("delete-post", JSON.stringify({ id })).catch(err => {
            console.log(err);
        });

        commit('deletePost', id);

        commit('setMsg', {
            text: "post has been deleted",
            show: true,
            color: "success",
        });

        return resp;

    }
};

export default actions;