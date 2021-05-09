const mutations = {
    setPosts(state, posts) {
        state.posts = state.posts.concat(posts)
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setLimit(state, limit) {
        state.limit = limit
    },
    createPost(state, post) {
        state.posts.push(post);
    },
    updatePost(state, post) {
        state.posts.forEach(p => {
            if (p.id == post.id) {
                p = post;
                return;
            }
        });
    },
    deletePost(state, id) {
        state.posts = state.posts.filter((post) => post._id != id);
    },
    setMsg(state, msg) {
        state.msg = msg;
    }
};

export default mutations;