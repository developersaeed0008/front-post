import { getData } from "@/plugins/axios";

const actions = {
    async getPosts({ commit, state }) {
        try {
            if (state.loading) return;

            commit('setLoading', true)

            const { data } = await getData(`posts?p=${state.limit}`);

            data.posts.forEach((post) => {
                post.edit = false;
                post.liked = post.liked ? true : false;
            });

            commit('setPosts', data.posts);
            commit('setLimit', state.limit + 10);
            commit('setLoading', false);

        } catch (err) {
            /* this.loading = false;

            this.msg.text = err.message;
            this.msg.show = true;
            this.msg.color = "danger"; */
        }
    }
};

export default actions;