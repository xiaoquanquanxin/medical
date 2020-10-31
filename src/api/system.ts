import request from '@/utils/request';


//	所有角色
export function requestRoleRoleAll() {
	return request({
		url: '/api/role/roleAll',
		method: 'get',
	});
}
