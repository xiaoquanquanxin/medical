import request from '@/utils/request';

//	⚠️⚠️	系统管理这部分，swagger提供的接口超级多，所以下面的接口我不确定具体调用哪个

//	分页查询角色信息		✅
export function requestRolePage(data: any) {
	return request({
		url: '/api/role/page',
		method: 'post',
		data,
	})
}

//	添加角色				❌，文档没提供RoleInsertParam是什么实体，没有任何返回信息，http状态吗200
export function requestRoleSave(data: any) {
	return request({
		url: '/api/role/save',
		method: 'post',
		data,
	})
}

//	通过ID查询角色信息		❌，无论get还是post，都不正常
export function requestRoleGet(id: string | number) {
	return request({
		url: `/api/role/get/${id}`,
		method: 'post',
	});
}

//	更新角色菜单
export function requestRoleRoleMenuUpdate(data: any) {
	return request({
		url: '/api/role/roleMenuUpdate',
		method: 'put',
		data,
	})
}

//	删除角色
export function requestRoleDelete(id: string | number) {
	return request({
		url: `/api/role/delete/${id}`,
		method: 'delete',
	});
}


