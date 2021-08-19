const mutations = {
    setAuth(state, isAuth) {
        state.isAuth = isAuth;
    },
    setToken(state, token) {
        state.token = token
    },
    clearToken(state) {
        state.isAuth = null;
        state.token = null;
        state.user = null;

        localStorage.clear('jwt');
        localStorage.clear('user');
    },
    setUser(state, username) {
        state.user = username;
    },
    fetchLoginCredentials(state) {
        state.user = localStorage.getItem("user");
        state.isAuth = localStorage.getItem("jwt");
        state.token = localStorage.getItem("token");
    }
};

export default mutations;