import axios from 'axios';
import {getJwt} from '@/utils/auth';


// create an axios instance
const service = axios.create({
	// url = base url + request url
	baseURL: process.env.VUE_APP_BASE_API,
	//	当跨域请求时发送cookie
	// withCredentials: true,
	timeout: 5000
});

//	拦截器
service.interceptors.request.use(
	config => {
		//	config.headers['X-Token'] = getJwt();
		config.headers['X-Channel-Key'] = '941b0f2142efe18c';
		return config;
	},
	error => {
		// do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

// response interceptor
service.interceptors.response.use(
	(response: any) => {
		const res = response.data;
		// if the custom code is not 20000, it is judged as an error.
		if (res.code === 1000) {
			return res;
		}
		return Promise.reject(new Error(res.message || 'Error'));
	},
	(error: Error) => {
		console.log('err' + error); // for debug
		//	弹框
		return Promise.reject(error);
	}
);

export default service;
