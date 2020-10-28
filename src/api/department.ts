import request from '@/utils/request';

//  科室列表				✅
export function requestDeptPage(data: any) {
	return request({
		url: '/api/dept/page',
		method: 'post',
		data,
	});
}

//	新增科室				✅，新增成功了，但是列表里没有出来；文档提供的参数和请求示例不一样
export function requestDeptSave(data: any) {
	return request({
		url: '/api/dept/save',
		method: 'post',
		data,
	});
}

//	编辑科室
export function requestDeptUpdate(data: any) {
	return request({
		url: '/api/dept/update',
		method: 'post',
		data,
	});
}

//	去往关联疾病页面		❓干啥的？没参数
export function requestDeptToRelatedDiseases() {
	return request({
		url: '/api/dept/toRelatedDiseases',
		method: 'get',
	});
}

//	关联疾病保存
export function requestDeptRelatedDiseases(data: any) {
	return request({
		url: '/api/dept/relatedDiseases',
		method: 'post',
		data,
	});
}

//	删除科室		⚠️原型无
export function requestDeptDelete(id: string | number) {
	return request({
		url: `/api/dept/delete`,
		method: 'delete',
		data: {id,}
	});
}

//	科室详情
export function requestDeptGet(id: string | number) {
	return request({
		url: `/api/dept/get/${id}`,
		method: 'get',
	});
}

//	科室列表
export function requestDeptList() {
	return request({
		url: '/api/dept/list',
		method: 'get',
	});
}


//	医院-关联科室保存
export function requestHospitalRelatedDepartments(data: {
	"hospitalId": number
	"deptIds": [],
}) {
	return request({
		url: '/api/hospital/relatedDepartments',
		method: 'post',
		data,
	});
}



