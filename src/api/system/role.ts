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

//	添加角色				❌
export function requestRoleSave(data: any) {
	return request({
		url: '/api/role/save',
		method: 'post',
		data,
	})
}

//	修改角色
export function requestRoleUpdate(data: any) {
	//	roleId
	return request({
		url: '/api/role/update',
		method: 'post',
		data,
	})
}


//	通过ID查询角色信息
export function requestRoleGet(id: string | number) {
	return request({
		url: `/api/role/get/${id}`,
		method: 'get',
	});
}

//	更新角色菜单
export function requestRoleRoleMenuUpdate(data: any) {
	return request({
		url: '/api/role/roleMenuUpdate',
		method: 'post',
		data,
	})
}

//	删除角色
export function requestRoleDelete(id: string | number) {
	return request({
		url: `/api/role/delete/${id}`,
		method: 'get',
	});
}

//	根据ID查询反馈记录	✅
export function requestRoleFindMenuByRole(id: string | number) {
	return request({
		url: `/api/menu/findMenuByRole/${id}`,
		method: 'get',
	});
}

//	返回角色的菜单集合
export function requestMenuRoleTree(roleName: string | number) {
	return request({
		url: `/api/menu/roleTree/${roleName}`,
		method: 'get',
	});
}





