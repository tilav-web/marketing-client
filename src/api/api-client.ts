import axios, {
  AxiosInstance,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";

import { apiUrl } from "@/utils/shared";

const responseInstance = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );
};

const requestInstance = ({
  instance,
  headers,
}: {
  instance: AxiosInstance;
  headers: AxiosHeaders;
}) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      config.headers = headers;
      return config;
    }
  );
};

// JSON uchun instance
const privateInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Fayl (FormData) uchun instance
const privateInstanceFile: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

responseInstance(privateInstance);
requestInstance({
  instance: privateInstance,
  headers: new AxiosHeaders({
    "Content-Type": "application/json",
  }),
});

responseInstance(privateInstanceFile);
requestInstance({
  instance: privateInstanceFile,
  headers: new AxiosHeaders({
    "Content-Type": "multipart/form-data",
  }),
});

export { privateInstance, privateInstanceFile };
