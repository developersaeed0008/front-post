import store from '../store';

export default (to, from, next) => {

    // better from that

    const isAuth = store.state[1].isAuth;

    if (to.name != "login") {
        if (!isAuth) return next("/");
    }

    return next();
}