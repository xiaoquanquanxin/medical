import request from '@/utils/request';

// 拉路由
export function getRoutes(data: {}) {
	return request({
		url: '/routers',
		method: 'post',
		data
	});
}

