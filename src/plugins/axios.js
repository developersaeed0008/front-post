import axios from 'axios';
import router from '@/router';

axios.defaults.baseURL = process.env.VUE_APP_MODE == 'development' ? process.env.VUE_APP_API_DEV : process.env.VUE_APP_API_URL;
const token = localStorage.getItem("jwt");
const loginUrl = '/login';

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
    }
};

export async function getData(url) {

    const resp = await axios.get(url, config).catch(ex => {
        if (ex.response.status == 403) {
            localStorage.removeItem('jwt');
            router.push(loginUrl);
        }
    });

    return resp;
}

export async function postData(url, data) {

    const resp = await axios.post(url, data, config).catch(ex => {
        if (ex.response.status == 403) {
            localStorage.removeItem('jwt');
            router.push(loginUrl);
        }
    });

    return resp.data;
}