import axios from 'axios';
import {getJwt} from '@/utils/auth';
import {clearStorage} from "@/utils/common"


// create an axios instance
const request = axios.create({
	// url = base url + request url
	//	baseURL: process.env.VUE_APP_BASE_API,
	//	当跨域请求时发送cookie
	// withCredentials: true,
	timeout: 5000
});

//	拦截器
request.interceptors.request.use(
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
request.interceptors.response.use(
	(response: any) => {
		const res = response.data;
		const {status} = res;
		//	正常接口
		if (status === 200 || status === 1000) {
			return Promise.resolve(res);
		}
		//	权限问题
		if (status === 401 || status === 403) {
			clearStorage();
			window.location.href = '/login';
		}
		return Promise.reject(new Error(res.message || 'Error'));
	},
	(error: Error) => {
		console.log('err' + error); // for debug
		//	弹框
		return Promise.reject(error);
	}
);

export default request;
