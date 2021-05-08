import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

let config = {
    headers: {
        "Content-Type": "application/json"
    }
};

export async function getData(url) {
    const resp = await axios.get(url);
    return resp;
}
export async function postData(url, data) {
    const resp = await axios.post(url, data, config);
    return resp.data;
}