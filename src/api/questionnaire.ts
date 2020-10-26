import request from '@/utils/request';

//  评估分页列表			❌，几天前能用，现在404
export function requestAssessPage(data: any) {
	return request({
		url: '/api/assess/page',
		method: 'post',
		data,
	});
}

//	新增评估信息			❌，同上
export function requestAssessInsert(data: any) {
	return request({
		url: '/api/assess/insert',
		method: 'post',
		data,
	})
}

//	获取评估信息			⚠️，几天前能用
export function requestAssessGet(id: string | number) {
	return request({
		url: `/api/assess/get/${id}`,
		method: 'get',
	})
}

//	修改评估信息			⚠️，几天前能用
export function requestAssessUpdate(data: any) {
	return request({
		url: '/api/assess/update',
		method: 'post',
		data,
	})
}


//	删除评估信息			⚠️原型无
export function requestAssessDelete(id: string | number) {
	return request({
		url: `/api/assess/delete/${id}`,
		method: 'get',
	})
}

//	获取评估列表
export function requestAssessList() {
	return request({
		url: '/api/assess/list',
		method: 'get',
	});
}