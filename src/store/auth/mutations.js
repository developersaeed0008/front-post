const mutations = {
    setAuth(state, isAuth) {
        state.isAuth = isAuth;
        if (!isAuth) localStorage.removeItem('jwt');
    },
    setToken(state, token) {
        state.token = token
    },
    clearTocken(state) {
        state.isAuth = null;
        state.token = null;
    }
};

export default mutations;