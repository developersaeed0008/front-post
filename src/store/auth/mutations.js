const mutations = {
    setAuth(state, isAuth) {
        state.isAuth = isAuth;
        if (!isAuth) localStorage.removeItem('jwt');
    },
    setToken(state, token) {
        state.token = token
    }
};

export default mutations;