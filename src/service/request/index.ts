import axios from "axios";
import { ElLoading } from "element-plus";

// @ts-ignore
import { ILoadingInstance } from "element-plus/lib/components/loading/src/loading";
import type { AxiosInstance } from "axios";
import type { XXRequestInterceptors, XXRequestConfig } from "./type";
const DEFAULT_LOADING = true;
class XXRequest {
  //传进来的实例
  instance: AxiosInstance;
  interceptors?: XXRequestInterceptors;
  loading?: ILoadingInstance;
  showLoading: boolean; //发出的响应里面有没有携带showLoading
  isParams: boolean;
  //config基本的配置
  //现在的config里面有interceptors
  constructor(config: XXRequestConfig) {
    //config{}相当于是一个拦截器
    this.instance = axios.create(config); //创建了axios
    this.interceptors = config.interceptors; //获取到前面的interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING; //如果没有值的时候默认情况为true
    this.isParams = config.isParams ?? true; // 是否处理params再拼接到url上
    //实例才有的拦截器
    //给传进来的实例添加拦截器
    this.instance.interceptors.request.use(
      //里面是两个函数
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    //所有的实例都有的拦截器
    //request请求:客户端到服务器的过程
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            background: "rgba(0,0,0,0.5)",
            text: "正在请求数据",
          });
        }
        // 处理没有数据的值再拼接到url上
        if (this.isParams) {
          let data: any = config.params;
          for (var index in data) {
            if (
              data[index] === null ||
              data[index] === "" ||
              data[index] === undefined
            ) {
              delete data[index];
            }
          }
          config.params = data;
          data = null;
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    //response响应:服务器到客户端
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close();
        return res.data;
      },
      (err) => {
        // 将loading移除
        this.loading?.close();

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 200) {
          console.log("404的错误~");
        }
        console.log(err);
        return err;
      }
    );
  }
  //单独的
  request<T = any>(config: XXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }
  get<T = any>(config: XXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: XXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T = any>(config: XXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: XXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
  put<T = any>(config: XXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
}

export default XXRequest;
