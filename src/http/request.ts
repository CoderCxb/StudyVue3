import axios from 'axios';

// 1. 根据不同的环境配置不同的baseURL
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'https://www.baidu.com';
} else if (process.env.NODE_ENV == 'debug') {
	axios.defaults.baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'https://www.production.com';
}

// 2. 设置超时时间
axios.defaults.timeout = 10000;

// 3. 请求拦截器,在请求发送之前 对请求进行统一处理 如添加token
axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(err) => {
		return err;
	}
);

// 4. 响应拦截器 响应前对响应进行处理 如 token无效时 直接跳到登录页面
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => err
);

const instance = axios.create({
	timeout: 12 * 1000,
});
export default instance;
