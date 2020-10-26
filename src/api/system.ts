import request from '@/utils/request';


//	所有角色			❌，404，❓干嘛的
export function requestRoleRoleAll() {
	return request({
		url: '/api/role/roleAll',
		method: 'post',
	});
}
