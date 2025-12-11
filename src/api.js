// // src/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080",
//   withCredentials: true,  // <-- correct
//   headers: {
//     "Accept": "application/json",
//     "Content-Type": "application/json",
//   },
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// ⭐ Attach Token Automatically on Every Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⭐ Auto Logout on 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      localStorage.getItem("token")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
