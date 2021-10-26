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
                console.error(err);
            });

        if (auth) {

            commit('setAuth', true);
            commit('setToken', auth.token);
            commit('setUser', auth.user);

            localStorage.setItem('jwt', auth.token);
            localStorage.setItem('user', auth.user);

            router.push({ name: 'Post' });
        }
    },

};

export default actions;