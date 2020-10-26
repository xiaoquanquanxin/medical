import request from '@/utils/request';

//  返回树形菜单集合
export function requestMenuMenuAllTree() {
	return request({
		url: '/api/menu/menu/allTree',
		method: 'get',
	});
}

