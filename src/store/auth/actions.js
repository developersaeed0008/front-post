import { postData } from "@/plugins/axios";

const actions = {

    async auth({ commit }, user) {
        let auth = null;

        auth = await postData(
            "auth",
            JSON.stringify({
                email: user.email,
                password: user.password,
            })).catch((err) => {
                //  this.errorLogin = err.response.data.message;
                throw new Error(err.response.data.message);
            });

        if (auth) {

            commit('setAuth', true);
            commit('setToken', auth.token);
            localStorage.setItem('jwt', auth.token);
            localStorage.setItem('user', auth.user);
            //TODO router.push
            window.location = '/';
        }
    },

};

export default actions;