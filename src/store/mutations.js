const mutations = {
    setPosts(state, posts) {
        state.posts = state.posts.concat(posts)
    },
    setLoading(state, loading) {
        state.loading = loading
    },
    setLimit(state, limit) {
        state.limit = limit
    }
};

export default mutations;