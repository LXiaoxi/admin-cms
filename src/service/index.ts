import XXRequest from "@/service/request";
import { localCache } from "@/util/cache";
import { BASE_URL, TIME_OUT } from "./config";

const xxRequest = new XXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      const token = localCache.getCache("userToken") ?? "";
      if (config.headers && token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default xxRequest;
