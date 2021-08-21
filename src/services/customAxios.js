import axios from "axios";

const customAxios = axios.create({
  baseURL: `https://order-pizza-api.herokuapp.com/api/`,
  timeout: 10000,
});

customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/problem+json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      window.location = "/login";
    }

    return response;
  },
  (error) => error
);

export default customAxios;
