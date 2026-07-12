import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// Request Interceptor: Menempelkan Token Otomatis
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

// Response Interceptor: Parsing Clean JSON & Global Error Handling
api.interceptors.response.use(

    response => response.data,

    error => {

        if(error.response?.status===401){

            localStorage.clear();

            window.location.href="/login";

        }

        return Promise.reject(error);

    }

);

export default api;