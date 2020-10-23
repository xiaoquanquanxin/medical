import request from '@/utils/request';

//	反馈记录列表		✅
export function requestFeedbackPage(data: any) {
	return request({
		url: '/api/feedback/page',
		method: 'post',
		data,
	});
}

//	反馈记录新增		✅
export function requestFeedbackSave(data: any) {
	return request({
		url: '/api/feedback/save',
		method: 'post',
		data,
	});
}

//	根据ID查询反馈记录	✅
export function requestFeedbackGet(id: string | number) {
	return request({
		url: `/api/feedback/getById/${id}`,
		method: 'get',
	});
}

//	删除反馈		⚠️原型无
export function requestFeedbackDelete(id: string | number) {
	return request({
		url: `/api/feedback/delete/${id}`,
		method: 'post',
	});
}


//	反馈记录编辑、修改反馈记录	⚠️原型无
export function requestFeedbackUpdate(data: any) {
	return request({
		url: '/api/feedback/update',
		method: 'post',
		data,
	});
}





