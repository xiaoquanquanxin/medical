import request from '@/utils/request';

//	全部菜单			✅
export function requestMenuAllTree() {
	return request(	{
		url: '/api/menu/allTree',
		method: 'get',
	})
}
