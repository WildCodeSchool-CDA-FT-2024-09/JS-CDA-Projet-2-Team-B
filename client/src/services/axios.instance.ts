import axios from 'axios';

export const createAxiosInstance = (logout: () => void) => {
  const axiosInstance = axios.create({
    withCredentials: true
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
