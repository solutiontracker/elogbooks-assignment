import axios from 'axios'

export default function makeApi(baseURL: string) {

    const api = axios.create({
        baseURL,
    })

    api.defaults.headers.post['Content-Type'] = "application/json";

    api.defaults.headers.put['Content-Type'] = "application/json";

    api.defaults.headers.delete['Content-Type'] = "application/json";

    api.interceptors.request.use(
        async (config: any) => {
            config.headers = { ...config.headers }
            return config;
        },
        (error: any) => {
            return error.response;
        }
    )

    api.interceptors.response.use(
        (response: any) => response.data,
        (error: any) => {
            return error.response;
        }
    )

    return api
}