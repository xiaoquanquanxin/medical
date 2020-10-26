import request from "@/utils/request"

//  系统用户列表				✅
export function requestUserPage(data: any) {
	return request({
		url: '/api/user/page',
		method: 'post',
		data,
	});
}

//	新增系统用户				✅
export function requestUserInsert(data: any) {
	return request({
		url: '/api/user/insert',
		method: 'post',
		data,
	})
}

//	修改系统用户
export function requestUserUpdate(data: any) {
	return request({
		url: '/api/user/update',
		method: 'post',
		data,
	})
}

//	缺少删除
//	缺少 系统管理-修改登陆人的密码页面的update接口