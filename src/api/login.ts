import request from '@/utils/request';

//  登录接口
export function autoLogin(data: {}) {
	return request({
		url: '/api/auth/login',
		method: 'post',
		data,
	});
}

//	登出接口
export function authLogout() {
	return request({
		url: '/api/auth/logout',
		method: 'post',
	});
}
