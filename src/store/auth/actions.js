import { postData } from "@/plugins/axios";
import router from '@/router';

const actions = {

    async auth({ commit }, user) {
        let auth = null;

        auth = await postData(
            "auth",
            JSON.stringify({
                email: user.email,
                password: user.password,
            })).catch((err) => {
                throw new Error(err);
            });

        if (auth) {

            commit('setAuth', true);
            commit('setToken', auth.token);
            commit('setUser', auth.user);

            localStorage.setItem('jwt', auth.token);
            localStorage.setItem('user', auth.user);

            router.push('/');
        }
    },

};

export default actions;