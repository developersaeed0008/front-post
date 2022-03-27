import axios from 'axios';
import router from '@/router';
import store from '../store'

axios.defaults.baseURL = process.env.VUE_APP_MODE == 'development' ? process.env.VUE_APP_API_DEV : process.env.VUE_APP_API_URL;

const loginUrl = '/';

export async function getData(url) {

    const token = store.state[1].token;

    if (!token) router.push(loginUrl);

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    };

    const resp = await axios.get(url, config).catch(ex => {
        if (ex.response && ex.response.status == 403) {
            store.commit("clearToken");
            router.push(loginUrl);
        }
    });

    if (resp)
        return resp;
}

export async function postData(url, data) {

    const token = store.state[1].token;
    if (!token) router.push(loginUrl);

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    };

    const resp = await axios.post(url, data, config).catch(ex => {
        if (ex.response && ex.response.status == 403) {
            store.commit("clearToken");
            router.push(loginUrl);
        }
    });

    if (resp)
        return resp.data;
}