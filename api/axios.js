import axios from 'axios'
import config from './config';

const baseURL = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro

class HttpRequest {
    constructor(baseURL) {
            this.baseURL = baseURL
        }
        //定义axios的相关配置
    getInsideConfig() {
        const config = {
            baseURL: this.baseURL,
            header: {}
        }
        return config;
    }
    interceptor(instance) {
        instance.interceptors.request.use(function(config) {
            // 在发送请求之前做些什么
            return config;
        }, function(error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function(response) {
            // 对响应数据做点什么
            return response;
        }, function(error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    request(options) {
        //接口请求函数
        const instance = axios.create()
        options = {...this.getInsideConfig(), ...options } //将options进行解构
        this.interceptor(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseURL)